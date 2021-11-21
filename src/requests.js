import getMessage from './getMessage';
import { query, execute } from './queries';
import lodash from 'lodash';

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
    const id = req.query.id;
    console.log(id)
    try {
        const dlcs = await query(`SELECT * FROM [dlcs] WHERE id = '${id}';`);
        res.send({ dlcs })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.process.message }).end();
    }
}

const createGames = async (req, res) => {
    const tableName = req.body.table;
    let table, title, finished, fisical_disc, id, system;

    table = selectTable(tableName)

    title = req.body.title;
    finished = req.body.finished ? req.body.finished : false;
    fisical_disc = req.body.fisical_disc ? req.body.fisical_disc : false;
    id = req.body.id;
    system = req.body.system;

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

        if (tableName === 'wii' || tableName === 'wiiu') {
            q = `INSERT INTO [${table}] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`;
        } else if (tableName === 'tobuy') {
            q = `INSERT INTO [${table}] (title,finished,system) VALUES ('${title}',${finished},${system});`;
        }
        else {
            q = `INSERT INTO [${table}] (id,title,finished) VALUES ('${id}','${title}',${finished});`;
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
    let q = `UPDATE [dlcs] SET [finished] = ${finished} WHERE [idx] = ${idx} AND [id] = '${id}';`;
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
    let table, title, finished, appid;

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
            q = `UPDATE [${table}] SET [finished] = ${finished} WHERE [appid] = ${appid};`;
        } else {
            q = `UPDATE [${table}] SET [finished] = ${finished} WHERE [title] = '${title}';`;
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
    let table, id, idx, title, finished, fisical_disc, system;

    id = req.body.id;
    idx = req.body.idx;
    title = req.body.title;
    finished = req.body.finished;
    fisical_disc = req.body.fisical_disc;
    system = req.body.system


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
            q = `UPDATE [${table}] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`;
        } else if (table === 'tobuy') {
            q = `UPDATE [${table}] SET [title] = '${title}', [finished] = ${finished}, [system] = '${system}' WHERE [idx] = ${idx};`;
        } else {
            q = `UPDATE [${table}] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`;
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

export {
    showWelcome, showTest, showStatistics, showCategories, showOriginGames, showUbisoftGames,
    showSteamGames, showAllGames, showWiiGames, showGameCubeGames, showVirtualConsoleGames,
    showToBuyGames, showWiiUGames, showPCGames, showConsoleGames, showDLCs, createGames, finishDLC,
    finishGame, searchGame, updateGame, deleteGame
}