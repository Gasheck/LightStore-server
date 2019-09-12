import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

mongoose.set('useFindAndModify', false);

const {
  API_PREFIX,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  SERVER_PORT: PORT,
} = process.env;

const app = express();

const server = new ApolloServer({ typeDefs: schema, resolvers });

server.applyMiddleware({ app, path: API_PREFIX });

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@db:${DB_PORT}/${DB_NAME}`,
  {
    useNewUrlParser: true,
  },
);

app.listen({ port: PORT });
