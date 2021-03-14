import { ApolloServer } from 'apollo-server';
import { TrefleAPI } from './trefle-api.js';
import { typeDefs } from './type-defs.js';

const resolvers = {
  Query: {
    plants: async (_source, _args, {dataSources}) => dataSources.trefleAPI.getPlants()
  },
};

export const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => ({
    trefleAPI: new TrefleAPI(),
  }),
  context: ({req}) => ({
    token: req.query.token,
  }), 
});