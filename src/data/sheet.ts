// DO NOT TOUCH
// This const is configured during the build phase.

import { SHEET_ID, SHEET_NAME } from "../config/spreadsheet";

export const getExpensesSheet = (): GoogleAppsScript.Spreadsheet.Sheet =>
  SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
export const getLogsSheet = () => {
  const sheetName = "__LOGS";
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    var numSheets = SpreadsheetApp.openById(SHEET_ID).getNumSheets();
    sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(sheetName, numSheets);
  }
  return sheet;
};
