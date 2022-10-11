/** Exercise 01 - Coins * */

const calculateChange = (input) => {
  let string = ` $${input} ===> `;
  const verify = /^\d+(?:\.\d{0,2})$/;

  if (!verify.test(input)) {
    string += 'Error: incorrect format';
    return string;
  }
  if (input > 10.0) {
    string += 'Error: the number is too large';
    return string;
  }

  let change = input;
  const dollars = Math.floor(input);
  const money = {
    dollar: dollars,
    quarter: 0,
    dime: 0,
    nickel: 0,
    penny: 0
  };
  // create a whole number from the decimal value the input
  if (dollars === 0) {
    change *= 100;
  } else {
    change = Math.round((input - dollars) * 100);
  }

  money.quarter = parseInt(change / 25, 10);
  change %= 25;
  money.dime = parseInt(change / 10, 10);
  change %= 10;
  money.nickel = parseInt(change / 5, 10);
  change %= 5;
  money.penny = change;

  Object.entries(money).forEach((item) => {
    const value = item[1];
    const key = item[0];

    if (value > 0) {
      string += `${value} `;
      if (key === 'penny') {
        if (value > 1) {
          string += 'pennies';
        } else {
          string += key;
        }
      } else {
        string += key;
        if (value > 1) {
          string += 's';
        }
        string += ', ';
      }
    }
  });

  return string;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
console.log(calculateChange('aba'));
//  ==> Error: incorrect format
