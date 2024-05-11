import { Telegram } from "../types/Telegram";
import { checkUserAuthentication } from "./core/auth";
import {
  handleAppleWallet,
  handleTelegramCallback,
  handleTelegramMessage,
} from "./telegram/handlers";
import { setTelegramWebhook } from "./services/telegram";
import { SheetLogger } from "./utils/logger";

function doPost(event: GoogleAppsScript.Events.DoPost) {
  try {
    const origin = event.parameter["origin"];

    if (origin === "apple-wallet") {
      const data = JSON.parse(event.postData.contents);
      handleAppleWallet(data);
    } else {
      const { message, callback_query }: Telegram.Update = JSON.parse(
        event.postData.contents
      );

      if (callback_query) {
        handleTelegramCallback(callback_query);
      } else if (message && checkUserAuthentication(message.chat.id, message)) {
        handleTelegramMessage(message);
      }
    }
  } catch (error: any) {
    console.log("doPost", "Error handling request", error);
    SheetLogger.log("doPost", "Error handling request", error);
  }
}

function configureTelegramBot() {
  setTelegramWebhook();
}
