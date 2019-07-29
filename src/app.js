import express from 'express';
import request from 'request';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import { authentication } from './middlewares';

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

app.use(bodyParser.json());
app.use(cookieParser());

app.use(authentication);

app.use(
  API_PREFIX,
  graphqlHttp({
    schema,
    rootValue: resolvers,
    graphiql: true,
  }),
);

app.get('/*', (req, res) => {
  request(
    {
      url: 'http://client:3001',
      method: 'POST',
      body: { a: 1, b: 22 },
      json: true,
    },
    (err, response, body) => {
      if (err) throw err;
      res.send(body);
    },
  );
});

mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASSWORD}@db:${DB_PORT}/${DB_NAME}`,
  { useNewUrlParser: true },
);

app.listen(PORT);
