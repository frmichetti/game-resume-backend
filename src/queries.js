import ADODB from 'node-adodb';
const databasePath = 'D:\\DATABASE\\steam_games.accdb'
// Connect to the MS Access DB
const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${databasePath};Persist Security Info=False;'`);

export async function query(sql) {
      const result = await connection.query(sql);   
      console.log(sql)
      // console.log(JSON.stringify(result, null, 2));   
      return result;
  }
  export async function execute(sql) {    
      const result = await connection.execute(sql);
      console.log(sql)
      // console.log(JSON.stringify(result, null, 2));
   
      return result;    
  }