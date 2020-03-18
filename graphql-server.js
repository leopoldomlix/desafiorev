import { GraphQLServer } from 'graphql-yoga';
import { loadSchemaFiles } from 'graphql-toolkit';
import queries from './app/queries';
import mutations from './app/mutations';

const server = new GraphQLServer({
  typeDefs: loadSchemaFiles(__dirname + '/app/schemas/'),
  resolvers: { Query: queries, Mutation: mutations },
  context: req => req
});

const options = {
  port: 3000,
  endpoint: '/graphql',
  subscriptions: false,
  playground: '/playground'
};

server.start(options, ({ port }) => console.log(`Server started, listening on port ${port} for incoming requests.`));