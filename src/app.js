import express from 'express';
import getMessage from './getMessage';
import query from './queries';


var app = express();

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

  const games = await query('SELECT * FROM [Steam Games]');

  res.send({
    games: games
  })
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});