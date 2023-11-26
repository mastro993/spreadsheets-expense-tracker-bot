import { Telegram } from "../../types/Telegram";

// DO NOT TOUCH
// These consts are configured during the build phase.
// Please, define TELEGRAM_TOKEN and DEPLOY_ID variables in your .env file
const TELEGRAM_TOKEN = "__TELEGRAM_TOKEN__";

export const setTelegramWebhook = () => {
  const WEBAPP_URL = `https://script.google.com/macros/s/__DEPLOY_ID__/exec`;
  try {
    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${WEBAPP_URL}`;
    UrlFetchApp.fetch(url);
  } catch (error: any) {
    Logger.log(`Error setting up webhook: ${error.message}`);
    throw error;
  }
};

export const sendTelegramMessage = (data: Telegram.Payload.SendMessage) => {
  try {
    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(data),
    };

    UrlFetchApp.fetch(url, params);
  } catch (error: any) {
    Logger.log("Error sending Telegram message: " + error.message);
    throw error;
  }
};

export const editTelegramMessage = (data: Telegram.Payload.EditMessageText) => {
  try {
    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/editMessageText`;
    var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(data),
    };

    UrlFetchApp.fetch(url, params);
  } catch (error: any) {
    Logger.log("Error sending Telegram message: " + error.message);
    throw error;
  }
};

// Delete a message from Telegram chat
export const deleteTelegramMessage = (data: Telegram.Payload.DeleteMessage) => {
  try {
    var url: string = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`;

    const payload: GoogleAppsScript.URL_Fetch.Payload = {
      method: "deleteMessage",
      ...data,
    };

    var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      payload,
    };

    UrlFetchApp.fetch(url, params);
  } catch (error: any) {
    Logger.log("Error deleting Telegram message: " + error.message);
    throw error;
  }
};

export const setTelegramCommands = (data: Telegram.Payload.SetMyCommands) => {
  try {
    var url: string = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`;

    const payload: GoogleAppsScript.URL_Fetch.Payload = {
      method: "setMyCommands",
      commands: JSON.stringify(data.commands),
      scope: JSON.stringify(data.scope),
      language_code: data.language_code,
    };

    var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      payload,
    };

    UrlFetchApp.fetch(url, params);
  } catch (error: any) {
    Logger.log("Error setting Telegram commands: " + error.message);
    throw error;
  }
};
