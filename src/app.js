import express from 'express';
import getMessage from './getMessage';
import query from './queries';
import cors from 'cors';
import lodash from 'lodash';
import bodyParser from "body-parser";

var app = express();
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var port = 4000;




app.get('/', async (req, res) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('waiting - ');
      resolve(true);
    }, 1000);
  });

  res.send({
    message: getMessage(),
  })
});

app.get('/origin', async (req, res) => {

  const games = await query('SELECT * FROM [Origin Games]');

  res.send({
    games: games
  })
});


app.get('/ubisoft', async (req, res) => {

  const games = await query('SELECT * FROM [Ubisoft Games]');

  res.send({
    games: games
  })
});

app.get('/steam', async (req, res) => {

  const games = await query('SELECT * FROM [All Steam Games]');

  const mapped = lodash.map(games, (item) => {
    return {finished: item.finished == 0 ? false : true, name: item.name, appid: item.appid }  
  })

  res.send({
    games: mapped
  })
});


app.get('/all', async (req, res) => {

  const games = await query('SELECT * FROM [All Games List]');

  const mapped = lodash.map(games, (item) => {
    return {finished: item.finished == 0 ? false : true, name: item.name, system: item.system }  
  })

  res.send({
    games: mapped
  })
});

app.get('/wii', async (req, res) => {

  const games = await query('SELECT * FROM [Wii GC Games]');

  res.send({
    games: games
  })
});

app.get('/wiiu', async (req, res) => {

  const games = await query('SELECT * FROM [WiiU Games]');

  res.send({
    games: games
  })
});

app.get('/pc', async (req, res) => {

  const games = await query('SELECT * FROM [All PC Games]');

  
  const mapped = lodash.map(games, (item) => {
    return {finished: item.finished == 0 ? false : true, name: item.name, platform: item.platform }  
  })

  res.send({
    games: mapped
  })
});

app.get('/console', async (req, res) => {

  const games = await query('SELECT * FROM [All Console Games]');

  res.send({
    games: games
  })
});

app.post('/finished', async (req, res) => {
  console.log(req.body)
  /*res.json(req.body)*/
  res.send({
    ok: "ok"
  })
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});