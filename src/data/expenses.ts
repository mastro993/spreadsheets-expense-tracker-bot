import { TIMEZONE } from "../config/spreadsheet";
import { getExpensesSheet } from "./sheet";

enum ExpenseColumn {
  DATE = 0,
  CATEGORY = 1,
  AMOUNT = 2,
  DESCRIPTION = 3,
  ACCOUNT = 4,
  NOTES = 5,
}

const COLUMN_SIZE = Object.keys(ExpenseColumn).length;

export type Expense = {
  index?: number;
  date: GoogleAppsScript.Base.Date;
  amount: number;
  category?: string;
  subcategory?: string;
  description?: string;
  account?: string;
  notes?: string;
};

const rowToExpense = (data: string[]): Expense => {
  const [date, fullCategory, amount, description, account, notes] = data;
  const [category, subcategory] = fullCategory.split("-").map((_) => _.trim());

  return {
    index: undefined,
    date: new Date(date),
    category,
    subcategory,
    amount: parseFloat(amount),
    description,
    account,
    notes,
  };
};

const expenseToRow = (expense: Expense): any[] => {
  let fullCategory: string;
  if (expense.category && expense.subcategory) {
    fullCategory = `${expense.category} - ${expense.subcategory}`;
  }

  return [
    Utilities.formatDate(expense.date, TIMEZONE, "dd/MM/yyyy"),
    fullCategory,
    expense.amount,
    expense.description,
    expense.account,
    expense.notes,
  ];
};

export const getExpense = (index: number): Expense | undefined => {
  const expensesSheet = getExpensesSheet();
  const dataRange = expensesSheet.getRange(index + 1, 1, 1, COLUMN_SIZE);
  const values = dataRange.getValues();
  return values[0] && { ...rowToExpense(values[0]), index };
};

export const getAllExpenses = (): Expense[] => {
  const expensesSheet = getExpensesSheet();
  const numRows = expensesSheet.getLastRow() - 1;
  const dataRange = expensesSheet.getRange(2, 1, numRows, COLUMN_SIZE);
  const data = dataRange.getValues();
  return data.map((values, index) => ({
    ...rowToExpense(values),
    index: index + 1, // First expense is at row with index 2
  }));
};

export const getLastExpenses = (size: number = 5): Expense[] => {
  const expensesSheet = getExpensesSheet();
  const numRows = expensesSheet.getLastRow() - 1;
  const fromRow = Math.max(numRows - (size - 1), 0);
  const dataRange = expensesSheet.getRange(fromRow + 1, 1, size, COLUMN_SIZE);
  const data = dataRange.getValues();
  return data.map((values, index) => ({
    ...rowToExpense(values),
    index: index + fromRow + 1, // First expense is at row with index 2
  }));
};

export const saveExpense = (expense: Expense): number => {
  const expensesSheet = getExpensesSheet();
  const sheet = expensesSheet.appendRow(expenseToRow(expense));
  return sheet.getLastRow();
};

export const deleteExpense = (expense: Expense): boolean => {
  if (expense.index === undefined) {
    return false;
  }
  const expensesSheet = getExpensesSheet();
  expensesSheet.deleteRow(expense.index);
  return true;
};