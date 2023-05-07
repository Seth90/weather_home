const keys = require('./modules/api_keys.js');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

//Ivanovo 57.000353, 40.973930//

const URL = 'https://api.weather.yandex.ru/v2/informers?lat=57.000353&lon=40.973930';
const API_KEY = keys.yandex;

const data_filename = 'ya_w.json';

const headers = {
    'Content-Type' : 'application/json',
    'X-Yandex-API-Key': API_KEY
}

//const createPath = (folder) => path.resolve(__dirname, folder);

const getData = () => {
    fetch(URL, {headers : headers})
        .then(res => res.json())
        .then(json => {
          if (fs.existsSync('./data')) {
            fs.writeFile(`./data/${data_filename}`, JSON.stringify(json), (error) => {
              error ? console.log(error) : null;
          });
          }
          else {
            fs.mkdir('./data', (error) => {
                error ? console.log(error) : fs.writeFile(`./data/${data_filename}`, JSON.stringify(json), (error) => {
                    error ? console.log(error) : null;
                });
            })
          }
        })
    }

getData();
//setInterval(getData(), 1800000);