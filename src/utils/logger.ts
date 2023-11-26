import { getLogsSheet } from "../data/sheet";

export namespace SheetLogger {
  export const log = (tag: string, message: string, data?: any) => {
    const sheet = getLogsSheet();

    let dataString: string;
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      dataString += data;
    } else if (typeof data === "string") {
      dataString += data;
    }

    sheet.appendRow([new Date(), tag, message, dataString]);
  };
}
