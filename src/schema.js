import { makeExecutableSchema } from '@graphql-tools/schema'

const inputsWiiU = `
  id: String
  title: String
  finished: Boolean
  fisical_disc: Boolean  
`;

const inputWiiGame = `
  id: String
  title: String    
  finished: Boolean
  fisical_disc: Boolean
  size_gb: String
`;

const inputGameCubeGame = `
  id: String
  title: String    
  finished: Boolean
  fisical_disc: Boolean
  size_gb: String
`;

const inputVirtualConsoleGame = `  
  id: String
  title: String  
  finished: Boolean
  console: String
  system: String  
`;

const inputOriginGame = `
  id: String
  title: String
  finished: Boolean
`
const inputUbisoftGame = `
  id: String
  title: String
  finished: Boolean
`

// Construct a schema, using GraphQL schema language
const typeDefs = `  
  input WiiUGameInput {
    ${inputsWiiU}
  }
  input WiiGameInput {
    ${inputWiiGame}
  }
  input GameCubeGameInput {
    ${inputGameCubeGame}
  }
  input VirtualConsoleGameInput {
    ${inputVirtualConsoleGame}
  }
  input OriginGameInput{
    ${inputOriginGame}
  }
  input UbisoftGameInput{
    ${inputUbisoftGame}
  }
  input WiiGameUpdateInput {
    idx: ID
    ${inputWiiGame}
  }  
  input GameCubeGameUpdateInput {
    idx: ID
    ${inputGameCubeGame}
  }  
  input VirtualConsoleGameUpdateInput {
    idx: ID
    ${inputVirtualConsoleGame}
  }  
  input WiiUGameUpdateInput {
    idx: ID
    ${inputsWiiU}  
  }
  input OriginUpdateGameInput {
    idx: ID
    ${inputOriginGame}  
  }
  input UbisoftUpdateGameInput {
    idx: ID
    ${inputUbisoftGame}  
  }
  type WiiUGame {
    idx: ID
    ${inputsWiiU}  
    dlcs: [DLC!]!
  }
  type WiiGame {
    idx: ID
    ${inputWiiGame}
  }  
  type GameCubeGame {
    idx: ID
    ${inputGameCubeGame}
  }  
  type VirtualConsoleGame{
    idx: ID
    ${inputVirtualConsoleGame}
  }
  type OriginGame {
    idx: ID
    ${inputOriginGame}
  }
  type UbisoftGame {
    idx: ID
    ${inputUbisoftGame}
  }
  type SteamGame {
    appid: String
    title: String
    finished: Boolean
    playtime_forever: Int
    playtime_hours: Float 
  }
  type DLC {
    idx: ID
    id: String
    title: String
    finished: Boolean   
  }
  type ConsoleGame {
    title: String
    finished: Boolean
    fisical_disc:Boolean
    system: String
  }
  type PCGame {
    id: String
    title: String
    platform: String
    finished: Boolean
    dlcs: [DLC!]!
  }
  type Game {
    title: String
    system: String
    finished: Boolean
  }
  type TotalFinishedInfo {
    description: String
    total_games_finished: Int
  }
  type TotalGameInfo {
    description: String
    total_games: Int
  }
  type AppendGameDLC {
    dlc_id: String
    dlc_title: String
    dlc_finished: Boolean
    appid: String
    game_title: String
    game_finished: Boolean
  }  
  type Query {    
    hello: String
    allWiiUGames: [WiiUGame!]!
    allWiiGames: [WiiGame!]!
    allGameCubeGames: [GameCubeGame!]!
    allVirtualConsoleGames: [VirtualConsoleGame!]!
    allOriginGames: [OriginGame!]!
    allUbisoftGames: [UbisoftGame!]!
    allSteamGames: [SteamGame!]!
    allDLCs: [DLC!]!
    allConsoleGames: [ConsoleGame!]!   
    allPCGames: [PCGame!]!
    allGames: [Game!]!
    allGamesWithDLCs: [AppendGameDLC!]!
    getWiiUGame(id: String!): WiiUGame
    getWiiGame(id: String!): WiiGame
    getGameCubeGame(id: String!): GameCubeGame
    getVirtualConsoleGame(id: String!): VirtualConsoleGame
    getOriginGame(idx: ID!): OriginGame
    getUbisoftGame(idx: ID!): UbisoftGame
    getConsoleFinishedGames(finished: Boolean!): [ConsoleGame!]!
    getPCFinishedGames(finished: Boolean!): [PCGame!]!
    getDLC(id: String!) : [DLC!]!
    getStatisticsOfTotalGames: [TotalGameInfo!]!
    getStatisticsOfTotalFinishedGames: [TotalFinishedInfo!]!
  }
  type Mutation {
    createWiiUGame(input: WiiUGameInput): WiiUGame
    createWiiGame(input: WiiGameInput): WiiGame
    createGameCubeGame(input: GameCubeGameInput): GameCubeGame
    createVirtualConsoleGame(input: VirtualConsoleGameInput): VirtualConsoleGame
    createOriginGame(input: OriginGameInput): OriginGame
    createUbisoftGame(input: UbisoftGameInput): UbisoftGame
    updateWiiUGame(input: WiiUGameUpdateInput): WiiUGame
    updateWiiGame(input: WiiGameUpdateInput): WiiGame
    updateGameCubeGame(input: GameCubeGameUpdateInput): GameCubeGame
    updateVirtualConsoleGame(input: VirtualConsoleGameUpdateInput): VirtualConsoleGame
    updateOriginGame(input: OriginUpdateGameInput): OriginGame
    updateUbisoftGame(input: UbisoftUpdateGameInput): UbisoftGame
    deleteWiiUGame(idx: ID!): Boolean
    deleteWiiGame(idx: ID!): Boolean
    deleteGameCubeGame(idx: ID!): Boolean
    deleteVirtualConsoleGame(idx: ID!): Boolean
    deleteOriginGame(idx: ID!): Boolean
    deleteUbisoftGame(idx: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_) => {
      return 'hello';
    },
    allWiiUGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, { keep: ["id"], exclude: ["dlcs"] })      
      const sql = `SELECT ${fields.toString()} FROM [wiiu_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allWiiGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [wii_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allGameCubeGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [gamecube_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allVirtualConsoleGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [virtual_console_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allOriginGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [origin_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allUbisoftGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [ubisoft_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allDLCs: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [dlcs]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allSteamGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [append_list_steam_finished_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allConsoleGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [all_console_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allPCGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, { keep: ["id"], exclude: ["dlcs"] })      
      const sql = `SELECT ${fields.toString()} FROM [all_pc_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allGames: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [all_games_list]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    allGamesWithDLCs: async (parent, args, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [append_dlcs_with_games]`
      console.log(sql)
      const games = await ctx.db.query(sql)
      return games;
    },
    getWiiUGame: async (parent, { id }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [wiiu_games] WHERE [id] = '${id}'`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getWiiGame: async (parent, { id }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [wii_games] WHERE [id] = '${id}'`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getGameCubeGame: async (parent, { id }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [gamecube_games] WHERE [id] = '${id}'`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getVirtualConsoleGame: async (parent, { id }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [virtual_console_games] WHERE [id] = '${id}'`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getOriginGame: async (parent, { idx }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [origin_games] WHERE [idx] = ${idx}`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getUbisoftGame: async (parent, { idx }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [ubisoft_games] WHERE [idx] = ${idx}`
      console.log(sql)
      const game = await ctx.db.query(sql)
      return game[0];
    },
    getDLC: async (parent, { id }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [dlcs] WHERE [id] = '${id}'`
      console.log(sql)
      const dlcs = await ctx.db.query(sql)
      return dlcs;
    },
    getConsoleFinishedGames: async (parent, { finished }, ctx, info) => {  
      // TODO insert virtual console select    
      const sql = `SELECT * FROM (
        SELECT [wii_games].title AS title, [wii_games].finished AS finished, [wii_games].[fisical_disc] AS fisical_disc, "Wii" as system FROM [wii_games]
              UNION
        SELECT [gamecube_games].title AS title, [gamecube_games].finished AS finished, [gamecube_games].[fisical_disc] AS fisical_disc, "GameCube" as system FROM [gamecube_games]
              UNION
        SELECT [wiiu_games].title AS title, [wiiu_games].finished AS finished, [wiiu_games].fisical_disc AS fisical_disc, "WiiU" as system
              FROM [wiiu_games] 
              ) AS all_fisical_and_finished
              WHERE (((all_fisical_and_finished.[finished])=${finished}))`
      const games = await ctx.db.query(sql)
      return games;
    },
    getPCFinishedGames: async (parent, { finished }, ctx, info) => {
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
    },
    getStatisticsOfTotalGames: async (parent, { idx }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [total_games_for_dashboard]`
      console.log(sql)
      const stats = await ctx.db.query(sql)
      return stats;
    },
    getStatisticsOfTotalFinishedGames: async (parent, { idx }, ctx, info) => {
      const fields = ctx.requestedFields.getFields(info, {})      
      const sql = `SELECT ${fields.toString()} FROM [total_finished_games_for_dashboard]`
      console.log(sql)
      const stats = await ctx.db.query(sql)
      return stats;
    },
  },
  Mutation: {
    createWiiUGame: async (parent, args, ctx, info) => {
      const { id, title, finished, fisical_disc } = args.input;
      await ctx.db.execute(`INSERT INTO [wiiu_games] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createWiiGame: async (parent, args, ctx, info) => {
      const { id, title, finished, fisical_disc, size_gb } = args.input;
      await ctx.db.execute(`INSERT INTO [wii_games] (id,title,finished,fisical_disc,size_gb) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}');`)
      const game = await ctx.db.query(`SELECT * FROM [wii_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createGameCubeGame: async (parent, args, ctx, info) => {
      const { id, title, finished, fisical_disc, size_gb } = args.input;
      await ctx.db.execute(`INSERT INTO [gamecube_games] (id,title,finished,fisical_disc,size_gb) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}');`)
      const game = await ctx.db.query(`SELECT * FROM [gamecube_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createVirtualConsoleGame: async (parent, args, ctx, info) => {
      const { id, title, finished, console, system  } = args.input;
      await ctx.db.execute(`INSERT INTO [virtual_console_games] (id,title,finished,console,system) VALUES ('${id}','${title}',${finished},${console},'${system}');`)
      const game = await ctx.db.query(`SELECT * FROM [virtual_console_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createOriginGame: async (parent, args, ctx, info) => {
      const { id, title, finished } = args.input;
      await ctx.db.execute(`INSERT INTO [origin_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createUbisoftGame: async (parent, args, ctx, info) => {
      const { id, title, finished } = args.input;
      await ctx.db.execute(`INSERT INTO [ubisoft_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    updateWiiUGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished, fisical_disc } = args.input;
      await ctx.db.execute(`UPDATE [wiiu_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateWiiGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished, fisical_disc, size_gb } = args.input;
      await ctx.db.execute(`UPDATE [wii_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}' WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wii_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateGameCubeGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished, fisical_disc, size_gb } = args.input;
      await ctx.db.execute(`UPDATE [gamecube_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}' WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [gamecube_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateVirtualConsoleGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished, console, system } = args.input;
      await ctx.db.execute(`UPDATE [virtual_console_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [console] = ${console}, [system] = '${system}' WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [virtual_console_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateOriginGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished } = args.input;
      await ctx.db.execute(`UPDATE [origin_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateUbisoftGame: async (parent, args, ctx, info) => {
      const { id, idx, title, finished } = args.input;
      await ctx.db.execute(`UPDATE [ubisoft_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    deleteWiiUGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [wiiu_games] WHERE [idx] = ${idx};`)
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }
      return resp;
    },
    deleteWiiGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [wii_games] WHERE [idx] = ${idx};`)
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }
      return resp;
    },
    deleteGameCubeGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [gamecube_games] WHERE [idx] = ${idx};`)
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }
      return resp;
    },
    deleteVirtualConsoleGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [virtual_console_games] WHERE [idx] = ${idx};`)
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }
      return resp;
    },
    deleteOriginGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [origin_games] WHERE [idx] = ${idx};`)
        resp = true;
      } catch (error) {
        console.error(error)
        resp = false
      }
      return resp;
    },
    deleteUbisoftGame: async (parent, { idx }, ctx, info) => {
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
  },
  WiiUGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {        
        dlcs = dataloaders.dlcLoader.load(parent.id);
        return dlcs;
      } catch (error) {
        console.error(error)
      }
    }
  },
  PCGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {        
        dlcs = dataloaders.dlcLoader.load(parent.id);
        return dlcs;
      } catch (error) {
        console.error(error)
      }
    }
  }
};

export default makeExecutableSchema({ typeDefs, resolvers });