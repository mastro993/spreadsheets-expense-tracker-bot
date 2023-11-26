import { Telegram } from "../../types/Telegram";
import { EXPENSE_CATEGORIES } from "../config/categories";
import { TIMEZONE } from "../config/spreadsheet";
import { Cache } from "../data/cache";
import { getLastExpenses, saveExpense } from "../data/expenses";
import { editTelegramMessage, sendTelegramMessage } from "../services/telegram";
import { buildDateInputKeyboard } from "../telegram/keyboard";
import { Callback, Response, encodeCallbackData } from "../telegram/types";

export const requestDateInput = (
  chat_id: string,
  date: Date = new Date(),
  message_id?: number
) => {
  const keyboard = buildDateInputKeyboard(date);

  if (message_id !== undefined) {
    editTelegramMessage({
      chat_id,
      message_id,
      text: "Choose a date:",
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    sendTelegramMessage({
      chat_id,
      text: "Choose a date:",
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
};

export const showExpenseCategories = (chat_id: string) => {
  const keyboard: Telegram.Keyboard.InlineKeyboardButton[][] = [];
  let row: Telegram.Keyboard.InlineKeyboardButton[] = [];

  EXPENSE_CATEGORIES.forEach(({ emoji, name }) => {
    const callback_data = encodeCallbackData({
      callback: Callback.CATEGORY,
      payload: name,
    });
    row.push({ text: `${emoji ? `${emoji} ` : ""}${name}`, callback_data });
    if (row.length === 2) {
      keyboard.push(row);
      row = [];
    }
  });

  if (row.length !== 0) {
    keyboard.push(row);
  }

  sendTelegramMessage({
    chat_id,
    text: "Choose a category:",
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: keyboard,
      remove_keyboard: true,
      one_time_keyboard: true,
    },
  });
};

export const showExpenseSubcategories = (chat_id: string, category: string) => {
  const { name, emoji, children } = EXPENSE_CATEGORIES.find(
    ({ name }) => name === category
  );

  const keyboard: Telegram.Keyboard.InlineKeyboardButton[][] = [];
  let row: Telegram.Keyboard.InlineKeyboardButton[] = [];

  children.forEach((subcategory) => {
    const callback_data = encodeCallbackData({
      callback: Callback.SUBCATEGORY,
      payload: subcategory,
    });
    row.push({ text: subcategory, callback_data });
    if (row.length === 2) {
      keyboard.push(row);
      row = [];
    }
  });

  if (row.length !== 0) {
    keyboard.push(row);
  }

  sendTelegramMessage({
    chat_id,
    text: `Choose a subcategory for *${emoji} ${name.trim()}*:`,
    parse_mode: "MarkdownV2",
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};

export const requestAmountInput = (chat_id: string) => {
  sendTelegramMessage({
    chat_id,
    text: Response.ENTER_PRICE,
    reply_markup: {
      force_reply: true,
    },
  });
};

export const handleSaveExpense = (
  chat_id: string,
  amount: number,
  description?: string
) => {
  const date = new Date(Cache.get("date"));
  const category = Cache.get("category");
  const subcategory = Cache.get("subcategory");

  const time = Utilities.formatDate(new Date(), TIMEZONE, "dd/MM/yyyy HH:mm");
  const formattedDate = Utilities.formatDate(date, TIMEZONE, "dd/MM/yyyy");

  saveExpense({
    amount,
    date,
    category,
    subcategory,
    description,
    notes: `Via bot - ${time}`,
  });

  const formattedAmount = amount.toLocaleString("default", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
  });

  let message = `✅ Expense saved\\!\n\n*Date*: \`${formattedDate}\`\n*Category*: ${category} \\- ${subcategory}\n*Amount*: \`${formattedAmount}\``;
  if (description) {
    message += `\n*Description:* ${description}`;
  }

  sendTelegramMessage({
    chat_id,
    text: message,
    parse_mode: "MarkdownV2",
  });

  Cache.clear("date");
  Cache.clear("category");
  Cache.clear("subcategory");
};

export const handleSaveQuickExpense = (
  chat_id: string,
  amount: number,
  description?: string
) => {
  const date = new Date();

  const time = Utilities.formatDate(date, TIMEZONE, "dd/MM/yyyy HH:mm");
  const formattedDate = Utilities.formatDate(date, TIMEZONE, "dd/MM/yyyy");

  saveExpense({
    amount,
    date,
    description,
    notes: `Via bot - ${time}`,
  });

  const formattedAmount = amount.toLocaleString("default", {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
  });

  let message = `✅ Quick expense saved\\!\n\n*Date:* \`${formattedDate}\`\n*Amount*: \`${formattedAmount}\``;

  if (description) {
    message += `\n*Description:* ${description}`;
  }

  sendTelegramMessage({
    chat_id,
    text: message,
    parse_mode: "MarkdownV2",
  });
};

export const showLastExpenses = (chat_id: string) => {
  const lastExpenses = getLastExpenses();

  const keyboard: Telegram.Keyboard.InlineKeyboardButton[][] = [];

  lastExpenses.forEach(({ index, date, category, amount, description }) => {
    var formattedDate = Utilities.formatDate(date, TIMEZONE, "dd/MM");

    const expenseDescription =
      description.length === 0 ? category : description;
    const text = `🗓️ ${formattedDate}: ${expenseDescription} -> ${amount} €`;
    const callback_data = encodeCallbackData({
      callback: Callback.DELETE,
      payload: `${index}`,
    });
    keyboard.push([{ text, callback_data }]);
  });

  sendTelegramMessage({
    chat_id,
    text: "Choose the expense to be eliminated:",
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
};
