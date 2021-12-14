import { makeExecutableSchema } from '@graphql-tools/schema'
import * as resolvers from './resolvers'

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

const inputToBuyGame = `    
  title: String  
  finished: Boolean  
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

const inputDLCGame = `
  id: String
  title: String
  finished: Boolean
 `

const inputCategory = `
  description: String!
 `

// Construct a schema, using GraphQL schema language
const typeDefs = `  
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
    idx: ID
    ${inputCategory}
  }
  input DLCGameUpdateInput {
    idx: ID
    ${inputDLCGame}
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
  input ToBuyGameUpdateInput {
    idx: ID
    ${inputToBuyGame}
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
  type ToBuyGame {
    idx: ID
    ${inputToBuyGame}
  }
  type OriginGame {
    idx: ID
    ${inputOriginGame}
  }
  type UbisoftGame {
    idx: ID
    ${inputUbisoftGame}
  }
  type Category {
    idx: ID
    ${inputCategory}
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
    getCategory(idx: ID!) : Category
    getDLCGame(idx: ID!) : DLC
    getWiiUGame(id: String!): WiiUGame
    getWiiGame(id: String!): WiiGame
    getGameCubeGame(id: String!): GameCubeGame
    getVirtualConsoleGame(id: String!): VirtualConsoleGame
    getToBuyGame(idx: ID!): ToBuyGame
    getOriginGame(idx: ID!): OriginGame
    getUbisoftGame(idx: ID!): UbisoftGame
    getConsoleFinishedGames(finished: Boolean!): [ConsoleGame!]!
    getPCFinishedGames(finished: Boolean!): [PCGame!]!
    getDLC(id: String!) : [DLC!]!
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
    deleteCategory(idx: ID!): Boolean
    deleteDLCGame(idx: ID!): Boolean
    deleteWiiUGame(idx: ID!): Boolean
    deleteWiiGame(idx: ID!): Boolean
    deleteGameCubeGame(idx: ID!): Boolean
    deleteVirtualConsoleGame(idx: ID!): Boolean
    deleteToBuyGame(idx: ID!): Boolean
    deleteOriginGame(idx: ID!): Boolean
    deleteUbisoftGame(idx: ID!): Boolean
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

export default makeExecutableSchema({ typeDefs, resolvers: _resolvers });