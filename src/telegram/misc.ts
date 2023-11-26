import { sendTelegramMessage, setTelegramCommands } from "../services/telegram";
import { Command } from "./types";

export const showTelegramWelcome = (chat_id: string) => {
  sendTelegramMessage({
    chat_id,
    text: "👋 Hi",
  });
  sendTelegramMessage({
    chat_id,
    text: "I'm a Google Spreadsheet expense tracker bot.\nTo get started, use the /help command to see the available commands",
  });
};

export const cancelTelegramCommand = (chat_id: string) => {
  sendTelegramMessage({
    chat_id,
    text: "👌 Command cancelled!",
  });
};

export const showTelegramHelp = (chat_id: string) => {
  let text = "💬 Commands\n\n";
  text += "\\- /start: show the welcome message\n";
  text += "\\- /add: start the expense insertion prompt\n";
  text += "\\- /summary: show a summary of the exapenses\n";
  text += "\\- /help: open this message and get help\n";
  text += "\\- /cancel: cancel the current command\n\n";
  text +=
    "You can also add a *quick expense* by sending a simple message with the amount and optionally a description\\.\n";

  sendTelegramMessage({
    chat_id,
    text,
    parse_mode: "MarkdownV2",
  });
};

export const showTelegramError = (chat_id: string, reason: string) => {
  sendTelegramMessage({
    chat_id,
    text: `⚠️ *Error* \n ${reason}`,
    parse_mode: "MarkdownV2",
  });
};

export const setupTelegramCommands = () => {
  setTelegramCommands({
    commands: [
      { command: Command.START, description: "Start bot" },
      { command: Command.HELP, description: "Show help" },
      {
        command: Command.ADD_EXPENSE,
        description: "Add a new expense",
      },
      {
        command: Command.DELETE_EXPENSE,
        description: "Delete an expese",
      },
      {
        command: Command.SUMMARY,
        description: "Get a summary of the expenses",
      },
    ],
    scope: { type: "default" },
    language_code: "en",
  });
};
