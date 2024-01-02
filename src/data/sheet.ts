// DO NOT TOUCH
// This const is configured during the build phase.

import { SHEET_ID } from "../config/spreadsheet";

const getOrCreateSheet = (sheetName: string) => {
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    var numSheets = SpreadsheetApp.openById(SHEET_ID).getNumSheets();
    sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(sheetName, numSheets);
  }
  return sheet;
};

export const getExpensesSheet = (
  forYear: number,
  createIfNotExist: boolean = false
): GoogleAppsScript.Spreadsheet.Sheet | undefined => {
  const sheetName = forYear.toString();
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  if (!sheet && createIfNotExist) {
    var numSheets = SpreadsheetApp.openById(SHEET_ID).getNumSheets();
    sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(sheetName, numSheets);
  }
  return sheet;
};

export const getLogsSheet = () => {
  const sheetName = "__LOGS";
  let sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  if (!sheet) {
    var numSheets = SpreadsheetApp.openById(SHEET_ID).getNumSheets();
    sheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(sheetName, numSheets);
  }
  return sheet;
};
