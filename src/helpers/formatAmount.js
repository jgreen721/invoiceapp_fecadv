export const formatAmount = (number) => {
  number = JSON.stringify(number);
  if (number.indexOf(".") == -1) {
    number += ".0";
  }
  number = number.split(".");

  let cents = number[1];
  cents = cents.padEnd(2, "0");

  let dollars = number[0];
  let count = 0;
  let formattedDollars = "";
  for (let i = dollars.length - 1; i >= 0; i--) {
    formattedDollars += dollars[i];
    count++;
    if (count == 3 && i != 0) {
      formattedDollars += ",";
      count = 0;
    }
  }
  formattedDollars = formattedDollars.split("").reverse();
  formattedDollars = formattedDollars.join("");
  number[0] = formattedDollars;
  number[1] = cents;

  return number.join(".");
};
