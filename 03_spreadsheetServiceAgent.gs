function getCurrentSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSpreadsheet(spreadsheetId) {
  return SpreadsheetApp.openById(spreadsheetId);
}
