import { Telegram } from "../types/Telegram";

import { checkUserAuthentication } from "./core/auth";
import { handleCallback, handleMessage } from "./telegram/handlers";
import { setTelegramWebhook } from "./services/telegram";
import { getAllExpenses } from "./data/expenses";
import { SheetLogger } from "./utils/logger";

function doPost(event: GoogleAppsScript.Events.DoPost) {
  try {
    const { message, callback_query }: Telegram.Update = JSON.parse(
      event.postData.contents
    );

    if (callback_query) {
      handleCallback(callback_query);
    } else if (message && checkUserAuthentication(message.chat.id, message)) {
      handleMessage(message);
    }
  } catch (error: any) {
    console.log("doPost", "Error handling request", error);
    SheetLogger.log("doPost", "Error handling request", error);
  }
}

function doGet(event: GoogleAppsScript.Events.DoGet) {
  const categories = getAllExpenses();
  return ContentService.createTextOutput(
    JSON.stringify(categories)
  ).setMimeType(ContentService.MimeType.JSON);
}

function configureTelegramBot() {
  setTelegramWebhook();
}
