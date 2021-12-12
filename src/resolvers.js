// Queries

const hello = (parent, args, ctx, info) => {
    return 'hello';
}
const allCategories = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [categories]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allWiiUGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM [wiiu_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allWiiGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [wii_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allGameCubeGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [gamecube_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allVirtualConsoleGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [virtual_console_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allToBuyGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [to_buy_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allOriginGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [origin_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allUbisoftGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [ubisoft_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allDLCs = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [dlcs] ORDER BY id ASC`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allSteamGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [append_list_steam_finished_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allConsoleGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [all_console_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allPCGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, { keep: ["id"], exclude: ["dlcs"] })
    const sql = `SELECT ${fields.toString()} FROM [all_pc_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allGames = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [all_games_list]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const allGamesWithDLCs = async (parent, args, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [append_dlcs_with_games]`
    console.log(sql)
    const games = await ctx.db.query(sql)
    return games;
}

const getCategory = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [categories] WHERE [idx] = '${idx}'`
    console.log(sql)
    const dlcs = await ctx.db.query(sql)
    return dlcs[0];
}

const getDLCGame = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [dlcs] WHERE [idx] = '${idx}'`
    console.log(sql)
    const dlcs = await ctx.db.query(sql)
    return dlcs[0];
}

const getWiiUGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [wiiu_games] WHERE [id] = '${id}'`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getWiiGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [wii_games] WHERE [id] = '${id}'`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getGameCubeGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [gamecube_games] WHERE [id] = '${id}'`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getVirtualConsoleGame = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [virtual_console_games] WHERE [id] = '${id}'`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getToBuyGame = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [to_buy_games] WHERE [idx] = '${idx}'`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getOriginGame = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [origin_games] WHERE [idx] = ${idx}`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getUbisoftGame = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [ubisoft_games] WHERE [idx] = ${idx}`
    console.log(sql)
    const game = await ctx.db.query(sql)
    return game[0];
}

const getDLC = async (parent, { id }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [dlcs] WHERE [id] = '${id}'`
    console.log(sql)
    const dlcs = await ctx.db.query(sql)
    return dlcs;
}

const getConsoleFinishedGames = async (parent, { finished }, ctx, info) => {
    const sql = `SELECT * FROM (
      SELECT [wii_games].title AS title, [wii_games].finished AS finished, [wii_games].[fisical_disc] AS fisical_disc, "Wii" as system FROM [wii_games]
            UNION
      SELECT [gamecube_games].title AS title, [gamecube_games].finished AS finished, [gamecube_games].[fisical_disc] AS fisical_disc, "GameCube" as system FROM [gamecube_games]
            UNION
      SELECT [wiiu_games].title AS title, [wiiu_games].finished AS finished, [wiiu_games].fisical_disc AS fisical_disc, "WiiU" as system FROM [wiiu_games] 
            UNION
      SELECT [virtual_console_games].title AS title, [virtual_console_games].finished AS finished, false AS fisical_disc, [virtual_console_games].system as system FROM [virtual_console_games] 
            ) AS all_fisical_and_finished
            WHERE (((all_fisical_and_finished.[finished])=${finished}))`
    const games = await ctx.db.query(sql)
    return games;
}

const getPCFinishedGames = async (parent, { finished }, ctx, info) => {
    const sql = `SELECT *
    FROM (SELECT [origin_games].title AS title, "Origin" AS platform, CBOOL([origin_games].finished) as finished 
    FROM [origin_games]
     UNION
    SELECT [ubisoft_games].title AS title, "Ubisoft" AS platform, CBOOL([ubisoft_games].finished) as finished
    FROM [ubisoft_games]
     UNION SELECT [steam_games].[title] AS title, "Steam" AS platform, CBOOL([steam_finished].[finished]) as finished
    FROM  [steam_finished] INNER JOIN [steam_games] ON [steam_finished].[appid] = [steam_games].[appid] )  AS pc_finished_games
    WHERE finished = ${finished};
    `
    const games = await ctx.db.query(sql)
    return games;
}

const getStatisticsOfTotalGames = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [total_games_for_dashboard]`
    console.log(sql)
    try {
        const stats = await ctx.db.query(sql)
        return stats;
    } catch (error) {
        console.error(error);
        return []
    }
}

const getStatisticsOfTotalFinishedGames = async (parent, { idx }, ctx, info) => {
    const fields = ctx.requestedFields.getFields(info, {})
    const sql = `SELECT ${fields.toString()} FROM [total_finished_games_for_dashboard]`
    console.log(sql)
    try {
        const stats = await ctx.db.query(sql)
        return stats;
    } catch (error) {
        console.error(error);
        return []
    }
}

const getTotalChart = async (parent, args, ctx, info) => {
    try {
        const stats = await ctx.db.query(`SELECT * FROM [total_of_percentual_games_by_system];`);
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
        const stats = await ctx.db.query(`SELECT * FROM [total_of_percentual_finished_games_by_system];`);
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
        const stats = await ctx.db.query(`SELECT * FROM [total_of_percentual_games_by_system];`);
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
        const stats = await ctx.db.query(`SELECT * FROM [total_of_percentual_finished_games_by_system];`);
        const labels = stats.map(i => i.system)
        const values = stats.map(i => i.percentual)
        const dataset = "Percent of Finished Games"

        return { stats, labels, values, dataset };
    } catch (error) {
        console.error(error);
    }
}

// Mutations

const createDLCGame = async (parent, args, ctx, info) => {
    const { id, title, finished } = args.input;
    await ctx.db.execute(`INSERT INTO [dlcs] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
    const game = await ctx.db.query(`SELECT * FROM [dlcs] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createWiiUGame = async (parent, args, ctx, info) => {
    const { id, title, finished, fisical_disc } = args.input;
    await ctx.db.execute(`INSERT INTO [wiiu_games] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`)
    const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createWiiGame = async (parent, args, ctx, info) => {
    const { id, title, finished, fisical_disc, size_gb } = args.input;
    await ctx.db.execute(`INSERT INTO [wii_games] (id,title,finished,fisical_disc,size_gb) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}');`)
    const game = await ctx.db.query(`SELECT * FROM [wii_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createGameCubeGame = async (parent, args, ctx, info) => {
    const { id, title, finished, fisical_disc, size_gb } = args.input;
    await ctx.db.execute(`INSERT INTO [gamecube_games] (id,title,finished,fisical_disc,size_gb) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}');`)
    const game = await ctx.db.query(`SELECT * FROM [gamecube_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createVirtualConsoleGame = async (parent, args, ctx, info) => {
    const { id, title, finished, system } = args.input;
    const _console = args.input.console;
    await ctx.db.execute(`INSERT INTO [virtual_console_games] (id,title,finished,console,system) VALUES ('${id}','${title}',${finished},'${_console}','${system}');`)
    const game = await ctx.db.query(`SELECT * FROM [virtual_console_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createToBuyGame = async (parent, args, ctx, info) => {
    const { title, finished, system } = args.input;
    await ctx.db.execute(`INSERT INTO [to_buy_games] (title,finished,system) VALUES ('${title}',${finished},'${system}');`)
    const game = await ctx.db.query(`SELECT * FROM [to_buy_games] WHERE [title] = '${title}'`)
    return game[0];
}

const createOriginGame = async (parent, args, ctx, info) => {
    const { id, title, finished } = args.input;
    await ctx.db.execute(`INSERT INTO [origin_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
    const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const createUbisoftGame = async (parent, args, ctx, info) => {
    const { id, title, finished } = args.input;
    await ctx.db.execute(`INSERT INTO [ubisoft_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
    const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
    return game[0];
}

const updateDLCGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished } = args.input;
    await ctx.db.execute(`UPDATE [dlcs] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [dlcs] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateWiiUGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished, fisical_disc } = args.input;
    await ctx.db.execute(`UPDATE [wiiu_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateWiiGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished, fisical_disc, size_gb } = args.input;
    await ctx.db.execute(`UPDATE [wii_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}' WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [wii_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateGameCubeGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished, fisical_disc, size_gb } = args.input;
    await ctx.db.execute(`UPDATE [gamecube_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}' WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [gamecube_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateVirtualConsoleGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished, system } = args.input;
    const _console = args.input.console;
    await ctx.db.execute(`UPDATE [virtual_console_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [console] = '${_console}', [system] = '${system}' WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [virtual_console_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateToBuyGame = async (parent, args, ctx, info) => {
    const { idx, title, finished, system } = args.input;
    await ctx.db.execute(`UPDATE [to_buy_games] SET [title] = '${title}', [finished] = ${finished}, [system] = '${system}' WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [to_buy_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateOriginGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished } = args.input;
    await ctx.db.execute(`UPDATE [origin_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const updateUbisoftGame = async (parent, args, ctx, info) => {
    const { id, idx, title, finished } = args.input;
    await ctx.db.execute(`UPDATE [ubisoft_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
    const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [idx] = ${idx}`)
    return game[0];
}

const deleteDLCGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [dlcs] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteWiiUGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [wiiu_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteWiiGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [wii_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteGameCubeGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [gamecube_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteVirtualConsoleGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [virtual_console_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteToBuyGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [to_buy_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteOriginGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [origin_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}

const deleteUbisoftGame = async (parent, { idx }, ctx, info) => {
    let resp;
    try {
        await ctx.db.execute(`DELETE FROM [ubisoft_games] WHERE [idx] = ${idx};`)
        resp = true;
    } catch (error) {
        console.error(error)
        resp = false
    }
    return resp;
}


export {
    hello, allCategories, allWiiUGames, allWiiGames, allGameCubeGames, allVirtualConsoleGames,
    allToBuyGames, allOriginGames, allUbisoftGames, allDLCs, allSteamGames,
    allConsoleGames, allPCGames, allGames, allGamesWithDLCs,
    getCategory, getDLCGame, getWiiUGame, getWiiGame, getGameCubeGame,
    getVirtualConsoleGame, getToBuyGame, getOriginGame, getUbisoftGame,
    getDLC, getConsoleFinishedGames, getPCFinishedGames, getStatisticsOfTotalGames,
    getStatisticsOfTotalFinishedGames, getTotalChart, getFinishedChart, getTotalPercentChart, getPercentFinishedChart,
    createDLCGame, createWiiUGame,
    createWiiGame, createGameCubeGame, createVirtualConsoleGame, createToBuyGame,
    createOriginGame, createUbisoftGame, updateDLCGame, updateWiiUGame,
    updateWiiGame, updateGameCubeGame, updateVirtualConsoleGame, updateToBuyGame, updateOriginGame,
    updateUbisoftGame, deleteDLCGame, deleteWiiUGame, deleteWiiGame, deleteGameCubeGame,
    deleteVirtualConsoleGame, deleteToBuyGame, deleteOriginGame, deleteUbisoftGame


}