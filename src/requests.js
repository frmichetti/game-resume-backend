import getMessage from './getMessage';

import axios from 'axios';

import * as schemas from './schema/validation_schema'

import { mailer } from './mailer';

const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const ExportData = require('./exportTocsv');
const ejs = require('ejs')
const path = require('path')
const puppeteer = require('puppeteer')

import lodash, { map, reduce } from 'lodash';

const Excel = require('exceljs');
const fs = require('fs');

export const requests = db => {

    const now = () => {
        return new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    const queryInTable = tableName => {
        let q = ""
        switch (tableName) {
            case 'steam':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'Steam' ORDER BY title ASC`
                break;
            case 'origin':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'Origin' ORDER BY title ASC`
                break;
            case 'ubisoft':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'Ubisoft' ORDER BY title ASC`
                break;
            case 'gamecube':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'GameCube' ORDER BY title ASC`
                break;
            case 'wii':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'Wii' ORDER BY title ASC`
                break;
            case 'wiiu':
                q = `SELECT *, has_dlc(app_id) FROM "all_games" WHERE system = 'WiiU' ORDER BY title ASC`
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

    const selectTable = tableName => {
        switch (tableName) {
            case "wiiu":
                return "Games"
            case "gamecube":
                return "Games"
            case "wii":
                return "Games"
            case "origin":
                return "Games"
            case "steam":
                return "Games";
            case "ubisoft":
                return "Games"
            case "tobuy":
                return "ToBuy"
            case "virtualconsole":
                return "VirtualConsole"
            case "dlcs":
                return "DLC";
            case "playing":
                return "Playing"
            default:
                return null;
        }
    }


    const showWelcome = async (req, res) => {
        res.status(200).send({ "message": getMessage() })
    }

    const showTest = async (req, res) => {
        try {
            const games = await db.Game.findAll();
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showStatistics = async (req, res) => {
        try {
            let q = ""

            switch (req.query.from) {
                case 'finished':
                    q = 'SELECT * FROM "total_finished_games_for_dashboard"'
                    break;
                case 'totals':
                    q = `SELECT * FROM "total_games_for_dashboard"`
                    break;
                case 'finished_over_system':
                    q = `SELECT * FROM "total_of_finished_by_system_percentual_over_system"`
                    break;
                default:
                    q = 'SELECT 1'
                    break;
            }

            const result = await db.sequelize.query(q, { type: QueryTypes.SELECT });
            res.status(200).send({ "result": result })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showCategories = async (req, res) => {
        try {
            const categories = await db.Category.findAll({ order: [["name", "ASC"]] });
            res.status(200).send({ "categories": categories })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showOriginGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({ order: [["title", "ASC"]], where: { system_id: 1 } });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showUbisoftGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({ order: [["title", "ASC"]], where: { system_id: 3 } });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showSteamGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({
                order: [["title", "ASC"]],
                attributes: ['id', 'app_id', 'title', 'collection', 'finished', 'finished_at', 'genuine', 'fisical_disc', 'system_id',
                    [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']], where: { system_id: 2 }
            });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const requestSteamGames = async () => {
        try {
            const steamIds = process.env.STEAM_ID.split(';')

            const requests = steamIds.map(id => {
                return axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${id}&format=json&include_appinfo=true`);
            })

            const responses = await Promise.all(requests)

            const datas = responses.map(r => r.data.response.games)

            const games = datas.reduce((acc, item) => lodash.merge(acc, item))

            return games;

        } catch (error) {
            console.error(error)
            return []
        }
    }

    const getSteamGames = async (req, res) => {
        try {

            const games = await requestSteamGames()

            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showAllGames = async (req, res) => {
        try {
            const games = await db.sequelize.query('SELECT * FROM "all_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showWiiGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({
                order: [["title", "ASC"]],
                attributes: ['id', 'app_id', 'title', 'collection', 'finished', 'finished_at', 'genuine', 'fisical_disc', 'system_id',
                    [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']], where: { system_id: 5 }
            });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showWiiUGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({
                order: [["title", "ASC"]],
                attributes: ['id', 'app_id', 'title', 'collection', 'finished', 'finished_at', 'genuine', 'fisical_disc', 'system_id',
                    [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']], where: { system_id: 6 }
            });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showGameCubeGames = async (req, res) => {
        try {
            const games = await db.Game.findAll({
                order: [["title", "ASC"]],
                attributes: ['id', 'app_id', 'title', 'collection', 'finished', 'finished_at', 'genuine', 'fisical_disc', 'system_id',
                    [db.sequelize.fn('has_dlc', db.sequelize.col('app_id')), 'has_dlc']], where: { system_id: 4 }
            });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showVirtualConsoleGames = async (req, res) => {
        try {
            const games = await db.VirtualConsole.findAll({
                order: [["title", "ASC"]],
                attributes: ["id", "app_id", "title", "finished", "finished_at", "genuine", 'system_id',
                    [db.sequelize.fn('which_platform', db.sequelize.col('system_id')), 'platform'],
                    [db.sequelize.fn('which_system', db.sequelize.col('system_id')), 'system']
                ]

            });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }


    const showToBuyGames = async (req, res) => {
        try {
            const games = await db.ToBuy.findAll({ order: [["title", "ASC"]] });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }


    const showPCGames = async (req, res) => {
        try {
            const games = await db.sequelize.query('SELECT * FROM "all_pc_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showConsoleGames = async (req, res) => {
        try {
            const games = await db.sequelize.query('SELECT * FROM "all_console_games" ORDER BY title ASC', { type: QueryTypes.SELECT });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showDLCs = async (req, res) => {
        try {
            const dlcs = await db.DLC.findAll({
                order: [["app_id", "ASC"], ["id", "ASC"]],
                attributes: ['id', 'app_id', 'title', 'collection', 'finished', 'finished_at',
                    [db.sequelize.fn('which_system', db.sequelize.col('app_id')), 'system']]
            });
            res.status(200).send({ "games": dlcs })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showDLCsByID = async (req, res) => {
        try {
            const id = req.query.id;
            const dlcs = await db.DLC.findAll({ where: { id } });
            res.status(200).send({ "games": dlcs })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showCharts = async (req, res) => {
        try {
            const type = req.query.type;
            let stats, labels, values, dataset;
            switch (type) {
                case 'total':
                    stats = await db.sequelize.query('SELECT * FROM "total_of_games_by_system"', { type: QueryTypes.SELECT })
                    labels = stats.map(i => i.system)
                    values = stats.map(i => i.total)
                    dataset = "Total of Games"
                    break;
                case 'finished':
                    stats = await db.sequelize.query('SELECT * FROM "total_of_finished_games_by_system"', { type: QueryTypes.SELECT })
                    labels = stats.map(i => i.system)
                    values = stats.map(i => i.total)
                    dataset = "Total of Finished Games"
                    break;
                case 'total_percent':
                    stats = await db.sequelize.query('SELECT * FROM "total_of_games_by_system_percentual"', { type: QueryTypes.SELECT })
                    labels = stats.map(i => i.system)
                    values = stats.map(i => i.percentual)
                    dataset = "Percent of Total Games"
                    break;
                case 'finished_percent':
                    stats = await db.sequelize.query('SELECT * FROM "total_of_finished_games_by_system_percentual"', { type: QueryTypes.SELECT })
                    labels = stats.map(i => i.system)
                    values = stats.map(i => i.percentual)
                    dataset = "Percent of Finished Games"
                    break;
                default:
                    throw new Error('unknow type')
                    break;
            }
            res.status(200).send({ stats, labels, values, dataset })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const showPlayingGames = async (req, res) => {
        try {
            const games = await db.Playing.findAll({ order: [["title", "ASC"]] });
            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const createGames = async (req, res) => {
        try {
            const tableName = req.body.table;
            let table, id, app_id, system_id, title, finished, finished_at, fisical_disc, genuine, collection, system, magnetic_link, started_at;

            title = req.body.title ? req.body.title.replaceAll("'", "''") : null;
            finished = req.body.finished ? req.body.finished : false;
            finished_at = req.body.finished_at ? req.body.finished_at : now();
            started_at = req.body.finished_at ? req.body.finished_at : now();
            fisical_disc = req.body.fisical_disc ? req.body.fisical_disc : false;

            // Not working on Tests: 
            // ({ id, app_id, system, system_id, genuine, collection, magnetic_link }) = req.body;

            id = req.body.id;
            app_id = req.body.app_id;
            system_id = req.body.system_id;
            genuine = req.body.genuine;
            collection = req.body.collection;
            magnetic_link = req.body.magnetic_link;
            system = req.body.system

            table = selectTable(tableName);

            if (table == null || table == undefined) {
                throw new Error('Table does not match')
            }

            let validation;
            let q = "";

            switch (table) {
                case 'Games':
                    validation = schemas.game_schema.validate({ app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc })
                    break;
                case 'ToBuy':
                    validation = schemas.tobuy_schema.validate({ title, finished, finished_at, genuine, system, magnetic_link })
                    break;
                case 'VirtualConsole':
                    validation = schemas.virtualconsole_schema.validate({ app_id, system_id, title, finished, genuine })
                    break;
                case 'DLC':
                    validation = schemas.dlc_schema.validate({ app_id, title, finished, finished_at, collection })
                    break;
                case 'Playing':
                    validation = schemas.playing_schema.validate({ app_id, title, started_at, finished, finished_at })
                    break;
                default:
                    throw new Error('NOT Implemented YET')
                    break;
            }

            if (validation.error) {
                throw new Error(validation.error.message);
            } else {

                if (tableName === 'virtualconsole') {
                    if (finished) {
                        q = `INSERT INTO "${table}" (app_id,title,finished,finished_at,genuine,system_id) VALUES ('${app_id}','${title}',${finished},'${finished_at}','${genuine}',${system_id}) RETURNING *`;
                    } else {
                        q = `INSERT INTO "${table}" (app_id,title,finished,genuine,system_id) VALUES ('${app_id}','${title}',${finished},'${genuine}',${system_id}) RETURNING *`;
                    }
                } else if (tableName === 'tobuy') {
                    if (finished) {
                        q = `INSERT INTO "${table}" (title,finished,finished_at,system,magnetic_link) VALUES ('${title}',${finished},'${finished_at}','${system}','${magnetic_link}') RETURNING *`;
                    } else {
                        q = `INSERT INTO "${table}" (title,finished,system,magnetic_link) VALUES ('${title}',${finished},'${system}','${magnetic_link}') RETURNING *`;
                    }
                } else if (tableName === 'playing') {
                    if (finished) {
                        q = `INSERT INTO "${table}" (app_id, title, started_at, finished, finished_at) VALUES ('${app_id}','${title}','${started_at}', ${finished}, '${finished_at}') RETURNING *`
                    } else {
                        q = `INSERT INTO "${table}" (app_id, title, started_at, finished) VALUES ('${app_id}','${title}','${started_at}', ${finished}) RETURNING *`
                    }

                } else if (tableName === 'dlcs') {
                    if (finished) {
                        q = `INSERT INTO "${table}" (app_id, title, finished, finished_at, collection) VALUES ('${app_id}', '${title}', ${finished},'${finished_at}', ${collection}) RETURNING *`
                    } else {
                        q = `INSERT INTO "${table}" (app_id, title, finished, collection) VALUES ('${app_id}', '${title}', ${finished}, ${collection}) RETURNING *`
                    }
                } else {
                    if (finished) {
                        q = `INSERT INTO "${table}" (app_id,system_id,title,finished,finished_at,collection,genuine,fisical_disc) VALUES ('${app_id}',${system_id},'${title}',${finished},'${finished_at}',${collection},${genuine},${fisical_disc}) RETURNING *`;
                    } else {
                        q = `INSERT INTO "${table}" (app_id,system_id,title,finished,collection,genuine,fisical_disc) VALUES ('${app_id}',${system_id},'${title}',${finished},${collection},${genuine},${fisical_disc}) RETURNING *`;
                    }
                }

            }
            const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.INSERT })

            res.status(201).send({ "success": true, "result": result, "metadata": metadata })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const finishDLC = async (req, res) => {
        try {
            const { id, app_id, finished } = req.body
            let q = `UPDATE "DLC" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} AND app_id = '${app_id}' RETURNING *`;
            const update = await db.sequelize.query(q, { type: QueryTypes.UPDATE });

            q = `SELECT * FROM "DLC" WHERE app_id = '${app_id}' ORDER BY title ASC`
            const result = await db.sequelize.query(q, { type: QueryTypes.SELECT });

            res.status(200).send({ "dlcs": result });
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const finishGame = async (req, res) => {
        try {
            const tableName = req.body.table;
            let table;
            let q = "";

            const { id, app_id, finished } = req.body;

            table = selectTable(tableName)

            if (table == null) {
                throw new Error("Table does not match")
            } else if (finished == null) {
                throw new Error("Finished is not Defined")
            } else if (id == null) {
                throw new Error("ID is not defined")
            } else {

                if (tableName === 'playing' || tableName === 'Playing') {
                    q = `SELECT 1 FROM "Playing" WHERE id = ${id}`
                    const r = await db.sequelize.query(q, { type: QueryTypes.SELECT });
                    if (r.length < 1) throw new Error(`Playing with ID: ${id} not found`);
                    if (finished) {
                        q = `UPDATE "Playing" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "Playing" SET finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
                    }

                } else if (tableName === 'dlcs' || tableName === 'DLCS') {
                    q = `SELECT 1 FROM "DLC" WHERE id = ${id}`
                    const r = await db.sequelize.query(q, { type: QueryTypes.SELECT });
                    if (r.length < 1) throw new Error(`DLC with ID: ${id} not found`);
                    if (finished) {
                        q = `UPDATE "DLC" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "DLC" SET finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
                    }
                } else if (tableName === 'tobuy' || tableName === 'ToBuy') {
                    q = `SELECT 1 FROM "ToBuy" WHERE id = ${id}`
                    const r = await db.sequelize.query(q, { type: QueryTypes.SELECT });
                    if (r.length < 1) throw new Error(`ToBuy with ID: ${id} not found`);
                    if (finished) {
                        q = `UPDATE "ToBuy" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "ToBuy" SET finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
                    }
                } else if (tableName === 'virtualconsole' || tableName === 'VirtualConsole') {
                    q = `SELECT 1 FROM "VirtualConsole" WHERE id = ${id}`
                    const r = await db.sequelize.query(q, { type: QueryTypes.SELECT });
                    if (r.length < 1) throw new Error(`VirtualConsole with ID: ${id} not found`);
                    if (finished) {
                        q = `UPDATE "VirtualConsole" SET finished = ${finished}, finished_at = '${now()}' WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "VirtualConsole" SET finished = ${finished}, finished_at = null WHERE id = ${id} RETURNING *`;
                    }
                } else {
                    q = `SELECT 1 FROM "Games" WHERE id = ${id} OR app_id = '${app_id}'`
                    const r = await db.sequelize.query(q, { type: QueryTypes.SELECT });
                    if (r.length < 1) throw new Error(`Games with ID: ${id} or AppId: ${app_id} not found`);
                    if (finished) {
                        if (app_id) {
                            q = `UPDATE "Games" SET finished = ${finished}, finished_at = '${now()}' WHERE app_id = '${app_id}' RETURNING *`;
                        } else {
                            q = `UPDATE "Games" SET finished = ${finished}, finished_at = '${now()}' WHERE id = '${id}' RETURNING *`;
                        }
                    } else {
                        if (app_id) {
                            q = `UPDATE "Games" SET finished = ${finished}, finished_at = null WHERE app_id = '${app_id}' RETURNING *`;
                        } else {
                            q = `UPDATE "Games" SET finished = ${finished}, finished_at = null WHERE id = '${id}' RETURNING *`;
                        }
                    }
                }
            }

            const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.UPDATE });

            res.status(200).send({ "result": result[0] });
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }

    }

    const searchGame = async (req, res) => {
        try {
            const q = req.query.query;

            if (q == null || q == undefined) {
                throw new Error('Query Param is undefined')
            }

            const games = await db.sequelize.query(`SELECT * FROM "all_games_list_api" WHERE title ilike '%${q}%';`, { type: QueryTypes.SELECT });

            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const genreSearchGame = async (req, res) => {
        try {
            const q = req.query.query;

            if (q == null || q == undefined) {
                throw new Error('Query Param is undefined')
            }
            const games = await db.sequelize.query(`select *, which_system(app_id) AS system from "all_games_genres_aggregate" WHERE genre = '${q}' ORDER BY title ASC;`, { type: QueryTypes.SELECT });

            res.status(200).send({ "games": games })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const updateGame = async (req, res) => {
        try {
            const tableName = req.body.table;
            let table, id, app_id, title, finished, finished_at, fisical_disc, system, system_id, collection, genuine, magnetic_link;

            id = req.body.id;
            app_id = req.body.app_id;
            title = req.body.title.replaceAll("'", "''");
            finished = req.body.finished;
            finished_at = req.body.finished_at ? req.body.finished_at : now();
            collection = req.body.collection;
            genuine = req.body.genuine;
            fisical_disc = req.body.fisical_disc;
            system = req.body.system;
            system_id = req.body.system_id;
            magnetic_link = req.body.magnetic_link;


            table = selectTable(tableName)

            if (table == null) {
                throw new Error("Table does not match")
            }

            if (id == null) {
                throw new Error("ID is required")
            }

            let validation;
            let q = "";

            switch (table) {
                case 'Games':
                    validation = schemas.game_schema.validate({ app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc })
                    break;
                case 'ToBuy':
                    validation = schemas.tobuy_schema.validate({ title, finished, genuine, system, magnetic_link })
                    break;
                case 'VirtualConsole':
                    validation = schemas.virtualconsole_schema.validate({ app_id, system_id, title, finished, genuine })
                    break;
                case 'DLC':
                    validation = schemas.dlc_schema.validate({ app_id, title, finished, collection })
                    break;
                case 'Playing':
                    validation = schemas.playing_schema.validate({ app_id, title })
                    break;
                default:
                    throw new Error('NOT Implemented YET')
                    break;
            }

            if (validation.error) {
                throw new Error(validation.error.message)
            } else {

                if (table === 'Games') {
                    if (finished) {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', system_id = ${system_id}, title = '${title}', finished = ${finished}, finished_at = '${finished_at}', collection = ${collection}, genuine = ${genuine}, fisical_disc = ${fisical_disc} WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', system_id = ${system_id}, title = '${title}', finished = ${finished}, finished_at = null, collection = ${collection}, genuine = ${genuine}, fisical_disc = ${fisical_disc} WHERE id = ${id} RETURNING *`;
                    }

                } else if (table === 'VirtualConsole') {
                    if (finished) {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', system_id = ${system_id}, title = '${title}', finished = ${finished}, finished_at = '${finished_at}', genuine = ${genuine} WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', system_id = ${system_id}, title = '${title}', finished = ${finished}, finished_at = null, genuine = ${genuine} WHERE id = ${id} RETURNING *`;
                    }

                } else if (table === 'ToBuy') {
                    if (finished) {
                        q = `UPDATE "${table}" SET title = '${title}', finished = ${finished}, finished_at = '${finished_at}', system = '${system}', magnetic_link = '${magnetic_link}' WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "${table}" SET title = '${title}', finished = ${finished}, finished_at = null, system = '${system}', magnetic_link = '${magnetic_link}' WHERE id = ${id} RETURNING *`;
                    }

                } else if (table === 'DLC') {
                    if (finished) {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', title = '${title}', finished = ${finished}, finished_at = '${finished_at}', collection = ${collection} WHERE id = ${id} RETURNING *`;
                    } else {
                        q = `UPDATE "${table}" SET app_id = '${app_id}', title = '${title}', finished = ${finished}, finished_at = null, collection = '${collection}' WHERE id = ${id} RETURNING *`;
                    }
                }
                const [result, metadata] = await db.sequelize.query(q, { type: QueryTypes.UPDATE });

                res.status(200).send({ "result": result[0] });
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }

    }


    const deleteGame = async (req, res) => {
        try {
            const tableName = req.body.table;

            const id = req.body.id;

            let table;

            table = selectTable(tableName)

            if (table == null) {
                throw new Error("Table does not match");
            }

            if (id == null || id == undefined) {
                throw new Error("ID is not defined");
            }
            let q = "";
            switch (table) {
                case 'Playing':
                    q = `DELETE FROM "Playing" WHERE id = ${id};`;
                    break;
                case 'DLC':
                    q = `DELETE FROM "DLC" WHERE id = ${id};`;
                    break;
                case 'ToBuy':
                    q = `DELETE FROM "ToBuy" WHERE id = ${id};`;
                    break;
                case 'VirtualConsole':
                    q = `DELETE FROM "VirtualConsole" WHERE id = ${id};`;
                    break;
                default:
                    q = `DELETE FROM "Games" WHERE id = ${id};`;
                    break;
            }

            await db.sequelize.query(q, { type: QueryTypes.DELETE });

            res.status(200).send({ "success": true })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const exportToCsv = async (req, res) => {
        let table = req.query.table;

        let sql;
        switch (table) {
            case "GameCube":
                sql = `SELECT * FROM "all_games" WHERE system = 'GameCube'`
                break;
            case "Wii":
                sql = `SELECT * FROM "all_games" WHERE system = 'Wii'`
                break;
            case "WiiU":
                sql = `SELECT * FROM "all_games" WHERE system = 'WiiU'`
                break;
            case "Origin":
                sql = `SELECT * FROM "all_games" WHERE system = 'Origin'`
                break;
            case "Steam":
                sql = `SELECT * FROM "all_games" WHERE system = 'Steam'`
                break;
            case "Ubisoft":
                sql = `SELECT * FROM "all_games" WHERE system = 'Ubisoft'`
                break;
            case "VirtualConsole":
                sql = `SELECT * FROM "all_games" WHERE platform ilike '%VirtualConsole%'`
                break;
            default:
                throw new Error('Incorrect table')
                break;
        }

        try {
            let result = await db.sequelize.query(sql, { type: QueryTypes.SELECT })
            let { filename, csv } = ExportData.tocsv(result, Object.keys(result[0]));
            res.header('Content-Type', 'text/csv');
            res.attachment(filename);
            res.status(200).send(csv);

        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message || error.process.message });
        }
    }

    const exportToPDF = async (req, res) => {
        let from = req.query.from;

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(`${process.env.THIS_SERVER}/report?from=${from}`, {
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

    const showReport = async (req, res) => {
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
    const exportToXls = async (req, res) => {
        const q = queryInTable(req.query.from);

        let games = await db.sequelize.query(q, { type: QueryTypes.SELECT });
        res.xls('games.xlsx', games);
    }

    const createCategory = async (req, res) => {
        const { slugname, name } = req.body;
        const category = await db.Category.create({ slugname, name });
        res.status(200).send({ "category": category })
    }

    const updateCategory = async (req, res) => {
        const { id, slugname, name } = req.body;
        const result = await db.Category.update({ slugname, name }, { where: { id } });
        const category = await db.Category.findOne({ where: { id } })
        res.status(200).send({ "category": category })
    }

    const addCategoriesToGame = async (req, res) => {
        const { app_id } = req.params;
        const { table, categories } = req.body;
        let game;

        try {

            switch (table) {
                case 'Steam':
                    game = await db.Game.findOne({ where: { app_id } })
                    break;
                case 'Origin':
                    game = await db.Game.findOne({ where: { app_id } })
                    break;
                case 'Ubisoft':
                    game = await db.Game.findOne({ where: { app_id } })
                    break;
                case 'GameCube':
                    game = await db.Game.findOne({ where: { app_id } })
                    break;
                case 'Wii':
                    game = await db.Game.findOne({ where: { app_id } })
                    break;
                case 'WiiU':
                    game = await db.Game.findOne({ where: { app_id } })
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

            res.status(200).send({ "categories": updatedCategories })

        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message })
        }
    }

    const updateCategoriesToGame = async (req, res) => {
        const { app_id } = req.params;
        await db.sequelize.query(`DELETE FROM "GamesCategories" WHERE "app_id" = '${app_id}'`)

        addCategoriesToGame(req, res);
    }

    const showCategoriesOfGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.Game.findOne({ where: { app_id }, include: { model: db.Category, as: 'categories' } })
        res.status(200).send({ "game": game })
    }

    const showDLCsOfGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.Game.findOne({ where: { app_id }, include: { model: db.DLC, as: 'dlcs' } })
        res.status(200).send({ "game": game })
    }

    const showSystemOfGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.Game.findOne({ where: { app_id }, include: { model: db.System } })
        res.status(200).send({ "game": game })
    }

    const showPlayTimesOfGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.Game.findOne({ where: { app_id }, include: { model: db.Playing } })
        res.status(200).send({ "game": game })
    }

    const showGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.sequelize.query(`SELECT * FROM "all_games" WHERE app_id = '${app_id}'`, { type: QueryTypes.SELECT });
        const resp = (game[0]) ? { "game": game[0] } : { "game": null }
        res.status(200).send(resp)
    }

    const showCodesOfGame = async (req, res) => {
        const { app_id } = req.params;
        const game = await db.Game.findOne({ where: { app_id }, include: { model: db.CodeAndTip } })
        res.status(200).send({ "game": game })
    }

    const saveCode = async (req, res) => {
        const { app_id, content } = req.body;
        const code = await db.CodeAndTip.create({ app_id, content });
        res.status(200).send({ "code": code });
    }

    const updateCode = async (req, res) => {
        const { id, app_id, content } = req.body;
        const result = await db.CodeAndTip.update({ app_id, content }, { where: { id } });
        const code = await db.CodeAndTip.findOne({ where: { id } })
        res.status(200).send({ "code": code });
    }

    const deleteTrash = async (req, res) => {
        const id = req.query.id;

        const q = `DELETE FROM "Trash" WHERE id = ${id};`;

        await db.sequelize.query(q, { type: QueryTypes.DELETE });

        res.status(200).send({ "success": true })
    }

    const restore = async (req, res) => {
        const { id } = req.body;

        const q = `SELECT restore(${id})`

        await db.sequelize.query(q, { type: QueryTypes.SELECT });

        res.status(200).send({ "success": true })
    }

    const showTrash = async (req, res) => {
        const trash = await db.Trash.findAll();
        res.status(200).send({ "trash": trash });
    }

    const processXLSToJson = async (req, res) => {
        const workbook = new Excel.Workbook();
        const games = []
        const mapGames = new Map();

        let newGame = {
            app_id: "",
            system_id: null,
            title: "",
            finished: null,
            finished_at: null,
            genuine: null,
            collection: null,
            fisical_disc: null
        }



        workbook.xlsx.readFile(`./uploads/${req.file.originalname}`)
            .then(async () => {
                let worksheet = workbook.getWorksheet('Games');
                // Iterate over all rows that have values in a worksheet
                worksheet.eachRow((row, rowNumber) => {

                    if (rowNumber > 1) {
                        newGame.app_id = row.values[1];
                        newGame.system_id = row.values[2];
                        newGame.title = row.values[3];
                        newGame.finished = row.values[4];
                        newGame.finished_at = row.values[5] ? new Date(row.values[5]) : null;
                        newGame.genuine = row.values[6];
                        newGame.collection = row.values[7];
                        newGame.fisical_disc = row.values[8];

                        mapGames.set(newGame.app_id, Object.assign({}, newGame))
                    }
                });


                mapGames.forEach(i => games.push(i));

                res.status(200).send({ "games": games })
            });
    }

    const importData = async (req, res) => {
        const games = req.body.games;
        await db.Game.bulkCreate(games, { ignoreDuplicates: true })
        res.status(200).send({ "success": true })
    }

    const syncSteam = async (req, res) => {
        try {
            const games = req.body.games ? req.body.games : await requestSteamGames()

            const payload = games.map(g => {
                return {
                    app_id: g.appid,
                    system_id: 2,
                    title: g.name,
                    finished: false,
                    finished_at: null,
                    genuine: true,
                    collection: false,
                    fisical_disc: false
                }
            })

            await db.Game.bulkCreate(payload, { ignoreDuplicates: true })
            res.status(200).send({ "success": true })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message })
        }
    }

    const sendMail = async (req, res) => {
        try {
            const { subject, text, html } = req.body
            if (subject == null) {
                throw new Error('Subject not defined')
            } else if (text == null) {
                throw new Error('Text not defined')
            } else if (html == null) {
                throw new Error('Html not defined')
            }
            const options = { subject: subject, text: text, html: html }

            const info = await mailer(options)
            res.status(200).send({ "success": true, "msg": `${info.response}` })
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message, "success": false })
        }
    }

    const createUser = async (req, res) => {
        try {
            const dto = {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                password: req.body.password
            }

            const user = await db.User.create(dto)

            res.status(200).send({ user })

        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message })
        }
    }

    const doLogin = async (req, res) => {
        try {

            const { email, password } = req.body;

            const user = await db.User.findOne({ where: { email } })

            if (!user) {
                res.status(400).send({ "msg": "email or Password is invalid" })
            }

            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const expiresIn = 300 // expires in 5min
                const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
                    expiresIn: expiresIn
                });

                res.status(200).send({ auth: true, token: token })
            } else {
                res.status(400).send({ "msg": "email or Password is invalid" })
            }
        } catch (error) {
            console.error(error)
            res.status(400).send({ "msg": error.message })
        }
    }

    const doLogout = async (req, res) => {
        res.status(200).send({ auth: false, token: null });
    }

    return {
        showWelcome, showTest, showStatistics, showCategories, showOriginGames, showUbisoftGames,
        showSteamGames, getSteamGames, showAllGames, showWiiGames, showGameCubeGames, showVirtualConsoleGames,
        showToBuyGames, showWiiUGames, showPCGames, showConsoleGames, showDLCs, showCharts, showPlayingGames, showDLCsByID,
        showGame, showCodesOfGame, createGames, finishDLC, saveCode, updateCode, restore, showTrash,
        finishGame, searchGame, genreSearchGame, updateGame, deleteGame, deleteTrash, exportToCsv, exportToPDF, showReport, exportToXls,
        createCategory, updateCategory, addCategoriesToGame, updateCategoriesToGame, showCategoriesOfGame, showDLCsOfGame, showSystemOfGame, showPlayTimesOfGame, processXLSToJson, importData,
        sendMail, syncSteam, createUser, doLogin, doLogout
    }
}

