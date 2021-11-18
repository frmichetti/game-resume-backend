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

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  input WiiUGameInput {
    ${inputsWiiU}
  }
  input WiiGCGameInput {
    ${inputWiiGCGame}
  }
  input WiiGCGameUpdateInput {
    idx: ID
    ${inputWiiGCGame}
  }
  input WiiUGameUpdateInput {
    idx: ID
    ${inputsWiiU}  
  }
  type WiiUGame {
    idx: ID
    ${inputsWiiU}  
  }
  type WiiGCGame {
    idx: ID
    ${inputWiiGCGame}
  }  
  type Query {    
    allWiiUGames: [WiiUGame!]!
    allWiiGCGames: [WiiGCGame!]!
    getWiiUGame(id: String!): WiiUGame
    getWiiGCGame(id: String!): WiiGCGame
  }
  type Mutation {
    createWiiUGame(input: WiiUGameInput): WiiUGame
    createWiiGCGame(input: WiiGCGameInput): WiiGCGame
    updateWiiUGame(input: WiiUGameUpdateInput): WiiUGame
    updateWiiGCGame(input: WiiGCGameUpdateInput): WiiGCGame
    deleteWiiUGame(idx: ID!): Boolean
    deleteWiiGCGame(idx: ID!): Boolean
  }
`);

