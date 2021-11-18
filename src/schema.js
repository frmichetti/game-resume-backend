import { buildSchema } from 'graphql';

const inputsWiiU = `
  id: String
  title: String
  finished: Boolean
  fisical_disc: Boolean  
`;

const inputWiiGCGame= `
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
export const schema = buildSchema(`
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
  type Query {    
    allWiiUGames: [WiiUGame!]!
    allWiiGCGames: [WiiGCGame!]!
    allOriginGames: [OriginGame!]!
    allUbisoftGames: [UbisoftGame!]!
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
`);

