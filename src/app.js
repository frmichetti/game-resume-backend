import express from 'express';
import getMessage from './getMessage';
import ADODB from 'node-adodb';

var app = express();

var port = 4000;


// Connect to the MS Access DB
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\DATABASE\\steam_games.accdb;Persist Security Info=False;');




async function query() {
  try {
    const users = await connection.query('SELECT * FROM [Origin Games]');
 
    console.log(JSON.stringify(users, null, 2));
  } catch (error) {
    console.error(error);
  }
}
 
query();
 

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

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});