/*Deprecated*/

import ADODB from 'node-adodb';
ADODB.debug = true;

const databasePath = 'C:\\DEV\\games_list\\games.accdb'
// Connect to the MS Access DB
export const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${databasePath};Persist Security Info=False;Mode=Share Deny None;'`);

export async function query(sql) {
      const result = await connection.query(sql);   
      console.log(sql)      
      return result;
  }
  export async function execute(sql) {    
      const result = await connection.execute(sql);
      console.log(sql)         
      return result;    
  }