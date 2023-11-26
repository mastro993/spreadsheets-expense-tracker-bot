import { Telegram } from "../../types/Telegram";
import { Cache } from "../data/cache";
import {
  showExpenseCategories,
  showExpenseSubcategories,
  showLastExpenses,
  handleSaveQuickExpense,
  handleSaveExpense,
  requestAmountInput,
  requestDateInput,
} from "../core/expense";
import { extractAmountAndDescription } from "../utils/strings";
import {
  cancelTelegramCommand,
  setupTelegramCommands,
  showTelegramError,
  showTelegramHelp,
  showTelegramWelcome,
} from "./misc";
import { Callback, Command, Response, decodeCallbackData } from "./types";
import { deleteExpense, getExpense } from "../data/expenses";
import { sendTelegramMessage } from "../services/telegram";

export const handleMessage = (message: Telegram.Message) => {
  const { chat, text, reply_to_message } = message;

  switch (text) {
    case `/${Command.START}`:
      showTelegramWelcome(chat.id);
      setupTelegramCommands();
      break;

    case `/${Command.CANCEL}`:
      cancelTelegramCommand(chat.id);
      break;

    case `/${Command.HELP}`:
      showTelegramHelp(chat.id);
      break;

    case `/${Command.ADD_EXPENSE}`:
      requestDateInput(chat.id);
      break;

    case `/${Command.DELETE_EXPENSE}`:
      showLastExpenses(chat.id);
      break;

    case `/${Command.SUMMARY}`:
      showTelegramError(chat.id, "This command is not yet implemented");
      break;

    default:
      const isAmountRequested = reply_to_message?.text === Response.ENTER_PRICE;
      const [amount, description] = extractAmountAndDescription(text);

      if (isAmountRequested) {
        if (amount !== undefined) {
          handleSaveExpense(chat.id, amount, description);
        } else {
          showTelegramError(
            chat.id,
            `The value entered \(${text}\) contains invalid characters`
          );
        }
      } else if (amount !== undefined) {
        handleSaveQuickExpense(chat.id, amount, description);
      } else {
        showTelegramError(chat.id, `Invalid command`);
      }
  }
};

export const handleCallback = (callbackQuery: Telegram.CallbackQuery) => {
  const chat_id = String(callbackQuery.message.chat.id);
  const message_id = callbackQuery.message.message_id;

  const { callback, payload } = decodeCallbackData(callbackQuery.data);

  switch (callback) {
    case Callback.DELETE:
      var expenseIndex = parseInt(payload, 10);
      handleDeleteExpense(chat_id, expenseIndex);
      break;

    case Callback.DATE:
      Cache.set("date", payload);
      showExpenseCategories(chat_id);
      break;

    case Callback.CATEGORY:
      Cache.set("category", payload);
      showExpenseSubcategories(chat_id, payload);
      break;

    case Callback.SUBCATEGORY:
      Cache.set("subcategory", payload);
      requestAmountInput(chat_id);
      break;

    case Callback.CALENDAR:
      const date = new Date(payload);
      requestDateInput(chat_id, date, message_id);
      break;

    default:
      showTelegramError(chat_id, "Unknown callback type");
      break;
  }
};

const handleDeleteExpense = (chat_id: string, index: number) => {
  const expense = getExpense(index);
  deleteExpense(expense);

  const { category, amount, description } = expense;

  let message = `🗑️ Expense deleted!\n\nCategory: ${category}\nAmount: ${amount} €`;
  if (description) {
    message += `\nDescription: ${description}`;
  }

  sendTelegramMessage({
    chat_id,
    text: message,
  });
};
