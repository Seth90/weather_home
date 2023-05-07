const fs = require('fs');

const express = require('express');
const app = express();

const PORT = 3000;

app.get('/ya_data', (req, res) => {
    console.log(req.url);
    if (fs.existsSync('./node-js/data/ya_w.json')) {
        let data = fs.readFileSync('./node-js/data/ya_w.json', (err) => {
            err ? console.log(err) : null});
        console.log(`Data: ОК`);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.send(data);
        console.log('OK')
    }
    else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.send('not extsts');
        console.log('Not exist')
    }   
})
app.get('/accu_data', (req, res) => {
  console.log(req.url);
  if (fs.existsSync('./node-js/data/accu_w.json')) {
      let data = fs.readFileSync('./node-js/data/accu_w.json', (err) => {
          err ? console.log(err) : null});
      console.log(`Data: ОК`);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.send(data);
      console.log('OK')
  }
  else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.send('not extsts');
      console.log('Not exist')
  }   
})

app.listen(PORT, () => {
    console.log(`Starting listening on port ${PORT}`)
  })