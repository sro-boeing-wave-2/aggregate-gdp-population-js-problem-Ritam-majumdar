/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');

const aggregate = () => new Promise((resolve) => {
  const myReadStream = fs.createReadStream('/aggregate-gdp-population-js-problem-Ritam-majumdar/data/datafile.csv', 'utf8');
  const continentData = {};
  let i;
  let contIndex;
  const continent = ['South America', 'Oceania', 'North America', 'Asia', 'Europe', 'Africa'];
  const africa = new Set(['South Africa']);
  const asia = new Set(['China', 'India', 'Indonesia', 'Japan', 'Russia', 'Republic of Korea', 'Turkey', 'Saudi Arabia']);
  const oceania = new Set(['Australia']);
  const europe = new Set(['France', 'Germany', 'Italy', 'United Kingdom']);
  const northAmerica = new Set(['Canada', 'Mexico', 'USA']);
  const southAmerica = new Set(['Brazil', 'Argentina']);
  for (i = 0; i <= 5; i += 1) {
    continentData[continent[i]] = {
      GDP_2012: 0, POPULATION_2012: 0,
    };
  }
  myReadStream.on('data', (chunk) => {
    const csvTextProcessed = chunk.replace(/['"]+/g, '');
    const csvRows = csvTextProcessed.split('\n');
    for (i = 1; i < csvRows.length - 1; i += 1) {
      const countryData = csvRows[i].split(',');
      if (northAmerica.has(countryData[0])) {
        contIndex = 2;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (southAmerica.has(countryData[0])) {
        contIndex = 0;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (asia.has(countryData[0])) {
        contIndex = 3;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (africa.has(countryData[0])) {
        contIndex = 5;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (europe.has(countryData[0])) {
        contIndex = 4;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (oceania.has(countryData[0])) {
        contIndex = 1;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      }
    }
    fs.writeFile('./output/output.json', JSON.stringify(continentData), () => {
      resolve();
    });
  });
});
aggregate();
module.exports = aggregate;
