const json2csv = require('json2csv').parse;
const fs = require('fs');
const uuid = require('uuid');

module.exports.tocsv = function (characters, fields) {
    try {
        const opts = { fields };
        const csv = json2csv(characters, opts);
        const filename = uuid.v4() + ".csv"
        fs.writeFile('./exports/' + filename, csv, function (err) {
            if (err) throw err;
            console.log('file saved as ' + filename);
        });

        return {filename, csv};

    } catch (err) {
        console.error(err);
    }
}

