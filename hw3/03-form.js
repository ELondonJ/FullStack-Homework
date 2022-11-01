const http = require('http');
const staticF = require('node-static');
const querystring = require('node:querystring');
const { resourceLimits } = require('worker_threads');
const port = process.env.PORT || 5001;

const file = new staticF.Server('./hw3');

const server = http.createServer((req, res) => {
  const routes = ['form', 'submit'];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) =>
        (result += `<li><a href="http://localhost:5001/${elem}">${elem}</a></li>`)
    );
    return result;
  };

  if (req.method === 'GET' && req.url === '/') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 03</h1>`);
    res.write(`<ul> ${routeResults} </u>`);
    res.end();
  } else if (req.method === 'GET' && req.url === '/form') {
    file.serveFile('/form.html', 200, {}, req, res);
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const userdata = querystring.parse(body);
      const { username, email } = userdata;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<span> Username: ${username} </span><br/>`);
      res.write(`<span> Email: ${email} </span>`);
    });
  }
});

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
