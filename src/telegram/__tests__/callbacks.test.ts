import { Callback, decodeCallbackData, encodeCallbackData } from "../callbacks";

describe("Test Callbacks", () => {
  it("should encode/decode callback data", () => {
    const T_CALLBACK: Callback = Callback.CATEGORY;
    const T_PAYLOAD: string = "somevalue";
    const T_DATA = `${T_CALLBACK}_${T_PAYLOAD}`;

    expect(
      encodeCallbackData({ callback: T_CALLBACK, payload: T_PAYLOAD })
    ).toStrictEqual(T_DATA);
    expect(decodeCallbackData(T_DATA)).toStrictEqual({
      callback: T_CALLBACK,
      payload: T_PAYLOAD,
    });
  });
});
