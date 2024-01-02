import { TIMEZONE } from "../config/spreadsheet";
import { getExpensesSheet } from "./sheet";

enum ExpenseColumn {
  DATE = 0,
  CATEGORY = 2,
  AMOUNT = 3,
  DESCRIPTION = 4,
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
  notes?: string;
};

const rowToExpense = (data: string[]): Expense => {
  const [date, _type, fullCategory, amount, description, notes] = data;
  const [category, subcategory] = fullCategory.split("-").map((_) => _.trim());

  return {
    index: undefined,
    date: new Date(date),
    category,
    subcategory,
    amount: parseFloat(amount),
    description,
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
    "Expense",
    fullCategory,
    expense.amount,
    expense.description,
    expense.notes,
  ];
};

export const getExpense = (
  year: number,
  index: number
): Expense | undefined => {
  const expensesSheet = getExpensesSheet(year);
  if (!expensesSheet) {
    return undefined;
  }

  const dataRange = expensesSheet.getRange(index + 1, 1, 1, COLUMN_SIZE);
  const values = dataRange.getValues();
  if (!values[0]) {
    return undefined;
  }

  return { ...rowToExpense(values[0]), index };
};

const getAllExpensesForYear = (year: number): Expense[] => {
  const expensesSheet = getExpensesSheet(year, false);
  if (!expensesSheet) {
    return [];
  }

  const numRows = expensesSheet.getLastRow() - 1;
  const dataRange = expensesSheet.getRange(2, 1, numRows, COLUMN_SIZE);
  const data = dataRange.getValues();
  return data.map((values, index) => ({
    ...rowToExpense(values),
    index: index + 1, // First expense is at row with index 2
  }));
};

export const getAllExpenses = (): Expense[] => {
  let year = new Date().getFullYear();
  let expenses: Expense[] = [];
  let yearExpenses: Expense[] = [];
  do {
    yearExpenses = getAllExpensesForYear(year);
    expenses = expenses.concat(yearExpenses);
    year = year - 1;
  } while (yearExpenses.length > 0);
  return expenses;
};

export const getLastExpensesForYear = (
  size: number = 5,
  year: number
): Expense[] => {
  const expensesSheet = getExpensesSheet(year);
  if (!expensesSheet) {
    return [];
  }
  const numRows = expensesSheet.getLastRow() - 1;
  const fromRow = Math.max(numRows - (size - 1), 0);
  const dataRange = expensesSheet.getRange(fromRow + 1, 1, size, COLUMN_SIZE);
  const data = dataRange.getValues();
  return data.map((values, index) => ({
    ...rowToExpense(values),
    index: index + fromRow + 1, // First expense is at row with index 2
  }));
};

export const getLastExpenses = (size: number = 5): Expense[] => {
  const currentYear = new Date().getFullYear();
  const currentYearExpenses = getLastExpensesForYear(size, currentYear);
  const currentYearExpensesSize = currentYearExpenses.length;
  if (currentYearExpensesSize < size) {
    return currentYearExpenses.concat(
      getLastExpensesForYear(size - currentYearExpensesSize, currentYear - 1)
    );
  }

  return currentYearExpenses;
};

export const saveExpense = (expense: Expense): number => {
  const expensesSheet = getExpensesSheet(expense.date.getFullYear(), true);
  if (!expensesSheet) {
    return -1;
  }
  const sheet = expensesSheet.appendRow(expenseToRow(expense));
  return sheet.getLastRow();
};

export const deleteExpense = (expense: Expense): boolean => {
  const expensesSheet = getExpensesSheet(expense.date.getFullYear());
  if (!expensesSheet || expense.index === undefined) {
    return false;
  }
  expensesSheet.deleteRow(expense.index);
  return true;
};
