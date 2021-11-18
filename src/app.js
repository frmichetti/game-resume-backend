import express from 'express';
import getMessage from './getMessage';
import { query, execute, connection } from './queries';
import cors from 'cors';
import lodash from 'lodash';
import bodyParser from "body-parser";

import { graphqlHTTP } from 'express-graphql';

import schema from './schema';


let app = express();

app.use('/graphql',
  (req,res,next) => {
    req["context"] = {}
    req["context"].db = connection;
    next();
  }
 ,graphqlHTTP((req)=> ({  
    schema,  
    graphiql: true,
    context: req['context']    
 })));

app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 4000;

app.get('/', async (req, res) => {
  res.send({ message: getMessage()})
});

app.get('/test', async (req, res)=> {  
  try {
    let result =await query('SELECT * FROM [origins_games]')
    res.status(200).send({result})
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  } 
});

app.get('/statistics', async (req,res) => {
  console.log("from", req.query.from);
  let q = ""

  switch (req.query.from) {
    case 'finished':
      q = 'SELECT * FROM [total_finished_games_for_dashboard];'  
      break;
    case 'totals':
      q = `SELECT * FROM [total_games_for_dashboard];`
      break;  
    default:
      q = 'SELECT 1'
      break;
  }  
  
  try {
    const result = await query(q);    
    res.status(200).send({result})
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }  
});

app.get('/origin', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [origin_games]');
    res.send({ games })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});


app.get('/ubisoft', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [ubisoft_games]');
    res.send({ games })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

app.get('/steam', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [all_steam_games]');

    const mapped = lodash.map(games, (item) => {
      return {finished: item.finished == 0 ? false : true, title: item.title, appid: item.appid, idx: item.idx }  
    })
  
    res.send({ games: mapped })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});


app.get('/all', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [all_games_list]');

    const mapped = lodash.map(games, (item) => {
      return {finished: item.finished == 0 ? false : true, title: item.title, system: item.system }  
    })
  
    res.send({ games: mapped })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

app.get('/wii', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [wii_gc_games]');

    res.send({ games })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

app.get('/wiiu', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [wiiu_games]');

    res.send({ games })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

app.get('/pc', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [all_pc_games]');
  
    const mapped = lodash.map(games, (item) => {
      return {finished: item.finished == 0 ? false : true, title: item.title, platform: item.platform }  
    })
  
    res.send({ games: mapped })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

app.get('/console', async (req, res) => {
  try {
    const games = await query('SELECT * FROM [all_console_games]');

    res.send({ games })
  } catch (error) {
    console.error(error)
    res.status(400).send({msg: error.process.message}).end();
  }   
});

const selectTable = (tableName) =>{
  switch (tableName) {
    case "wiiu":
        return "wiiu_games"      
    case "wii":
      return "wii_gc_games"      
    case "origin":
      return "origin_games"      
    case "ubisoft":
      return "ubisoft_games"      
    default:
      return null;      
  }
}

app.post('/create', async (req,res) => {  
  
  const tableName = req.body.table;
  let table, title, finished,fisical_disc, id;

  table = selectTable(tableName)

    title = req.body.title;
    finished = req.body.finished ? req.body.finished : false;
    fisical_disc = req.body.fisical_disc ? req.body.fisical_disc : false;
    id = req.body.id;

    if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else if (finished == null) {
      const errorMessage ="Finished is not Defined"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else {
      let q = "";

      if(tableName === 'wii' || tableName === 'wiiu') {
        q = `INSERT INTO [${table}] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`;
      }else {
        q = `INSERT INTO [${table}] (id,title,finished) VALUES ('${id}','${title}',${finished});`;
      }

      try {
        const result = await execute(q);
        
        res.send({ ok: "ok" })
      } catch (error) {
        console.error(error)
        res.status(400).send({msg: error.process.message}).end();
      }      
    }  
});

app.post('/finished', async (req, res) => {  
  
  const tableName = req.body.table;
  let table, title, finished, appid;

  title = req.body.title;
  appid = req.body.appid;
  finished = req.body.finished;

  table = selectTable(tableName)
    
  if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else if (finished == null) {
      const errorMessage ="Finished is not Defined"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else {

      let q = "";

      if(tableName === 'steam'){
        q = `UPDATE [${table}] SET [finished] = ${finished} WHERE [appid] = ${appid};`;
      } else {        
        q = `UPDATE [${table}] SET [finished] = ${finished} WHERE [title] = '${title}';`;        
      }      

      try {
        const result = await execute(q);      
    
        res.send({ result });
      } catch (error) {
        console.error(error)
        res.status(400).send({msg: error.process.message}).end();
      }       
    }  
});

app.delete('/remove', async (req, res) => { 

  const tableName = req.body.table;
  const title = req.body.title;

  let table;

  table = selectTable(tableName)

    if (table == null){
      const errorMessage ="Table does not match"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else if (title == null || title == '' || title == undefined) {
      const errorMessage ="Game Title is Empty"; 
      res.statusMessage = errorMessage;
      res.status(400).send({msg: errorMessage}).end();
    } else{
      let q = "";
      q = `DELETE FROM [${table}] WHERE [title] = '${title}';`;      
    
      try {
        const result = await execute(q);
  
        res.send({ok:"ok"})
      } catch (error) {
        console.error(error)
        res.status(400).send({msg: error.process.message}).end();
      }       
    }
});

app.put('/update', async (req, res) => {

  const tableName = req.body.table;
  let table, id, idx, title, finished, fisical_disc;

  id = req.body.id;
  idx = req.body.idx;
  title = req.body.title;
  finished = req.body.finished;
  fisical_disc = req.body.fisical_disc;


  table = selectTable(tableName)

  if (table == null){
    const errorMessage ="Table does not match"; 
    res.statusMessage = errorMessage;
    res.status(400).send({msg: errorMessage}).end();
  } else if (title == null || title == '' || title == undefined) {
    const errorMessage ="Game Title is Empty"; 
    res.statusMessage = errorMessage;
    res.status(400).send({msg: errorMessage}).end();
  } else if (finished == null) {
    const errorMessage ="Finished is not Defined"; 
    res.statusMessage = errorMessage;
    res.status(400).send({msg: errorMessage}).end();
  } else if (idx == null) {
    const errorMessage ="IDX is required"; 
    res.statusMessage = errorMessage;
    res.status(400).send({msg: errorMessage}).end();
  } else {
    let q = "";
    
    if(table === 'wiiu_games' || table === 'wii_gc_games') {
      q = `UPDATE [${table}] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`;  
    }else {
      q = `UPDATE [${table}] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`;  
    }    

    try {
      const result = await execute(q);  
  
      res.send({ result }); 
     
    } catch (error) {
      console.error(error)
      res.status(400).send({msg: error.process.message}).end();
    } 
  
    
  }  
});

app.post('/search', async (req, res) => {
  const q = req.body.query;     
    try {
       
      const games = await query(`SELECT * FROM [all_games_list_api] WHERE title Like "*${q}*";`);

      res.send({ games })    
    } catch (error) {
      console.error(error)
      res.status(400).send({msg: error.process.message}).end();
    }     
})

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});