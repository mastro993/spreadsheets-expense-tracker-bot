const amountRegEx = /[0-9]+([,.][0-9]{1,2})?/;

export const extractAmountAndDescription = (
  text: string
): [number | undefined, string | undefined] => {
  let amount: number;
  let description: string;

  const amountMatch = text.match(amountRegEx);
  if (amountMatch) {
    const amountString = amountMatch[0].replace(",", ".");
    text =
      text.slice(0, amountMatch.index) +
      text.slice(amountMatch.index + amountString.length);
    amount = parseFloat(amountString);
  }

  const descriptionMatch = text.match(/\D*/g);
  if (descriptionMatch) {
    const descriptionStrings = descriptionMatch
      .filter((_) => _.length !== 0)
      .map((_) => _.replace(/\s+/g, " "))
      .map((_) => _.trim());

    if (descriptionStrings.length > 0) {
      description = descriptionStrings.join(" ");
    }
  }

  return [amount, description];
};
