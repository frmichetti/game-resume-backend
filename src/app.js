import express from 'express';
import getMessage from './getMessage';
import query from './queries';
import cors from 'cors';
import lodash from 'lodash';


var app = express();
app.use(cors());
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

  res.send({
    games: games
  })
});

app.get('/console', async (req, res) => {

  const games = await query('SELECT * FROM [All Console Games]');

  res.send({
    games: games
  })
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});