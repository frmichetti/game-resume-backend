import { buildSchema } from 'graphql';

const inputsWiiU = `
  id: String
  title: String
  finished: Boolean
  fisical_disc: Boolean  
` 

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  input WiiUGameInput {
    ${inputsWiiU}
  }
  input WiiUGameUpdateInput {
    idx: ID
    ${inputsWiiU}  
  }
  type WiiUGame {
    idx: ID
    ${inputsWiiU}  
  }  
  type Query {    
    allWiiUGames: [WiiUGame!]!
    getWiiUGame(id: String!): WiiUGame
  }
  type Mutation {
    createWiiUGame(input: WiiUGameInput): WiiUGame
    updateWiiUGame(input: WiiUGameUpdateInput): WiiUGame
    deleteWiiUGame(idx: ID!): Boolean
  }
`);

