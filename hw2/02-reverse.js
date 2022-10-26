/** Exercise 02 - Reverse **/

// Add your code here
function reverseNum() {
  const main = document.getElementsByTagName('main')[0];
  const number = document.getElementById('input').value;
  if (document.getElementById('invalid') !== null) {
    document.getElementById('invalid').remove();
  }
  if (document.getElementById('success') !== null) {
    document.getElementById('success').remove();
  }
  if (number.toString(10).length !== 8) {
    const inValid = document.createElement('div');
    inValid.id = 'invalid';
    inValid.classList = 'mt-4 text-danger';
    inValid.innerHTML = 'Error: Please input an 8-digit number';
    main.appendChild(inValid);
    return;
  }
  const reversed = number
    .toString(10)
    .split('')
    .reverse()
    .join('');
  const success = document.createElement('div');
  success.id = 'success';
  success.classList = 'mt-4 text-success';
  success.innerHTML = `${number} --> ${reversed}`;
  main.appendChild(success);
}
document.getElementById('reverse').addEventListener('click', reverseNum);
