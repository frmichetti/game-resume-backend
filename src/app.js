import express from 'express';
import getMessage from './getMessage.js';
import {query, execute} from './queries.js';
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

app.post('/create', async (req,res) => {
  console.log(req.body)
  
  const tableName = req.body.table;
  let table, title, finished, id;

  switch (tableName) {
    case "wiiu":
        table = "WiiU Games"
      break;
    case "wii":
        table = "Wii GC Games"
      break;
    case "origin":
        table = "Origin Games"
      break;
    case "ubisoft":
        table = "Ubisoft Games"
      break;    
    default:
        table = null;
      break;
  }
    if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    title = req.body.title;
    if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    finished = req.body.finished;
    id =req.body.id;

    if (finished == null) {
      const errorMessage ="Finished is not Defined"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }


  let q = "";
  q = `INSERT INTO [${table}] (ID,NAME,FINISHED) VALUES ('${id}','${title}',${finished});`;
  // console.log(q);

  const result = await execute(q);

  console.log(result);

  res.send({
    ok: "ok"    
  })
});

app.post('/finished', async (req, res) => {
  console.log(req.body)
  
  const tableName = req.body.table;
  let table, title, finished;

  switch (tableName) {
    case "wiiu":
        table = "WiiU Games"
      break;
    case "wii":
        table = "Wii GC Games"
      break;
    case "origin":
        table = "Origin Games"
      break;
    case "ubisoft":
        table = "Ubisoft Games"
      break;    
    default:
        table = null;
      break;
  }
    if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    title = req.body.title;
    if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    finished = req.body.finished;

    if (finished == null) {
      const errorMessage ="Finished is not Defined"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }


  let q = "";
  q = `UPDATE [${table}] SET [finished] = ${finished} WHERE [name] = '${title}';`;
  // console.log(q);

  const result = await execute(q);
  

  res.send({ result });
});

app.delete('/remove', async (req, res) => {
  console.log(req.body)

  const tableName = req.body.table;
  let table, title;

  switch (tableName) {
    case "wiiu":
        table = "WiiU Games"
      break;
    case "wii":
        table = "Wii GC Games"
      break;
    case "origin":
        table = "Origin Games"
      break;
    case "ubisoft":
        table = "Ubisoft Games"
      break;    
    default:
        table = null;
      break;
  }
    if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    title = req.body.title;
    if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    }

    let q = "";
    q = `DELETE FROM [${table}] WHERE [NAME] = '${title}';`;
    // console.log(q);
  
    const result = await execute(q);

  res.send({ok:"ok"})
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});