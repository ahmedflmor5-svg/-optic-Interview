/**
 * Øptic Interview — Google Apps Script receiver
 * 1) Create a Google Sheet.
 * 2) Extensions > Apps Script, paste this code, Save.
 * 3) Deploy > New deployment > Web app.
 *    Execute as: Me. Who has access: Anyone.
 * 4) Copy the Web app URL into GOOGLE_SCRIPT_URL in index.html.
 */
const SHEET_NAME = 'Applications';
function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  const headers = ['وقت التقديم','الاسم','الإيميل','الموبايل','التخصص','الخبرة','التوفر','البورتفوليو','س1 - التعريف','س2 - المشروع','س3 - مهمة غير واضحة','س4 - اختلاف وملاحظات','س5 - التوقعات والمساهمة','س6 - الالتزامات'];
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  sheet.appendRow([
    new Date(), data.name || '', data.email || '', data.phone || '', data.role || '',
    data.experience || '', data.availability || '', data.portfolio || '', data.q1 || '',
    data.q2 || '', data.q3 || '', data.q4 || '', data.q5 || '', data.q6 || ''
  ]);
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}