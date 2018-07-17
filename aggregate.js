/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');
const mapper = require('./continentCountries.json');

const aggregate = () => new Promise((resolve) => {
  const myReadStream = fs.createReadStream('/aggregate-gdp-population-js-problem-Ritam-majumdar/data/datafile.csv', 'utf8');
  const continentData = {};
  let i;
  myReadStream.on('data', (chunk) => {
    const csvTextProcessed = chunk.replace(/['"]+/g, '');
    const csvRows = csvTextProcessed.split('\n');
    const csvHeaders = csvRows[0].split(',');
    const countryNameIndex = csvHeaders.indexOf('Country Name');
    const populationIndex = csvHeaders.indexOf('Population (Millions) - 2012');
    const gdpIndex = csvHeaders.indexOf('GDP Billions (US Dollar) - 2012');
    for (i = 1; i < csvRows.length - 2; i += 1) {
      const countryData = csvRows[i].split(',');
      const countryGdp = parseFloat(countryData[gdpIndex]);
      const countryPopulation = parseFloat(countryData[populationIndex]);
      if (continentData[mapper[countryData[countryNameIndex]]] === undefined) {
        continentData[mapper[countryData[countryNameIndex]]] = {};
        continentData[mapper[countryData[countryNameIndex]]].GDP_2012 = countryGdp;
        continentData[mapper[countryData[countryNameIndex]]].POPULATION_2012 = countryPopulation;
      } else {
        continentData[mapper[countryData[countryNameIndex]]].GDP_2012 += countryGdp;
        continentData[mapper[countryData[countryNameIndex]]].POPULATION_2012 += countryPopulation;
      }
    }
    fs.writeFile('./output/output.json', JSON.stringify(continentData), () => {
      resolve();
    });
  });
});
aggregate();
module.exports = aggregate;
