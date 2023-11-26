import { extractAmountAndDescription } from "../strings";

describe("Test extractAmountAndDescription", () => {
  it("should return undefined amount", () => {
    const [amount, description] = extractAmountAndDescription("hello world");

    expect(amount).toBeUndefined();
    expect(description).toEqual("hello world");
  });
  it("should return amount without description", () => {
    const [amount, description] = extractAmountAndDescription("56,3");

    expect(amount).toEqual(56.3);
    expect(description).toBeUndefined();
  });
  it("should return amount with description", () => {
    const [amount, description] = extractAmountAndDescription(
      "this is a test 45.67"
    );

    expect(amount).toEqual(45.67);
    expect(description).toEqual("this is a test");
  });

  it("should return amount with description", () => {
    const [amount, description] = extractAmountAndDescription(
      "this is a test 45.67 another test"
    );

    expect(amount).toEqual(45.67);
    expect(description).toEqual("this is a test another test");
  });
});
