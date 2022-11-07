const { deepStrictEqual } = require('assert');
const fs = require('fs');
const fetch = require('node-fetch');

//Ivanovo 57.000353, 40.973930//

const URL = 'https://api.weather.yandex.ru/v2/informers?lat=57.000353&lon=40.973930';
const API_KEY = '492c7161-94e4-407b-8e3a-b93feea2bf44';

const headers = {
    'Content-Type' : 'application/json',
    'X-Yandex-API-Key': API_KEY
}

const getData = () => {
    fetch(URL, {headers : headers})
        .then(res => res.json())
        .then(json => {
            fs.mkdir('./data', (error) => {
                error ? console.log(error) : fs.writeFile('./data/ya_w.json', JSON.stringify(json), (error) => {
                    error ? console.log(error) : null;
                });
            })
        })
    }


//setInterval(getData(), 1800000);