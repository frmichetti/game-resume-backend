import getMessage from './getMessage';
import { query, execute } from './queries';
import lodash from 'lodash';

const ExportData = require('./exportTocsv');
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')

const now = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

const selectTable = (tableName) => {
    switch (tableName) {
        case "wiiu":
            return "wiiu_games"
        case "gamecube":
            return "gamecube_games"
        case "wii":
            return "wii_games"
        case "origin":
            return "origin_games"
        case "ubisoft":
            return "ubisoft_games"
        case "tobuy":
            return "to_buy_games"
        case "virtualconsole":
            return "virtual_console_games"
        case "dlcs":
            return "dlcs";
        case "steam":
            return "steam_games";
        case "playing":
            return "playing_games"
        default:
            return null;
    }
}

const showWelcome = (req, res) => {
    res.send({ message: getMessage() })
}

const showTest = async (req, res) => {
    try {
        let result = await query('SELECT * FROM [origin_games]')
        res.status(200).send({ result })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showStatistics = async (req, res) => {
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
        res.status(200).send({ result })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showCategories = async (req, res) => {
    try {
        let result = await query('SELECT * FROM [categories]')
        res.status(200).send({ result })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showOriginGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [origin_games]');
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showUbisoftGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [ubisoft_games]');
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showSteamGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [all_steam_games]');

        const mapped = lodash.map(games, (item) => {
            return { finished: item.finished == 0 ? false : true, title: item.title, appid: item.appid, idx: item.idx }
        })

        res.send({ games: mapped })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showAllGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [all_games_list]');

        const mapped = lodash.map(games, (item) => {
            return { finished: item.finished == 0 ? false : true, title: item.title, system: item.system }
        })

        res.send({ games: mapped })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showWiiGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [wii_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showWiiUGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [wiiu_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showGameCubeGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [gamecube_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showVirtualConsoleGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [virtual_console_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}


const showToBuyGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [to_buy_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}


const showPCGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [all_pc_games]');

        const mapped = lodash.map(games, (item) => {
            return { finished: item.finished == 0 ? false : true, title: item.title, platform: item.platform }
        })

        res.send({ games: mapped })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showConsoleGames = async (req, res) => {
    try {
        const games = await query('SELECT * FROM [all_console_games]');

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showDLCs = async (req, res) => {
    try {
        const dlcs = await query(`SELECT * FROM [dlcs];`);
        res.send({ games: dlcs })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showDLCsByID = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    try {
        const dlcs = await query(`SELECT * FROM [dlcs] WHERE id = '${id}';`);
        res.send({ games: dlcs })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const showCharts = async (req, res) => {
    const type = req.query.type;
    console.log(type)
    // total_of_percentual_games_by_system

    if (type === 'total') {
        try {
            const stats = await query(`SELECT * FROM [total_of_percentual_games_by_system];`);
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.total)
            const dataset = "Total of Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }

    } else if (type === 'finished') {
        try {
            const stats = await query(`SELECT * FROM [total_of_percentual_finished_games_by_system];`);
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.total)
            const dataset = "Total of Finished Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    } else if (type === "total_percent") {
        try {
            const stats = await query(`SELECT * FROM [total_of_percentual_games_by_system];`);
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.percentual)
            const dataset = "Percent of Total Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    } else if (type === "finished_percent") {
        try {
            const stats = await query(`SELECT * FROM [total_of_percentual_finished_games_by_system];`);
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.percentual)
            const dataset = "Percent of Finished Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    } else {
        res.status(400).send({ msg: "unknow type" }).end();
    }
}

const showPlayingGames = async (req, res) => {
    const games = await query('SELECT * FROM [is_playing]')
    res.send({ games })
}

const createGames = async (req, res) => {
    const tableName = req.body.table;
    let table, title, finished, fisical_disc, id, system, _console;

    table = selectTable(tableName)

    title = req.body.title;
    finished = req.body.finished ? req.body.finished : false;
    fisical_disc = req.body.fisical_disc ? req.body.fisical_disc : false;
    id = req.body.id;
    system = req.body.system;
    _console = req.body.console;

    if (table == null) {
        const errorMessage = "Table does not match";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (title == null || title == '' || title == undefined) {
        const errorMessage = "Game Title is Empty";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (finished == null) {
        const errorMessage = "Finished is not Defined";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else {
        let q = "";

        if (tableName === 'wii' || tableName === 'wiiu' || tableName === 'gamecube') {
            q = `INSERT INTO [${table}] (id,title,finished,fisical_disc) VALUES ('${id}',"${title}",${finished},${fisical_disc});`;
        } else if (tableName === 'virtualconsole') {
            q = `INSERT INTO [${table}] (id,title,finished,console,system) VALUES ('${id}',"${title}",${finished},'${_console}', '${system}');`;
        } else if (tableName === 'tobuy') {
            q = `INSERT INTO [${table}] (title,finished,system) VALUES ("${title}",${finished},'${system}');`;
        } else if (tableName === 'playing') {
            q = `INSERT INTO [${table}] (id, started_at) VALUES ("${id}","${now()}");`
        }
        else {
            q = `INSERT INTO [${table}] (id,title,finished) VALUES ('${id}',"${title}",${finished});`;
        }

        try {
            const result = await execute(q);

            res.send({ ok: "ok" })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    }
}
const finishDLC = async (req, res) => {
    const { idx, id, finished } = req.body
    let q = `UPDATE [dlcs] SET [finished] = ${finished}, [finished_at] = "${now()}" WHERE [idx] = ${idx} AND [id] = '${id}';`;
    try {
        let result = await execute(q);

        q = `SELECT * FROM [dlcs] WHERE [id] = '${id}';`

        result = await query(q);

        res.send({ dlcs: result });
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const finishGame = async (req, res) => {

    const tableName = req.body.table;
    let table, title, finished, appid, idx;

    idx = req.body.idx;
    title = req.body.title;
    appid = req.body.appid;
    finished = req.body.finished;

    table = selectTable(tableName)

    if (table == null) {
        const errorMessage = "Table does not match";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (title == null || title == '' || title == undefined) {
        const errorMessage = "Game Title is Empty";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (finished == null) {
        const errorMessage = "Finished is not Defined";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else {

        let q = "";

        if (tableName === 'steam') {
            q = `UPDATE [steam_finished] SET [finished] = ${finished}, [finished_at] = "${now()}" WHERE [appid] = ${appid};`;
        } else if (tableName === 'playing') {
            q = `UPDATE [${table}] SET [finished] = ${finished}, [finished_at] = "${now()}" WHERE [idx] = ${idx};`;
        } else {
            q = `UPDATE [${table}] SET [finished] = ${finished}, [finished_at] = "${now()}" WHERE [title] = '${title}';`;
        }

        try {
            const result = await execute(q);

            res.send({ result });
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    }
}

const searchGame = async (req, res) => {
    const q = req.body.query;
    try {

        const games = await query(`SELECT * FROM [all_games_list_api] WHERE title Like "*${q}*";`);

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const updateGame = async (req, res) => {

    const tableName = req.body.table;
    let table, id, idx, title, finished, fisical_disc, system, _console;

    id = req.body.id;
    idx = req.body.idx;
    title = req.body.title;
    finished = req.body.finished;
    fisical_disc = req.body.fisical_disc;
    system = req.body.system
    _console = req.body.console


    table = selectTable(tableName)

    if (table == null) {
        const errorMessage = "Table does not match";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (title == null || title == '' || title == undefined) {
        const errorMessage = "Game Title is Empty";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (finished == null) {
        const errorMessage = "Finished is not Defined";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (idx == null) {
        const errorMessage = "IDX is required";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else {
        let q = "";

        if (table === 'wiiu_games' || table === 'wii_games' || table === 'gamecube_games') {
            q = `UPDATE [${table}] SET [id] = '${id}',[title] = "${title}", [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`;
        } else if (table === 'virtual_console_games') {
            q = `UPDATE [${table}] SET [id] = '${id}',[title] = "${title}", [finished] = ${finished}, [system] = '${system}', [console] = '${_console}' WHERE [idx] = ${idx};`;
        } else if (table === 'to_buy_games') {
            q = `UPDATE [${table}] SET [title] = "${title}", [finished] = ${finished}, [system] = '${system}' WHERE [idx] = ${idx};`;
        } else {
            q = `UPDATE [${table}] SET [id] = '${id}',[title] = "${title}", [finished] = ${finished} WHERE [idx] = ${idx};`;
        }

        try {
            const result = await execute(q);

            res.send({ result });

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    }
}

const deleteGame = async (req, res) => {

    const tableName = req.body.table;
    const title = req.body.title;
    const idx = req.body.idx;

    let table;

    table = selectTable(tableName)

    if (table == null) {
        const errorMessage = "Table does not match";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (title == null || title == '' || title == undefined) {
        const errorMessage = "Game Title is Empty";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else if (table === 'playing_games') {
        let q = "";
        q = `DELETE FROM [${table}] WHERE [idx] = ${idx};`;

        try {
            const result = await execute(q);

            res.send({ ok: "ok" })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    } else {
        let q = "";
        q = `DELETE FROM [${table}] WHERE [title] = '${title}';`;

        try {
            const result = await execute(q);

            res.send({ ok: "ok" })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.process.message }).end();
        }
    }
}

const exportToCsv = async (req, res, next) => {
    let table = req.query.table;
    let result = await query(`SELECT * FROM [${table}]`)

    try {
        let { filename, csv } = ExportData.tocsv(result, Object.keys(result[0]));
        res.header('Content-Type', 'text/csv');
        res.attachment(filename);
        res.status(200).send(csv);

    } catch (error) {
        console.error(error)
    }
}

const exportToPDF = async (req, res, next) => {
    let from = req.query.from;

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(`http://localhost:4000/report?from=${from}`, {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    })

    await browser.close()

    res.contentType("application/pdf")

    return res.send(pdf)
}

const showReport = async (req, res, next) => {
    let q = ""

    switch (req.query.from) {
        case 'steam':
            q = `SELECT * FROM [steam_games] INNER JOIN [steam_finished] ON [steam_games].appid = [steam_finished].appid`
            break;
        case 'origin':
            q = 'SELECT * FROM [origin_games];'
            break;
        case 'ubisoft':
            q = `SELECT * FROM [ubisoft_games];`
            break;
        case 'gamecube':
            q = `SELECT * FROM [gamecube_games];`
            break;
        case 'wii':
            q = `SELECT * FROM [wii_games];`
            break;
        case 'wiiu':
            q = `SELECT * FROM [wiiu_games];`
            break;
        case 'virtualconsole':
            q = `SELECT * FROM [virtual_console_games];`
            break;
        case 'all':
            q = `SELECT * FROM [all_games_list];`
            break;
        case 'finished':
            q = `SELECT * FROM [all_finished_games_list];`
            break;
        case 'unfinished':
            q = `SELECT * FROM [all_unfinished_games_list];`
            break;
        default:
            q = 'SELECT 1'
            break;
    }

    let games = await query(q);
    games = games.map(g => {
        return { id: g['steam_games.appid'] || g.id, title: g.title, finished: g.finished }
    })
    const filePath = path.join(__dirname, "report.ejs")
    ejs.renderFile(filePath, { games }, (err, html) => {
        if (err) {
            return res.send('Erro na leitura do arquivo')
        }

        return res.send(html)
    })
}
const exportToXls = async (req, res, next) => {
    let q = ""

    switch (req.query.from) {
        case 'steam':
            q = `SELECT * FROM [steam_games] INNER JOIN [steam_finished] ON [steam_games].appid = [steam_finished].appid`
            break;
        case 'origin':
            q = 'SELECT * FROM [origin_games];'
            break;
        case 'ubisoft':
            q = `SELECT * FROM [ubisoft_games];`
            break;
        case 'gamecube':
            q = `SELECT * FROM [gamecube_games];`
            break;
        case 'wii':
            q = `SELECT * FROM [wii_games];`
            break;
        case 'wiiu':
            q = `SELECT * FROM [wiiu_games];`
            break;
        case 'virtualconsole':
            q = `SELECT * FROM [virtual_console_games];`
            break;
        case 'all':
            q = `SELECT * FROM [all_games_list];`
            break;
        case 'finished':
            q = `SELECT * FROM [all_finished_games_list];`
            break;
        case 'unfinished':
            q = `SELECT * FROM [all_unfinished_games_list];`
            break;
        default:
            q = 'SELECT 1'
            break;
    }

    let games = await query(q);
    res.xls('games.xlsx', games);
}

export {
    showWelcome, showTest, showStatistics, showCategories, showOriginGames, showUbisoftGames,
    showSteamGames, showAllGames, showWiiGames, showGameCubeGames, showVirtualConsoleGames,
    showToBuyGames, showWiiUGames, showPCGames, showConsoleGames, showDLCs, showCharts, showPlayingGames, createGames, finishDLC,
    finishGame, searchGame, updateGame, deleteGame, exportToCsv, exportToPDF, showReport, exportToXls
}