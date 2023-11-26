import { Telegram } from "../../types/Telegram";
import { sendTelegramMessage } from "../services/telegram";

// DO NOT TOUCH
// This const is configured during the build phase.
// Please, define TELEGRAM_USER_ID variable in your .env file
export const TELEGRAM_USER_ID = "__TELEGRAM_USER_ID__";

export const checkUserAuthentication = (
  chat_id: string | number,
  message: Telegram.Message
): boolean => {
  if (TELEGRAM_USER_ID == chat_id) {
    return true;
  }

  sendTelegramMessage({
    chat_id,
    text: "⛔ You're not authorized!",
  });

  sendTelegramMessage({
    chat_id: TELEGRAM_USER_ID,
    text: `‼️ Illegal bot access ‼️\n\n @${message.chat.username} (id: ${chat_id})`,
  });

  return false;
};
