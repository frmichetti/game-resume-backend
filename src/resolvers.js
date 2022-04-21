import { authResolver } from './composable_resolver/auth-resolver';
import { compose } from './composable_resolver/composable.resolver';
import { verifyTokenResolver } from './composable_resolver/verify-token-resolver';

const authGuard = [authResolver, verifyTokenResolver]

const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Queries

const hello = (parent, args, ctx, info) => {
    return 'hello';
}

const allCategories = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Category" ORDER BY name ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allWiiUGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["app_id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM "Games" WHERE system_id = 6 ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allWiiGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["app_id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM "Games" WHERE system_id = 5 ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGameCubeGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["app_id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM "Games" WHERE system_id = 4 ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allVirtualConsoleGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "VirtualConsole" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allToBuyGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "ToBuy" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allOriginGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Origin" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allUbisoftGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Ubisoft" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allDLCs = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "DLC" ORDER BY app_id ASC`
    const dlcs = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return dlcs;
}

const allSteamGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["app_id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM "Games" WHERE system_id = 2 ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allConsoleGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_console_games" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allPCGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["app_id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM "all_pc_games" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGamesWithDLCs = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games_list_api" ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGamesFinished = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games" WHERE finished = true ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGamesFinishedDetailed = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games_list_api" WHERE finished = true  ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGamesUnfinished = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games" WHERE finished = false ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allGamesUnfinishedDetailed = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "all_games_list_api" WHERE finished = false ORDER BY title ASC`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const allConsoleGamesGenres = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "total_of_console_genres" ORDER BY genre ASC`
    const genres = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return genres;
}

const allPCGamesGenres = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "total_of_pc_genres" ORDER BY genre ASC`
    const genres = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return genres;
}

const allGamesGenresAggregate = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `select genre, count(app_id) AS total from all_games_genres_aggregate GROUP BY genre ORDER BY genre ASC;`
    const genres = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return genres;
}

const getCategory = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Category" WHERE id = '${id}'`
    const categories = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return categories[0];
}

const getDLCGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "DLC" WHERE id = '${id}'`
    const dlcs = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return dlcs[0];
}

const getWiiUGame = async (parent, { app_id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "WiiU" WHERE app_id = '${app_id}'`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getWiiGame = async (parent, { app_id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Wii" WHERE app_id = '${app_id}'`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getGameCubeGame = async (parent, { app_id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "GameCube" WHERE app_id = '${app_id}'`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getVirtualConsoleGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "VirtualConsole" WHERE id = '${id}'`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getToBuyGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "ToBuy" WHERE id = '${id}'`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getOriginGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Origin" WHERE id = ${id}`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getUbisoftGame = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "Ubisoft" WHERE id = ${id}`
    const game = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return game[0];
}

const getDLC = async (parent, { app_id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "DLC" WHERE app_id = '${app_id}' ORDER BY title ASC, id ASC`
    const dlcs = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return dlcs;
}

const getConsoleFinishedGames = async (parent, { finished }, ctx, info) => {
    const sql = `SELECT * FROM "all_console_games" WHERE finished = ${finished}`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const getPCFinishedGames = async (parent, { finished }, ctx, info) => {
    const sql = `SELECT * FROM "all_pc_games" WHERE finished = ${finished};`
    const games = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
    return games;
}

const getStatisticsOfTotalGames = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "total_games_for_dashboard"`

    try {
        const stats = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
        return stats;
    } catch (error) {
        console.error(error);
        return []
    }
}

const getStatisticsOfTotalFinishedGames = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM "total_finished_games_for_dashboard"`

    try {
        const stats = await ctx.orm.sequelize.query(sql, { type: QueryTypes.SELECT });
        return stats;
    } catch (error) {
        console.error(error);
        return []
    }
}

const getTotalChart = async (parent, args, ctx, info) => {
    try {
        const stats = await ctx.orm.sequelize.query(`SELECT system, sum(total) AS total FROM "total_of_games_by_system" GROUP BY system ORDER BY system;`, { type: QueryTypes.SELECT });
        const labels = stats.map(i => i.system)
        const values = stats.map(i => i.total)
        const dataset = "Total of Games"

        return { stats, labels, values, dataset };
    } catch (error) {
        console.error(error);
    }
}

const getFinishedChart = async (parent, args, ctx, info) => {
    try {
        const stats = await ctx.orm.sequelize.query(`SELECT * FROM "total_of_finished_games_by_system"`, { type: QueryTypes.SELECT });
        const labels = stats.map(i => i.system)
        const values = stats.map(i => i.total)
        const dataset = "Total of Finished Games"

        return { stats, labels, values, dataset };
    } catch (error) {
        console.error(error);
    }
}

const getTotalPercentChart = async (parent, args, ctx, info) => {
    try {
        const stats = await ctx.orm.sequelize.query(`SELECT * FROM "total_of_games_by_system_percentual"`, { type: QueryTypes.SELECT });
        const labels = stats.map(i => i.system)
        const values = stats.map(i => i.percentual)
        const dataset = "Percent of Total Games"
        return { stats, labels, values, dataset };
    } catch (error) {
        console.error(error);
    }
}

const getPercentFinishedChart = async (parent, args, ctx, info) => {
    try {
        const stats = await ctx.orm.sequelize.query(`SELECT * FROM "total_of_finished_games_by_system_percentual"`, { type: QueryTypes.SELECT });
        const labels = stats.map(i => i.system)
        const values = stats.map(i => i.percentual)
        const dataset = "Percent of Finished Games"

        return { stats, labels, values, dataset };
    } catch (error) {
        console.error(error);
    }
}

const getFinishedBySystem = async (parent, { system }, ctx, info) => {
    try {
        let q = ''
        if (system === 'VC') {
            q = `SELECT * FROM "all_games" WHERE finished = true AND platform ilike '%VirtualConsole%' ORDER BY title ASC`
        } else {
            q = `SELECT * FROM "all_games" WHERE finished = true AND system ilike '%${system}%' ORDER BY title ASC`
        }
        const games = await ctx.orm.sequelize.query(q, { type: QueryTypes.SELECT });
        return games;
    } catch (error) {
        console.error(error);
    }
}

const getUnfinishedBySystem = async (parent, { system }, ctx, info) => {
    try {
        const games = await ctx.orm.sequelize.query(`SELECT * FROM "all_games" WHERE finished = false AND system ilike '%${system}%' ORDER BY title ASC`, { type: QueryTypes.SELECT });
        return games;
    } catch (error) {
        console.error(error);
    }
}

// Mutations

const doLogin = async (parent, args, ctx, info) => {
    const { email, password } = args;

    const user = await ctx.orm.User.findOne({ where: { email } })

    const errorMessage = "email or Password is invalid"

    if (!user) {
        throw new Error(errorMessage)
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        const expiresIn = 300 // expires in 5min
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, {
            expiresIn: expiresIn
        });

        return { auth: true, token: token }
    } else {
        throw new Error(errorMessage)
    }
}

const createCategory = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { name, slugname } = args.input
    const category = await ctx.orm.Category.create({ name, slugname })
    return category
})

const createDLCGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, collection } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "DLC" (app_id,title,finished,finished_at,collection) VALUES (?,?,?,?,?) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at, collection] })
    return result[0];
})

const createWiiUGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, collection, genuine, fisical_disc } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "Games" (app_id,title,finished,finished_at,collection,genuine,fisical_disc,system_id) VALUES (?,?,?,?,?,?,?,6) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at, collection, genuine, fisical_disc] })
    return result[0];
})

const createWiiGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, collection, genuine, fisical_disc } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "Games" (app_id,title,finished,finished_at,collection,genuine,fisical_disc,system_id) VALUES (?,?,?,?,?,?,?,5) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at, collection, genuine, fisical_disc] })
    return result[0];
})

const createGameCubeGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, collection, genuine, fisical_disc } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "Games" (app_id,title,finished,finished_at,collection,genuine,fisical_disc,system_id) VALUES (?,?,?,?,?,?,?,4) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at, collection, genuine, fisical_disc] })
    return result[0];
})

const createVirtualConsoleGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, genuine, platform, system } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "VirtualConsole" (app_id,title,finished,finished_at,genuine,platform,system) VALUES (?,?,?,?,?,?,?) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at, genuine, platform, system] })
    return result[0];
})

const createToBuyGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { title, finished, finished_at, genuine, system } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "ToBuy" (title,finished,finished_at,genuine,system) VALUES (?,?,?,?,?) RETURNING *`, { type: QueryTypes.INSERT, replacements: [title, finished, finished_at, genuine, system] })
    return result[0];
})

const createOriginGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "Games" (app_id,title,finished,finished_at,system_id) VALUES (?,?,?,?,1) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at] })
    return result[0];
})

const createUbisoftGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`INSERT INTO "Games" (app_id,title,finished,finished_at,system_id) VALUES (?,?,?,?,3) RETURNING *`, { type: QueryTypes.INSERT, replacements: [app_id, title, finished, finished_at] })
    return result[0];
})

const updateDLCGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, title, finished, finished_at, collection, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "DLC" SET app_id = ?, title = ?, finished = ?, finished_at = ?, collection = ? WHERE id = ? RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, title, finished, finished_at, collection, id] })
    return result[0];
})

const updateWiiUGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "Games" SET app_id = ?, system_id = ?, title = ?, finished = ?, finished_at = ?, collection = ?, genuine = ?, fisical_disc = ? WHERE id = ? AND system_id = 6 RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id] })
    return result[0];
})

const updateWiiGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "Games" SET app_id = ?, system_id = ?, title = ?, finished = ?, finished_at = ?, collection = ?, genuine = ?, fisical_disc = ? WHERE id = ? AND system_id = 5 RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id] })
    return result[0];
})

const updateGameCubeGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "Games" SET app_id = ?, system_id = ?, title = ?, finished = ?, finished_at = ?, collection = ?, genuine = ?, fisical_disc = ? WHERE id = ? AND system_id = 4 RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id] })
    return result[0];
})

const updateVirtualConsoleGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, genuine, platform, system, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "VirtualConsole" SET app_id = ?,title = ?, finished = ?, finished_at = ?, genuine = ?, platform = ?, system = ? WHERE id = ? RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, genuine, platform, system, id] })
    return result[0];
})

const updateToBuyGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { title, finished, finished_at, genuine, system, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "ToBuy" SET title = ?, finished = ?,finished_at = ?,genuine = ?, system = ? WHERE id = ? RETURNING *`, { type: QueryTypes.UPDATE, replacements: [title, finished, finished_at, genuine, system, id] })
    return result[0];
})

const updateOriginGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "Games" SET app_id = ?, system_id = ?, title = ?, finished = ?, finished_at = ?, collection = ?, genuine = ?, fisical_disc = ? WHERE id = ? AND system_id = 1 RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id] })
    return result[0];
})

const updateUbisoftGame = compose(...authGuard)(async (parent, args, ctx, info) => {
    const { app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id } = args.input;
    const [result, metadata] = await ctx.orm.sequelize.query(`UPDATE "Games" SET app_id = ?, system_id = ?, title = ?, finished = ?, finished_at = ?, collection = ?, genuine = ?, fisical_disc = ? WHERE id = ? AND system_id = 3 RETURNING *`, { type: QueryTypes.UPDATE, replacements: [app_id, system_id, title, finished, finished_at, collection, genuine, fisical_disc, id] })
    return result[0];
})

const deleteDLCGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "DLC" WHERE id = :id`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteWiiUGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "Games" WHERE id = :id AND system_id = 6`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteWiiGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "Wii" WHERE id = :id AND system_id = 5`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteGameCubeGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "GameCube" WHERE id = :id AND system_id = 4`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteVirtualConsoleGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "VirtualConsole" WHERE id = :id`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteToBuyGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "ToBuy" WHERE id = :id`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteOriginGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "Origin" WHERE id = :id`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})

const deleteUbisoftGame = compose(...authGuard)(async (parent, { id }, ctx, info) => {
    let resp;
    try {
        await ctx.orm.sequelize.query(`DELETE FROM "Games" WHERE id = :id AND system_id = 3`, { type: QueryTypes.DELETE, replacements: { id } })
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
})


export {
    hello, allCategories, allWiiUGames, allWiiGames, allGameCubeGames, allVirtualConsoleGames,
    allToBuyGames, allOriginGames, allUbisoftGames, allDLCs, allSteamGames,
    allConsoleGames, allPCGames, allGames, allGamesWithDLCs, allGamesFinished, allGamesFinishedDetailed, allGamesUnfinished,
    allGamesUnfinishedDetailed, allConsoleGamesGenres, allPCGamesGenres, allGamesGenresAggregate,
    getCategory, getDLCGame, getWiiUGame, getWiiGame, getGameCubeGame,
    getVirtualConsoleGame, getToBuyGame, getOriginGame, getUbisoftGame,
    getDLC, getConsoleFinishedGames, getPCFinishedGames, getStatisticsOfTotalGames,
    getStatisticsOfTotalFinishedGames, getTotalChart, getFinishedChart, getTotalPercentChart, getPercentFinishedChart,
    getFinishedBySystem, getUnfinishedBySystem, doLogin,
    createCategory, createDLCGame, createWiiUGame,
    createWiiGame, createGameCubeGame, createVirtualConsoleGame, createToBuyGame,
    createOriginGame, createUbisoftGame, updateDLCGame, updateWiiUGame,
    updateWiiGame, updateGameCubeGame, updateVirtualConsoleGame, updateToBuyGame, updateOriginGame,
    updateUbisoftGame, deleteDLCGame, deleteWiiUGame, deleteWiiGame, deleteGameCubeGame,
    deleteVirtualConsoleGame, deleteToBuyGame, deleteOriginGame, deleteUbisoftGame
}