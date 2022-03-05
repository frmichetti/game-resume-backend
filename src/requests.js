import getMessage from './getMessage';
import db from './models/index';
import axios from 'axios';

const { QueryTypes } = require('sequelize');


const ExportData = require('./exportTocsv');
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')

const now = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

const queryInTable = (tableName) => {
    let q = ""
    switch (tableName) {
        case 'steam':
            q = `SELECT *, has_dlc(app_id) FROM "Steam ORDER BY title ASC"`
            break;
        case 'origin':
            q = 'SELECT *, has_dlc(app_id) FROM "Origin ORDER BY title ASC'
            break;
        case 'ubisoft':
            q = `SELECT *, has_dlc(app_id) FROM "Ubisoft ORDER BY title ASC`
            break;
        case 'gamecube':
            q = `SELECT *, has_dlc(app_id) FROM "GameCube ORDER BY title ASC`
            break;
        case 'wii':
            q = `SELECT *, has_dlc(app_id) FROM "Wii" ORDER BY title ASC`
            break;
        case 'wiiu':
            q = `SELECT *, has_dlc(app_id) FROM "WiiU" ORDER BY title ASC`
            break;
        case 'virtualconsole':
            q = `SELECT * FROM "VirtualConsole" ORDER BY title ASC`
            break;
        case 'all':
            q = `SELECT * FROM "all_games" ORDER BY title ASC`
            break;
        case 'finished':
            q = `SELECT * FROM "all_games" WHERE finished=true ORDER BY title ASC`
            break;
        case 'unfinished':
            q = `SELECT * FROM "all_games" WHERE finished=false ORDER BY title ASC`
            break;
        default:
            q = 'SELECT 1'
            break;
    }
    return q;
}

const selectTable = (tableName) => {
    switch (tableName) {
        case "wiiu":
            return "WiiU"
        case "gamecube":
            return "GameCube"
        case "wii":
            return "Wii"
        case "origin":
            return "Origin"
        case "ubisoft":
            return "Ubisoft"
        case "tobuy":
            return "ToBuy"
        case "virtualconsole":
            return "VirtualConsole"
        case "dlcs":
            return "DLC";
        case "steam":
            return "Steam";
        case "playing":
            return "Playing"
        default:
            return null;
    }
}

const showWelcome = (req, res) => {
    res.send({ message: getMessage() })
}

const showTest = async (req, res) => {
    try {
        const games = await db.Origin.findAll();
        res.status(200).send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showStatistics = async (req, res) => {

    let q = ""

    switch (req.query.from) {
        case 'finished':
            q = 'SELECT * FROM "total_finished_games_for_dashboard"'
            break;
        case 'totals':
            q = `SELECT * FROM "total_games_for_dashboard"`
            break;
        default:
            q = 'SELECT 1'
            break;
    }

    try {
        const result = await db.sequelize.query(q, { type: QueryTypes.SELECT });
        res.status(200).send({ result })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showCategories = async (req, res) => {
    try {
        const categories = await db.Category.findAll({ order: [["name", "ASC"]] });
        res.status(200).send({ categories })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showOriginGames = async (req, res) => {
    try {
        const games = await db.Origin.findAll({ order: [["title", "ASC"]] });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showUbisoftGames = async (req, res) => {
    try {
        const games = await db.Ubisoft.findAll({ order: [["title", "ASC"]] });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showSteamGames = async (req, res) => {
    try {
        const games = await db.Steam.findAll({ order: [["title", "ASC"]],
         attributes: ['id', 'app_id', 'title','collection','finished', 'finished_at', 
         [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']] });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const getSteamGames = async (req, res) => {
    try {
        const response = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4E1711643EDB18164E58D14FC3B11FD3&steamid=76561198179840806&format=json&include_appinfo=true`);
        const games = response.data.response.games;

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showAllGames = async (req, res) => {
    try {
        const games = await db.sequelize.query('SELECT * FROM "all_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showWiiGames = async (req, res) => {
    try {
        const games = await db.Wii.findAll({ order: [["title", "ASC"]],
        attributes: ['id', 'app_id', 'title','collection','finished', 'finished_at', 'genuine', 'fisical_disc', 
         [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']]
     });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showWiiUGames = async (req, res) => {
    try {
        const games = await db.WiiU.findAll({ order: [["title", "ASC"]],
        attributes: ['id', 'app_id', 'title','collection','finished', 'finished_at', 'genuine', 'fisical_disc', 
         [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']]
     });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showGameCubeGames = async (req, res) => {
    try {
        const games = await db.GameCube.findAll({ order: [["title", "ASC"]],
        attributes: ['id', 'app_id', 'title','collection','finished', 'finished_at', 'genuine', 'fisical_disc', 
         [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']]
     });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showVirtualConsoleGames = async (req, res) => {
    try {
        const games = await db.VirtualConsole.findAll({ order: [["title", "ASC"]] });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}


const showToBuyGames = async (req, res) => {
    try {
        const games = await db.ToBuy.findAll({ order: [["title", "ASC"]] });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}


const showPCGames = async (req, res) => {
    try {
        const games = await db.sequelize.query('SELECT * FROM "all_pc_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showConsoleGames = async (req, res) => {
    try {
        const games = await db.sequelize.query('SELECT * FROM "all_console_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showDLCs = async (req, res) => {
    try {
        const dlcs = await db.DLC.findAll({ order: [["app_id", "ASC"], ["id", "ASC"]],
        attributes: ['id', 'app_id', 'title','collection','finished', 'finished_at', 
         [db.sequelize.fn('which_system', db.sequelize.col('app_id')), 'system']]
     });
        res.send({ games: dlcs })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showDLCsByID = async (req, res) => {
    const id = req.query.id;
    try {
        const dlcs = await db.DLC.findAll({ where: { id } });
        res.send({ games: dlcs })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const showCharts = async (req, res) => {
    const type = req.query.type;

    if (type === 'total') {
        try {
            const stats = await db.sequelize.query('SELECT * FROM "total_of_games_by_system"', { type: QueryTypes.SELECT })
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.total)
            const dataset = "Total of Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }

    } else if (type === 'finished') {
        try {
            const stats = await db.sequelize.query('SELECT * FROM "total_of_finished_games_by_system"', { type: QueryTypes.SELECT })
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.total)
            const dataset = "Total of Finished Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    } else if (type === "total_percent") {
        try {
            const stats = await db.sequelize.query('SELECT * FROM "total_of_games_by_system_percentual"', { type: QueryTypes.SELECT })
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.percentual)
            const dataset = "Percent of Total Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    } else if (type === "finished_percent") {
        try {
            const stats = await db.sequelize.query('SELECT * FROM "total_of_finished_games_by_system_percentual"', { type: QueryTypes.SELECT })
            const labels = stats.map(i => i.system)
            const values = stats.map(i => i.percentual)
            const dataset = "Percent of Finished Games"

            res.send({ stats, labels, values, dataset })

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    } else {
        res.status(400).send({ msg: "unknow type" }).end();
    }
}

const showPlayingGames = async (req, res) => {
    const games = await db.Playing.findAll({ order: [["title", "ASC"]] });
    res.send({ games })
}

const createGames = async (req, res) => {
    const tableName = req.body.table;
    let table, title, finished, fisical_disc, app_id, system, platform, genuine, collection, magnetic_link;

    table = selectTable(tableName)

    title = req.body.title.replaceAll("'","''");
    finished = req.body.finished ? req.body.finished : false;
    fisical_disc = req.body.fisical_disc ? req.body.fisical_disc : false;
    app_id = req.body.app_id;
    system = req.body.system;
    platform = req.body.platform;
    genuine = req.body.genuine;
    collection = req.body.collection;
    magnetic_link = req.body.magnetic_link;

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
            if(finished){
                q = `INSERT INTO "${table}" (app_id,title,finished,finished_at,collection,genuine,fisical_disc) VALUES ('${app_id}','${title}',${finished},'${now()}',${collection},${genuine},${fisical_disc}) RETURNING *`;
            }else {
                q = `INSERT INTO "${table}" (app_id,title,finished,collection,genuine,fisical_disc) VALUES ('${app_id}','${title}',${finished},${collection},${genuine},${fisical_disc}) RETURNING *`;
            }            
        } else if (tableName === 'virtualconsole') {
            if(finished){
                q = `INSERT INTO "${table}" (app_id,title,finished,finished_at,genuine,platform,system) VALUES ('${app_id}','${title}',${finished},'${now()}','${genuine}','${platform}','${system}') RETURNING *`;
            }else{
                q = `INSERT INTO "${table}" (app_id,title,finished,genuine,platform,system) VALUES ('${app_id}','${title}',${finished},'${genuine}','${platform}','${system}') RETURNING *`;
            }            
        } else if (tableName === 'tobuy') {
            if(finished){
                q = `INSERT INTO "${table}" (title,finished,finished_at,system,magnetic_link) VALUES ('${title}',${finished},'${now()}','${system}','${magnetic_link}') RETURNING *`;
            }else {
                q = `INSERT INTO "${table}" (title,finished,system,magnetic_link) VALUES ('${title}',${finished},'${system}','${magnetic_link}') RETURNING *`;
            }            
        } else if (tableName === 'playing') {
            q = `INSERT INTO "${table}" (app_id, title, started_at) VALUES ('${app_id}','${title}','${now()}') RETURNING *`
        }
        else {
            if(finished){
                q = `INSERT INTO "${table}" (app_id,title,finished,finished_at) VALUES ('${app_id}','${title}',${finished},'${now()}') RETURNING *`;
            }else{
                q = `INSERT INTO "${table}" (app_id,title,finished) VALUES ('${app_id}','${title}',${finished}) RETURNING *`;
            }            
        }

        try {
            const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.INSERT })

            res.send({ ok: true, result, metadata })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    }
}
const finishDLC = async (req, res) => {
    const { id, app_id, finished } = req.body
    let q = `UPDATE "DLC" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} AND app_id = '${app_id}' RETURNING *`;
    try {
        const update = await db.sequelize.query(q, { type: QueryTypes.UPDATE });
        
        q = `SELECT * FROM "DLC" WHERE app_id = '${app_id}' ORDER BY title ASC`
        const result = await db.sequelize.query(q, { type: QueryTypes.SELECT });

        res.send({ dlcs: result });
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const finishGame = async (req, res) => {

    const tableName = req.body.table;
    let table, title, finished, app_id, id;

    id = req.body.id;
    title = req.body.title;
    app_id = req.body.app_id;
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

        if (tableName === 'steam' || tableName === 'Steam') {
            if(finished){
                q = `UPDATE "Steam" SET finished = ${finished}, finished_at = '${now()}' WHERE app_id = '${app_id}' RETURNING *`;
            }else{
                q = `UPDATE "Steam" SET finished = ${finished}, finished_at = null WHERE app_id = '${app_id}' RETURNING *`;
            }
            
        } else if (tableName === 'playing' || tableName === 'Playing') {
            if(finished){
                q = `UPDATE "Playing" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
            }else {
                q = `UPDATE "Playing" SET finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
            }
            
        } else {
            if(finished){
                q = `UPDATE "${table}" SET finished = ${finished}, finished_at = '${now()}' WHERE title = '${title}' RETURNING *`;
            }else {
                q = `UPDATE "${table}" SET finished = ${finished}, finished_at = null WHERE title = '${title}' RETURNING *`;
            }
            
        }

        try {
            const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.UPDATE });

            res.send({ result: result[0] });
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    }
}

const searchGame = async (req, res) => {
    const q = req.query.query;
    try {
        const games = await db.sequelize.query(`SELECT * FROM "all_games_list_api" WHERE title ilike '%${q}%';`, { type: QueryTypes.SELECT });

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const genreSearchGame = async (req, res) => {
    const q = req.query.query;
    try {
        const games = await db.sequelize.query(`select *, which_system(app_id) AS system from "all_games_genres_aggregate" WHERE genre = '${q}' ORDER BY title ASC;`, { type: QueryTypes.SELECT });

        res.send({ games })
    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
    }
}

const updateGame = async (req, res) => {

    const tableName = req.body.table;
    let table, id, app_id, title, finished, fisical_disc, system, platform, magnetic_link;

    id = req.body.id;
    app_id = req.body.app_id;
    title = req.body.title.replaceAll("'","''");
    finished = req.body.finished;
    fisical_disc = req.body.fisical_disc;
    system = req.body.system;
    platform = req.body.platform;
    magnetic_link = req.body.magnetic_link;


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
    } else if (id == null) {
        const errorMessage = "ID is required";
        res.statusMessage = errorMessage;
        res.status(400).send({ msg: errorMessage }).end();
    } else {
        let q = "";

        if (table === 'WiiU' || table === 'Wii' || table === 'GameCube') {
            if(finished){
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = '${now()}', fisical_disc = ${fisical_disc} WHERE id = ${id} RETURNING *`;
            }else{
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = null, fisical_disc = ${fisical_disc} WHERE id = ${id} RETURNING *`;
            }
            
        } else if (table === 'VirtualConsole') {
            if(finished){
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = '${now()}', system = '${system}', platform = '${platform}' WHERE id = ${id} RETURNING *`;
            }else{
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = null, system = '${system}', platform = '${platform}' WHERE id = ${id} RETURNING *`;
            }
            
        } else if (table === 'ToBuy') {
            if(finished){
                q = `UPDATE "${table}" SET title = '${title}', finished = ${finished}, finished_at = '${now()}', system = '${system}', magnetic_link = '${magnetic_link}' WHERE id = ${id} RETURNING *`;
            }else{
                q = `UPDATE "${table}" SET title = '${title}', finished = ${finished}, finished_at = null, system = '${system}', magnetic_link = '${magnetic_link}' WHERE id = ${id} RETURNING *`;
            }
            
        } else {
            if(finished) {
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
            }else{
                q = `UPDATE "${table}" SET app_id = '${app_id}',title = '${title}', finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
            }
            
        }

        try {
            const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.UPDATE });

            res.send({ result: result[0] });

        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    }
}

const deleteGame = async (req, res) => {

    const tableName = req.body.table;
    const title = req.body.title;
    const id = req.body.id;

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
    } else if (table === 'Playing') {
        let q = "";
        q = `DELETE FROM "Playing" WHERE id = ${id};`;

        try {
            await db.sequelize.query(q, { type: QueryTypes.DELETE });

            res.send({ ok: true })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    } else {
        let q = "";
        q = `DELETE FROM "${table}" WHERE id = ${id};`;

        try {
            await db.sequelize.query(q, { type: QueryTypes.DELETE });

            res.send({ ok: true })
        } catch (error) {
            console.error(error)
            res.status(400).send({ msg: error.message || error.process.message }).end();
        }
    }
}

const exportToCsv = async (req, res, next) => {
    let table = req.query.table;

    try {
        let result = await db.sequelize.query(`SELECT * FROM "${table}"`, { type: QueryTypes.SELECT })
        let { filename, csv } = ExportData.tocsv(result, Object.keys(result[0]));
        res.header('Content-Type', 'text/csv');
        res.attachment(filename);
        res.status(200).send(csv);

    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message || error.process.message }).end();
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

    res.contentType("application/pdf");

    return res.send(pdf)
}

const showReport = async (req, res, next) => {
    const q = queryInTable(req.query.from);

    let games = await db.sequelize.query(q, { type: QueryTypes.SELECT });
    games = games.map(g => {
        return { id: g.app_id || g.id, title: g.title, finished: g.finished }
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
    const q = queryInTable(req.query.from);

    let games = await db.sequelize.query(q, { type: QueryTypes.SELECT });
    res.xls('games.xlsx', games);
}

const createCategory = async (req, res, next) => {
    const { slugname, name } = req.body;
    const category = await db.Category.create({ slugname, name });
    res.send({ category })
}

const updateCategory = async (req, res, next) => {
    const { id, slugname, name } = req.body;
    const result = await db.Category.update({ slugname, name }, { where: { id } });
    const category = await db.Category.findOne({ where: { id } })
    res.send({ category })
}

const addCategoriesToGame = async (req, res, next) => {
    const { app_id } = req.params;
    const { table, categories } = req.body;
    let game;

    try {

        switch (table) {
            case 'Steam':
                game = await db.Steam.findOne({ where: { app_id } })
                break;
            case 'Origin':
                game = await db.Origin.findOne({ where: { app_id } })
                break;
            case 'Ubisoft':
                game = await db.Ubisoft.findOne({ where: { app_id } })
                break;
            case 'GameCube':
                game = await db.GameCube.findOne({ where: { app_id } })
                break;
            case 'Wii':
                game = await db.Wii.findOne({ where: { app_id } })
                break;
            case 'WiiU':
                game = await db.WiiU.findOne({ where: { app_id } })
                break;
            default:
                throw new Error('Table is not Defined');
                break;
        }
        if (!game) {
            throw new Error('Game not Found');
        }

        if (!categories) {
            throw new Error('Categories is Empty or Not defined');
        }

        const categoriesIDS = categories.map(c => c.id)
        const modelCategories = await db.Category.findAll({ where: { id: categoriesIDS } })

        modelCategories.forEach(async c => {
            // TODO FIXME not saving app_id
            // await game.addCategory(c)
            await db.sequelize.query(`INSERT INTO "GamesCategories" ("category_id","app_id") VALUES (${c.id},'${game.app_id}')`)
        })

        const updatedCategories = await game.getCategories()

        res.send({ categories: updatedCategories })

    } catch (error) {
        console.error(error)
        res.status(400).send({ msg: error.message }).end()
    }
}

const updateCategoriesToGame = async (req, res, next) => {
    const { app_id } = req.params;
    await db.sequelize.query(`DELETE FROM "GamesCategories" WHERE "app_id" = '${app_id}'`)

    addCategoriesToGame(req, res, next);
}

const showCategoriesOfGame = async (req, res, next) => {
    const { app_id } = req.params;
    const game = await db.Steam.findOne({ where: { app_id } })
    const categories = await game.getCategories();
    res.send({ categories })
}

const showDLCsOfGame = async (req, res, next) => {
    const { app_id } = req.params;
    const game = await db.Steam.findOne({ where: { app_id } })
    const dlcs = await game.getDlcs()
    res.send({ dlcs })
}

export {
    showWelcome, showTest, showStatistics, showCategories, showOriginGames, showUbisoftGames,
    showSteamGames, getSteamGames, showAllGames, showWiiGames, showGameCubeGames, showVirtualConsoleGames,
    showToBuyGames, showWiiUGames, showPCGames, showConsoleGames, showDLCs, showCharts, showPlayingGames, createGames, finishDLC,
    finishGame, searchGame, genreSearchGame, updateGame, deleteGame, exportToCsv, exportToPDF, showReport, exportToXls,
    createCategory, updateCategory, addCategoriesToGame, updateCategoriesToGame, showCategoriesOfGame, showDLCsOfGame
}