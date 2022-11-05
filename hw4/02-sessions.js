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
  if (routes === undefined) return result;
  routes.forEach(
    (elem) => (result += `<li style ="margin-left: 15px">\t${elem}</li>`)
  );

  return result;
};
app.get('*', (req, res) => {
  console.log(req.session.urlList);
  const routes = getRoutes(req.session.urlList, 1);
  if (req.session.urlList) {
    console.log(req.session.urlList, 2);
    req.session.urlList.push(req.url);
  } else {
    console.log(req.session.urlList, 3);
    req.session.urlList = [req.url];
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });

  console.log(routes);
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
