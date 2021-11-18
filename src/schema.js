import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
export const schema = buildSchema(`
  type WiiUGame {
    idx: ID
    id: String
    title: String
    finished: Boolean
    fisical_disc: Boolean  
  }  
  type Query {
    hello: String
    allWiiUGames: [WiiUGame!]!
  }
`);

