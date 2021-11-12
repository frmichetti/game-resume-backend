import ADODB from 'node-adodb';

// Connect to the MS Access DB
const connection = ADODB.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\DATABASE\\steam_games.accdb;Persist Security Info=False;');

export default async function query(sql) {
    try {
      const result = await connection.query(sql);
   
     // console.log(JSON.stringify(result, null, 2));
   
      return result;
    } catch (error) {
      console.error(error);
    }
  } 