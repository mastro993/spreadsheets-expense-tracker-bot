export enum Command {
  START = "start",
  HELP = "help",
  CANCEL = "cancel",
  ADD_EXPENSE = "add",
  DELETE_EXPENSE = "delete",
  SUMMARY = "summary",
}

export enum Callback {
  DELETE = "delete",
  CATEGORY = "category",
  SUBCATEGORY = "subcategory",
  CALENDAR = "calendar",
  DATE = "date",
}

export enum Response {
  ENTER_PRICE = "Enter the amount and description:",
}

export type CallbackData = {
  callback: Callback;
  payload: string;
};

const isCallback = (value: string): value is Callback => {
  return Object.values(Callback).includes(value as Callback);
};

export const encodeCallbackData = ({
  callback,
  payload,
}: CallbackData): string => `${callback}:${payload}`;

export const decodeCallbackData = (data: string | undefined): CallbackData => {
  const [callback, ...payload] = data.split(":");

  if (isCallback(callback)) {
    return { callback, payload: payload.join(":") };
  }

  return undefined;
};
