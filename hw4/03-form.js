const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
  const name = req.body.name === '' ? 'not provided' : req.body.name;
  const email = req.body.email === '' ? 'not provided' : req.body.email;
  const feedback =
    req.body.feedback === '' ? 'not provided' : req.body.feedback;
  const newsletter =
    req.body.newsletter === undefined
      ? 'No, do not sign me up'
      : 'Yes, sign me up';
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<span> Name: ${name} </span><br>`);
  res.write(`<span>Email: ${email} </span><br>`);
  res.write(`<span>Feedback: ${feedback}</span><br>`);
  res.write(`<span>Newsletter: ${newsletter}</span><br>`);
  res.end();
  // Add your code here
});

app.get('/', (req, res) => {
  res.status(200);
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
