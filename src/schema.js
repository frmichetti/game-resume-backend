import { makeExecutableSchema } from '@graphql-tools/schema'

const inputsWiiU = `
  id: String
  title: String
  finished: Boolean
  fisical_disc: Boolean  
`;

const inputWiiGCGame = `
  id: String
  title: String
  iso_type: String
  console: String
  finished: Boolean
  fisical_disc: Boolean
  size_gb: String
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
  input WiiGCGameInput {
    ${inputWiiGCGame}
  }
  input OriginGameInput{
    ${inputOriginGame}
  }
  input UbisoftGameInput{
    ${inputUbisoftGame}
  }
  input WiiGCGameUpdateInput {
    idx: ID
    ${inputWiiGCGame}
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
  type WiiGCGame {
    idx: ID
    ${inputWiiGCGame}
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
    title: String
    platform: String
    finished: Boolean
  }
  type Query {    
    hello: String
    allWiiUGames: [WiiUGame!]!
    allWiiGCGames: [WiiGCGame!]!
    allOriginGames: [OriginGame!]!
    allUbisoftGames: [UbisoftGame!]!
    allSteamGames: [SteamGame!]!
    allDLCs: [DLC!]!
    allConsoleGames: [ConsoleGame!]!   
    allPCGames: [PCGame!]!
    getWiiUGame(id: String!): WiiUGame
    getWiiGCGame(id: String!): WiiGCGame
    getOriginGame(idx: ID!): OriginGame
    getUbisoftGame(idx: ID!): UbisoftGame
  }
  type Mutation {
    createWiiUGame(input: WiiUGameInput): WiiUGame
    createWiiGCGame(input: WiiGCGameInput): WiiGCGame
    createOriginGame(input: OriginGameInput): OriginGame
    createUbisoftGame(input: UbisoftGameInput): UbisoftGame
    updateWiiUGame(input: WiiUGameUpdateInput): WiiUGame
    updateWiiGCGame(input: WiiGCGameUpdateInput): WiiGCGame
    updateOriginGame(input: OriginUpdateGameInput): OriginGame
    updateUbisoftGame(input: UbisoftUpdateGameInput): UbisoftGame
    deleteWiiUGame(idx: ID!): Boolean
    deleteWiiGCGame(idx: ID!): Boolean
    deleteOriginGame(idx: ID!): Boolean
    deleteUbisoftGame(idx: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: (_) =>{
      return 'hello';
    },
    allWiiUGames: async (parent, args, ctx, info) => {      
      const games = await ctx.db.query('SELECT * FROM [wiiu_games]')
      return games;
    },
    allWiiGCGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [wii_gc_games]')
      return games;
    },
    allOriginGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [origin_games]')
      return games;
    },
    allUbisoftGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [ubisoft_games]')
      return games;
    },
    allDLCs: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [dlcs]')
      return games;
    },
    allSteamGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [all_steam_games]')
      return games;
    },
    allConsoleGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [all_console_games]')
      return games;
    },
    allPCGames: async (parent, args, ctx, info) => {
      const games = await ctx.db.query('SELECT * FROM [all_pc_games]')
      return games;
    },
    getWiiUGame: async (parent, { id }, ctx, info) => {
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}'`)
      return game[0];
    },
    getWiiGCGame: async (parent, { id }, ctx, info) => {
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [id] = '${id}'`)
      return game[0];
    },
    getOriginGame: async (parent, { idx }, ctx, info) => {
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    getUbisoftGame: async (parent, { idx }, ctx, info) => {
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [idx] = ${idx}`)
      return game[0];
    }
  },
  Mutation: {
    createWiiUGame: async (parent, args, ctx, info)  => {
      const { id, title, finished, fisical_disc } = _.input;
      await ctx.db.execute(`INSERT INTO [wiiu_games] (id,title,finished,fisical_disc) VALUES ('${id}','${title}',${finished},${fisical_disc});`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createWiiGCGame: async (parent, args, ctx, info)  => {
      const { id, title, finished, fisical_disc, size_gb, iso_type, console } = _.input;
      await ctx.db.execute(`INSERT INTO [wii_gc_games] (id,title,finished,fisical_disc,size_gb,iso_type,console) VALUES ('${id}','${title}',${finished},${fisical_disc},'${size_gb}', '${iso_type}', '${console}');`)
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createOriginGame: async (parent, args, ctx, info)  => {
      const { id, title, finished } = _.input;
      await ctx.db.execute(`INSERT INTO [origin_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    createUbisoftGame: async (parent, args, ctx, info)  => {
      const { id, title, finished } = _.input;
      await ctx.db.execute(`INSERT INTO [ubisoft_games] (id,title,finished) VALUES ('${id}','${title}',${finished});`)
      const game = await ctx.db.query(`SELECT * FROM [ubisoft_games] WHERE [id] = '${id}' AND [title] = '${title}'`)
      return game[0];
    },
    updateWiiUGame: async (parent, args, ctx, info)  => {
      const { id, idx, title, finished, fisical_disc } = _.input;
      await ctx.db.execute(`UPDATE [wiiu_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wiiu_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateWiiGCGame: async (parent, args, ctx, info)  => {
      const { id, idx, title, finished, fisical_disc, size_gb, iso_type, console } = _.input;
      await ctx.db.execute(`UPDATE [wii_gc_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished}, [fisical_disc] = ${fisical_disc}, [size_gb] = '${size_gb}', [iso_type] = '${iso_type}', [console] = '${console}' WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [wii_gc_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateOriginGame: async (parent, args, ctx, info)  => {
      const { id, idx, title, finished } = _.input;
      await ctx.db.execute(`UPDATE [origin_games] SET [id] = '${id}',[title] = '${title}', [finished] = ${finished} WHERE [idx] = ${idx};`)
      const game = await ctx.db.query(`SELECT * FROM [origin_games] WHERE [idx] = ${idx}`)
      return game[0];
    },
    updateUbisoftGame: async (parent, args, ctx, info)  => {
      const { id, idx, title, finished } = _.input;
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
    deleteWiiGCGame: async (parent, { idx }, ctx, info) => {
      let resp;
      try {
        await ctx.db.execute(`DELETE FROM [wii_gc_games] WHERE [idx] = ${idx};`)
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
    dlcs: async (parent, args, ctx, info) => {   
      let dlcs;
      try {
        dlcs = await ctx.db.query(`SELECT * FROM [dlcs] WHERE [id] = '${parent.id}'`)  
        return dlcs
      } catch (error) {
        console.error(error)
      }         
    }
  },
};

export default makeExecutableSchema({ typeDefs, resolvers });