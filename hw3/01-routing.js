const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other'
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) =>
        (result += `<li><a href="http://localhost:5001/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Welcome</h1>`);
    res.write('<h3>This is the welcome page</h3>');
    res.end();
  } else if (req.url === '/redirected') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>You have been redirected</h1>');
    res.end();
  } else if (req.url === '/redirect') {
    res.writeHead(302, { Location: 'http://localhost:5001/redirected' });
    res.end();
  } else if (req.url === '/cache') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=86400'
    });
    res.write('<h1>This resource was cached</h1>');
    res.end();
  } else if (req.url === '/cookie') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': 'hello=world'
    });
    res.write('<h1>Cookies....yum</h1>');
    res.end();
  } else if (req.url === '/check-cookies') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let cookieHeader = req.headers?.cookie;
    cookieHeader = cookieHeader.split(';');

    let result = 'No';

    cookieHeader.forEach((element) => {
      const list = element.split('=');
      const cookie = list[0].trim();
      if (cookie === 'hello') result = 'Yes';
    });

    res.write(`${result}`);
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>404 - Page Not Found</h1>`);
    res.end();
  }

  // Add your code here
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
