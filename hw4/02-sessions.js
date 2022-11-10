const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use the express-session module
app.use(
  session({
    secret: 'secret-key',
    resave: 'false',
    saveUninitialized: 'true'
  })
);

const getRoutes = (routes) => {
  let result = '';
  if (routes.length === 1) return result;

  routes.forEach((elem, index) => {
    if (elem !== '/favicon.ico' && index !== routes.length - 1) {
      result += `<li style ="margin-left: 15px">\t${elem}</li>`;
    }
  });

  return result;
};

app.use((req, res, next) => {
  if (req.session.urlList) req.session.urlList.push(req.url);
  else req.session.urlList = [req.url];
  next();
});
app.get('*', (req, res) => {
  const routes = getRoutes(req.session.urlList);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<br><span">Currently on route: ${req.url}</span><br><br>`);

  if (routes === '') {
    res.write(`<span">Welcome to http://localhost:${port}</span>`);
  } else {
    res.write(
      `<ul style = "list-style-type: none; padding: 0">Previously Visited: ${routes}</ul>`
    );
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
