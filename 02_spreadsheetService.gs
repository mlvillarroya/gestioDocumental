
function sheetExists(sheetname){    
  ss = getCurrentSpreadsheet();
  if (ss.getSheetByName(sheetname)!= null) return true;
  return false;
}

function printAlertInSpreadsheet(text) {
  SpreadsheetApp.getUi().alert(text);
}

function getDataInSheet(sheetName) {
  ss = getCurrentSpreadsheet();
  if (!sheetExists(sheetName))  {
    printAlertInSpreadsheet("Sheet " + sheetName + " not found");
    return false;
    }
  sheet = ss.getSheetByName(sheetName);
  return sheet.getDataRange().getValues();
}