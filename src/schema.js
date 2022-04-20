import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers'

const inputsWiiU = `
  app_id: String
  title: String
  finished: Boolean
  finished_at: Date
  collection: Boolean
  genuine: Boolean
  fisical_disc: Boolean  
`;

const inputWiiGame = `
  app_id: String
  title: String    
  finished: Boolean
  finished_at: Date
  collection: Boolean
  genuine: Boolean
  fisical_disc: Boolean  
`;

const inputGameCubeGame = `
  app_id: String
  title: String    
  finished: Boolean
  finished_at: Date
  collection: Boolean
  genuine: Boolean
  fisical_disc: Boolean  
`;

const inputVirtualConsoleGame = `  
  app_id: String
  title: String  
  finished: Boolean
  finished_at: Date
  genuine: Boolean  
  system_id: Int
`;

const inputToBuyGame = `    
  title: String  
  finished: Boolean  
  finished_at: Date
  genuine: Boolean
  system: String  
`;

const inputOriginGame = `
  app_id: String
  title: String
  finished: Boolean
  finished_at: Date
`
const inputUbisoftGame = `
  app_id: String
  title: String
  finished: Boolean
  finished_at: Date
`

const inputDLCGame = `
  app_id: String
  title: String
  finished: Boolean
  finished_at: Date
  collection: Boolean
 `

const inputCategory = `
  slugname: String!
  name: String!
 `

// Construct a schema, using GraphQL schema language
const typeDefs = `  
  scalar Date
  input CategoryInput {
    ${inputCategory}
  }
  input DLCGameInput {
    ${inputDLCGame}
  }
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
  input ToBuyGameInput {
    ${inputToBuyGame}
  }
  input OriginGameInput{
    ${inputOriginGame}
  }
  input UbisoftGameInput{
    ${inputUbisoftGame}
  }
  input CategoryUpdateInput{
    id: ID!
    ${inputCategory}
  }
  input DLCGameUpdateInput {
    id: ID!
    ${inputDLCGame}
  }
  input WiiGameUpdateInput {
    id: ID!
    ${inputWiiGame}
  }  
  input GameCubeGameUpdateInput {
    id: ID!
    ${inputGameCubeGame}
  }  
  input VirtualConsoleGameUpdateInput {
    id: ID!
    ${inputVirtualConsoleGame}
  }  
  input ToBuyGameUpdateInput {
    id: ID!
    ${inputToBuyGame}
  }  
  input WiiUGameUpdateInput {
    id: ID!
    ${inputsWiiU}  
  }
  input OriginUpdateGameInput {
    id: ID!
    ${inputOriginGame}  
  }
  input UbisoftUpdateGameInput {
    id: ID!
    ${inputUbisoftGame}  
  }
  type WiiUGame {
    id: ID
    ${inputsWiiU}  
    dlcs: [DLC!]!
  }
  type WiiGame {
    id: ID
    ${inputWiiGame}
    dlcs: [DLC!]!
  }  
  type GameCubeGame {
    id: ID
    ${inputGameCubeGame}
    dlcs: [DLC!]!
  }  
  type VirtualConsoleGame{
    id: ID
    ${inputVirtualConsoleGame}
  }
  type ToBuyGame {
    id: ID
    ${inputToBuyGame}
  }
  type OriginGame {
    id: ID
    ${inputOriginGame}
  }
  type UbisoftGame {
    id: ID
    ${inputUbisoftGame}
  }
  type Category {
    id: ID
    ${inputCategory}
  }
  type SteamGame {
    id: ID
    appid: String
    title: String
    finished: Boolean
    collection: Boolean
    dlcs: [DLC!]! 
  }
  type DLC {
    id: ID
    app_id: String
    title: String
    finished: Boolean   
    finished_at: Date
    collection: Boolean
  }
  type ConsoleGame {
    app_id: String
    title: String
    finished: Boolean
    fisical_disc:Boolean
    system: String
  }
  type PCGame {
    app_id: String
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
    total: Float
  }
  type TotalGameInfo {
    description: String
    total: Float
  }
  type AppendGameDLC {
    title: String
    system: String
    finished: Boolean
  }
  type ChartStat {
    system: String
    total: Int
    percentual: Float
  }
  type ChartData {
    stats: [ChartStat]
    labels: [String]
    values: [Float]
    dataset: String
  }
  type GenreData {
    genre: String
    total: Int
  }  
  type Query {    
    hello: String
    allCategories: [Category!]!
    allWiiUGames: [WiiUGame!]!
    allWiiGames: [WiiGame!]!
    allGameCubeGames: [GameCubeGame!]!
    allVirtualConsoleGames: [VirtualConsoleGame!]!
    allToBuyGames: [ToBuyGame!]!
    allOriginGames: [OriginGame!]!
    allUbisoftGames: [UbisoftGame!]!
    allSteamGames: [SteamGame!]!
    allDLCs: [DLC!]!
    allConsoleGames: [ConsoleGame!]!   
    allPCGames: [PCGame!]!
    allGames: [Game!]!
    allGamesWithDLCs: [AppendGameDLC!]!
    allGamesFinished: [Game!]!
    allGamesFinishedDetailed: [Game!]!
    allGamesUnfinished: [Game!]!
    allGamesUnfinishedDetailed: [Game!]!
    allConsoleGamesGenres: [GenreData!]!
    allPCGamesGenres: [GenreData!]!
    allGamesGenresAggregate: [GenreData!]!
    getCategory(id: ID!) : Category
    getDLCGame(id: ID!) : DLC
    getWiiUGame(app_id: String!): WiiUGame
    getWiiGame(app_id: String!): WiiGame
    getGameCubeGame(app_id: String!): GameCubeGame
    getVirtualConsoleGame(id: ID!): VirtualConsoleGame
    getToBuyGame(id: ID!): ToBuyGame
    getOriginGame(id: ID!): OriginGame
    getUbisoftGame(id: ID!): UbisoftGame
    getConsoleFinishedGames(finished: Boolean!): [ConsoleGame!]!
    getPCFinishedGames(finished: Boolean!): [PCGame!]!
    getDLC(app_id: String!) : [DLC!]!
    getStatisticsOfTotalGames: [TotalGameInfo!]!
    getStatisticsOfTotalFinishedGames: [TotalFinishedInfo!]!
    getTotalChart: ChartData
    getFinishedChart: ChartData
    getTotalPercentChart: ChartData
    getPercentFinishedChart: ChartData
    getFinishedBySystem(system: String!): [Game!]!
    getUnfinishedBySystem(system: String!): [Game!]!
  }
  type Mutation {
    createCategory(input: CategoryInput) : Category
    createDLCGame(input: DLCGameInput) : DLC
    createWiiUGame(input: WiiUGameInput): WiiUGame
    createWiiGame(input: WiiGameInput): WiiGame
    createGameCubeGame(input: GameCubeGameInput): GameCubeGame
    createVirtualConsoleGame(input: VirtualConsoleGameInput): VirtualConsoleGame
    createToBuyGame(input: ToBuyGameInput): ToBuyGame
    createOriginGame(input: OriginGameInput): OriginGame
    createUbisoftGame(input: UbisoftGameInput): UbisoftGame
    updateCategory(input: CategoryUpdateInput): Category
    updateDLCGame(input: DLCGameUpdateInput): DLC
    updateWiiUGame(input: WiiUGameUpdateInput): WiiUGame
    updateWiiGame(input: WiiGameUpdateInput): WiiGame
    updateGameCubeGame(input: GameCubeGameUpdateInput): GameCubeGame
    updateVirtualConsoleGame(input: VirtualConsoleGameUpdateInput): VirtualConsoleGame
    updateToBuyGame(input: ToBuyGameUpdateInput): ToBuyGame
    updateOriginGame(input: OriginUpdateGameInput): OriginGame
    updateUbisoftGame(input: UbisoftUpdateGameInput): UbisoftGame
    deleteCategory(id: ID!): Boolean
    deleteDLCGame(id: ID!): Boolean
    deleteWiiUGame(id: ID!): Boolean
    deleteWiiGame(id: ID!): Boolean
    deleteGameCubeGame(id: ID!): Boolean
    deleteVirtualConsoleGame(id: ID!): Boolean
    deleteToBuyGame(id: ID!): Boolean
    deleteOriginGame(id: ID!): Boolean
    deleteUbisoftGame(id: ID!): Boolean
  }
`;

const _resolvers = {
  Query: {
    hello: resolvers.hello,
    allCategories: resolvers.allCategories,
    allWiiUGames: resolvers.allWiiUGames,
    allWiiGames: resolvers.allWiiGames,
    allGameCubeGames: resolvers.allGameCubeGames,
    allVirtualConsoleGames: resolvers.allVirtualConsoleGames,
    allToBuyGames: resolvers.allToBuyGames,
    allOriginGames: resolvers.allOriginGames,
    allUbisoftGames: resolvers.allUbisoftGames,
    allDLCs: resolvers.allDLCs,
    allSteamGames: resolvers.allSteamGames,
    allConsoleGames: resolvers.allConsoleGames,
    allPCGames: resolvers.allPCGames,
    allGames: resolvers.allGames,
    allGamesWithDLCs: resolvers.allGamesWithDLCs,
    allGamesFinished: resolvers.allGamesFinished,
    allGamesFinishedDetailed: resolvers.allGamesFinishedDetailed,
    allGamesUnfinished: resolvers.allGamesUnfinished,
    allGamesUnfinishedDetailed: resolvers.allGamesUnfinishedDetailed,
    allConsoleGamesGenres: resolvers.allConsoleGamesGenres,
    allPCGamesGenres: resolvers.allPCGamesGenres,
    allGamesGenresAggregate: resolvers.allGamesGenresAggregate,
    getCategory: resolvers.getCategory,
    getDLCGame: resolvers.getDLCGame,
    getWiiUGame: resolvers.getWiiUGame,
    getWiiGame: resolvers.getWiiGame ,
    getGameCubeGame: resolvers.getGameCubeGame,
    getVirtualConsoleGame: resolvers.getVirtualConsoleGame ,
    getToBuyGame: resolvers.getToBuyGame,
    getOriginGame: resolvers.getOriginGame,
    getUbisoftGame: resolvers.getUbisoftGame ,
    getDLC: resolvers.getDLC,
    getConsoleFinishedGames: resolvers.getConsoleFinishedGames,
    getPCFinishedGames: resolvers.getPCFinishedGames,
    getStatisticsOfTotalGames: resolvers.getStatisticsOfTotalGames,
    getStatisticsOfTotalFinishedGames: resolvers.getStatisticsOfTotalFinishedGames,
    getTotalChart: resolvers.getTotalChart,
    getFinishedChart: resolvers.getFinishedChart,
    getTotalPercentChart: resolvers.getTotalPercentChart,
    getPercentFinishedChart: resolvers.getPercentFinishedChart,
    getFinishedBySystem: resolvers.getFinishedBySystem,
    getUnfinishedBySystem: resolvers.getUnfinishedBySystem
  },
  Mutation: {
    createDLCGame: resolvers.createDLCGame,
    createWiiUGame: resolvers.createWiiUGame,
    createWiiGame: resolvers.createWiiGame,
    createGameCubeGame: resolvers.createGameCubeGame,
    createVirtualConsoleGame: resolvers.createVirtualConsoleGame,
    createToBuyGame: resolvers.createToBuyGame,
    createOriginGame: resolvers.createOriginGame ,
    createUbisoftGame: resolvers.createUbisoftGame ,
    updateDLCGame: resolvers.updateDLCGame,
    updateWiiUGame: resolvers.updateWiiUGame,
    updateWiiGame: resolvers.updateWiiGame,
    updateGameCubeGame: resolvers.updateGameCubeGame,
    updateVirtualConsoleGame: resolvers.updateVirtualConsoleGame,
    updateToBuyGame: resolvers.updateToBuyGame,
    updateOriginGame: resolvers.updateOriginGame,
    updateUbisoftGame: resolvers.updateUbisoftGame ,
    deleteDLCGame: resolvers.deleteDLCGame,
    deleteWiiUGame: resolvers.deleteWiiUGame ,
    deleteWiiGame: resolvers.deleteWiiGame,
    deleteGameCubeGame: resolvers.deleteGameCubeGame,
    deleteVirtualConsoleGame: resolvers.deleteVirtualConsoleGame,
    deleteToBuyGame: resolvers.deleteToBuyGame,
    deleteOriginGame: resolvers.deleteOriginGame ,
    deleteUbisoftGame: resolvers.deleteUbisoftGame
  },
  WiiUGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {
        dlcs = dataloaders.dlcLoader.load(parent.app_id || '-');
        return dlcs;
      } catch (error) {
        console.error(error)
      }
    }
  },
  WiiGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {
        dlcs = dataloaders.dlcLoader.load(parent.app_id || '-');
        return dlcs;
      } catch (error) {
        console.error(error)
      }
    }
  },
  GameCubeGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {
        dlcs = dataloaders.dlcLoader.load(parent.app_id || '-');
        return dlcs;
      } catch (error) {
        console.error(error)
      }
    }
  },
  SteamGame: {
    dlcs: async (parent, args, { db, dataloaders }, info) => {
      let dlcs;
      try {
        dlcs = dataloaders.dlcLoader.load(parent.app_id || '-');
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

export default makeExecutableSchema({ typeDefs, resolvers: _resolvers });