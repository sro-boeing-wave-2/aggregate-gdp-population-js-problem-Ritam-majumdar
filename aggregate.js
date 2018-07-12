/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');

const aggregate = () => {
  const myReadStream = fs.createReadStream('/aggregate-gdp-population-js-problem-Ritam-majumdar/data/datafile.csv', 'utf8');
  const continentData = {};
  let i;
  let contIndex;
  const continent = ['South America', 'Oceania', 'North America', 'Asia', 'Europe', 'Africa'];
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
      if (countryData[0] === 'Canada' || countryData[0] === 'Mexico' || countryData[0] === 'USA') {
        contIndex = 2;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (countryData[0] === 'Brazil' || countryData[0] === 'Argentina') {
        contIndex = 0;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (countryData[0] === 'China' || countryData[0] === 'India' || countryData[0] === 'Indonesia' || countryData[0] === 'Japan' || countryData[0] === 'Saudi Arabia' || countryData[0] === 'Russia' || countryData[0] === 'Republic of Korea' || countryData[0] === 'Turkey') {
        contIndex = 3;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (countryData[0] === 'South Africa') {
        contIndex = 5;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (countryData[0] === 'France' || countryData[0] === 'Germany' || countryData[0] === 'Italy' || countryData[0] === 'United Kingdom') {
        contIndex = 4;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      } else if (countryData[0] === 'Australia') {
        contIndex = 1;
        continentData[continent[contIndex]].GDP_2012 += parseFloat(countryData[7]);
        continentData[continent[contIndex]].POPULATION_2012 += parseFloat(countryData[4]);
      }
    }
    fs.writeFileSync('./output/output.json', JSON.stringify(continentData));
  });
};
aggregate();
module.exports = aggregate;
