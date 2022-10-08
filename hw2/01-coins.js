/** Exercise 01 - Coins * */

const calculateChange = (input) => {
  // Add your code here  let change = input
  let change = input;
  const dollar = Math.floor(input);
  let quarter = 0;
  let dime = 0;
  let nickel = 0;
  let penny = 0;

  if (dollar === 0) {
    change *= 100;
  } else {
    change = Math.round((input - dollar) * 100);
  }

  quarter = parseInt(change / 25, 10);
  change %= 25;
  console.log(quarter, change);
  dime = parseInt(change / 10, 10);
  change %= 10;
  nickel = parseInt(change / 5, 10);
  change %= 5;

  let string =
    'dollar: ' +
    dollar +
    ' quater: ' +
    quarter +
    ' dime: ' +
    dime +
    ' nickel: ' +
    nickel +
    ' penny: ' +
    change;
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
