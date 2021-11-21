const ADODB = require('node-adodb');
const databasePath = 'D:\\DATABASE\\steam_games.accdb'
// Connect to the MS Access DB
const connection = ADODB.open(`Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${databasePath};Persist Security Info=False;'`);

const fs = require('fs');
const readline = require('readline');

async function processLineByLine(file) {
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    const data = await connection.execute(`INSERT INTO [categories] (description) VALUES ("${line}");`)     
  }
}

(async() => {  

    processLineByLine("D://DATABASE//categories.txt")    
    
  })();