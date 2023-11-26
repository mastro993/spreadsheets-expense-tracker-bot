import { Telegram } from "../../types/Telegram";
import { Callback, encodeCallbackData } from "./types";

const getDaysInMonth = (year: number, month: number): number => {
  // Passing the month + 1 and day 0 we get the last day of the current month
  return new Date(year, month + 1, 0).getDate();
};

const getWeekday = (year: number, month: number, day: number): number => {
  return new Date(year, month, day).getDay();
};

const getMonthName = (year: number, month: number): string => {
  return new Date(year, month).toLocaleString("default", {
    month: "long",
  });
};

const getDayOfWeekName = (day: number): string => {
  return new Date(0, 0, day).toLocaleDateString("default", {
    weekday: "long",
  });
};

const emptyCallbackData = encodeCallbackData({
  callback: Callback.DATE,
  payload: "none",
});

export const buildDateInputKeyboard = (calendarDate: Date) => {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth(); // 👈️ months are 0-based

  const keyboard: Telegram.Keyboard.InlineKeyboardButton[][] = [];

  const monthYearRow: Telegram.Keyboard.InlineKeyboardButton[] = [];
  monthYearRow.push({
    text: `${getMonthName(year, month)} ${year}`,
    callback_data: emptyCallbackData,
  });
  keyboard.push(monthYearRow);

  const daysOfWeekRow: Telegram.Keyboard.InlineKeyboardButton[] = [];
  for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
    daysOfWeekRow.push({
      text: `${getDayOfWeekName(dayOfWeek)[0]}`,
      callback_data: emptyCallbackData,
    });
  }
  keyboard.push(daysOfWeekRow);

  const today = new Date();
  const daysInCurrentMonth = getDaysInMonth(year, month);
  const firstDayNumber = getWeekday(year, month, 1) - 1;

  let daysRow: Telegram.Keyboard.InlineKeyboardButton[] = [];
  var remainingDays = daysInCurrentMonth;
  var x = 1;
  var y = 0;

  while (true) {
    const cellIndex = x + y * 7;
    const dayNumber = cellIndex - firstDayNumber;

    if (dayNumber <= 0 || dayNumber > daysInCurrentMonth) {
      daysRow.push({ text: ` `, callback_data: emptyCallbackData });
    } else {
      const callback_data = encodeCallbackData({
        callback: Callback.DATE,
        payload: new Date(year, month, dayNumber).toISOString(),
      });
      daysRow.push({ text: `${dayNumber}`, callback_data });
      remainingDays--;
    }

    if (++x > 7) {
      keyboard.push(daysRow);
      daysRow = [];
      y++;
      x = 1;
    }

    if (remainingDays === 0 && x === 1) {
      break;
    }
  }

  keyboard.push(daysRow);

  keyboard.push([
    {
      text: "◀️",
      callback_data: encodeCallbackData({
        callback: Callback.CALENDAR,
        payload: new Date(year, month - 1).toISOString(),
      }),
    },
    {
      text: "Today",
      callback_data: encodeCallbackData({
        callback: Callback.DATE,
        payload: today.toISOString(),
      }),
    },
    {
      text: "▶️",
      callback_data: encodeCallbackData({
        callback: Callback.CALENDAR,
        payload: new Date(year, month + 1).toISOString(),
      }),
    },
  ]);

  return keyboard;
};
