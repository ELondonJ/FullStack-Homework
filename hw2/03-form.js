/** Exercise 03 - Form * */
const hw2Form = document.getElementById('hw2Form');

hw2Form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const fv = new FormData(hw2Form);
  let name = 'No name entered';
  let email = 'No email entered';
  let feedback = 'No feedback entered';
  let newslet = 'Yes, sign me up for the newsletter';
  const noNewslet = 'No, do not sign me up for the newsletter';

  if (fv.get('name') !== '') name = fv.get('name');
  if (fv.get('email') !== '') email = fv.get('email');
  if (fv.get('feedback') !== '') feedback = fv.get('feedback');
  if (fv.get('newsletter') === null) newslet = noNewslet;

  console.log('=======Form Submission=======');
  console.log(`\tName: ${name}`);
  console.log(`\tEmail: ${email}`);
  console.log(`\tFeedback: ${feedback}`);
  console.log(`\tNewsletter: ${newslet}`);
});
