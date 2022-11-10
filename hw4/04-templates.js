const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

// Add your code here

app.get('/', (req, res) => {
  // render pug template for the index.html file
  res.render('index', {
    heading: 'Countries of the World',
    main:
      'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world'
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  let countries = [];
  axios
    .get(url)
    .then((response) => {
      // handle succes
      const entries = Object.entries(response.data);
      countries = entries
        .map((item) => `${item[1].name.common} - ${item[1].capital}`)
        .sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;

          return 0;
        });

      res.render('page', {
        heading: 'Countries and Capitals',
        results: countries
      });
    })
    .catch((error) => {
      countries.push(error);
    });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  axios
    .get(url)
    .then((response) => {
      const entries = Object.entries(response.data);
      let populous = entries
        .filter((item) => item[1].population >= 50000000)
        .sort((a, b) => {
          if (a[1].population > b[1].population) return -1;
          if (a[1].population < b[1].population) return 1;
          return 0;
        })
        .map((item) => {
          let formatPop = item[1].population.toLocaleString();
          return `${item[1].name.common}- ${formatPop}`;
        });

      res.render('page', {
        heading: 'Most Populous Countries',
        results: populous
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array
  axios
    .get(url)
    .then((response) => {
      const entries = Object.entries(response.data);
      let regions = entries.map((item) => item[1].region);
      let regionsCount = regions.reduce((allRegions, name) => {
        const currCount = allRegions[name] ?? 0;
        return {
          ...allRegions,
          [name]: currCount + 1
        };
      }, {});
      regions = [];
      Object.entries(regionsCount).forEach((item) =>
        regions.push(`${item[0]} - ${item[1]}`)
      );

      res.render('page', {
        heading: 'Regions of the World',
        results: regions
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
