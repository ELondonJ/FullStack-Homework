/** Exercise 04 - API * */
const url = 'https://restcountries.com/v3.1/all?fields=name,population';

const addToDom = (country) => {
  const toAdd = `${
    country.name.common
  } - ${country.population.toLocaleString()}`;
  const results = document.getElementById('results');
  const item = document.createElement('li');

  item.className = 'h5';
  item.textContent = toAdd;
  results.appendChild(item);
};

const getData = async function(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    data.sort((a, b) => {
      const ca = a.name.common;
      const cb = b.name.common;

      if (ca < cb) return -1;
      if (ca > cb) return 1;

      return 0;
    });
    data.forEach((country) => {
      addToDom(country);
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log('complete');
  }
};

getData(url);
