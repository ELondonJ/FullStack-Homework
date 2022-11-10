const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks'
  ];

  const createTable = (params) => {
    let result = '';
    for (const p of params) {
      result += `<tr><td>${p[0]}</td><td>${p[1]}</td></tr>`;
    }
    console.log(result);
    return result;
  };

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let query = url.search;
    let params = new URLSearchParams(query);
    let table = createTable(params);
    res.write('<style> table, th, td { border:1px solid black;}</style>');
    res.write(`<table> ${table} </table>`);
  }

  // Add your code here

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
