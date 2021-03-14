const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');
const https = require('https');

const typeDefs = gql`
  type Plant {
    id: ID
    common_name: String
  }

  type Query {
    plants: [Plant]
  }
`;

class TrefleAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://trefle.io/api/v1/'
  }

  willSendRequest(request) {
    request.params.set('token', this.context.token);
  }

  async getPlants() {
    const response = await this.get('plants');
    return response.data;
  }
}

const resolvers = {
  Query: {
    plants: async (_source, _args, foo) => foo.dataSources.trefleAPI.getPlants()
  },
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  dataSources: () => ({
    trefleAPI: new TrefleAPI(),
  }),
  context: ({req}) => ({
    token: req.query.token,
  }), 
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
}); 