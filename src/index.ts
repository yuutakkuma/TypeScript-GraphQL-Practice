import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { RegisterResolver } from './modules/user/Register';
import { createConnection } from 'typeorm';

const main = async () => {
  // DBと接続
  await createConnection();
  // スキーマをビルド
  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  });
  // インスタンス作成（スキーマを代入している）
  const apolloServer = new ApolloServer({ schema });
  const app = Express();

  apolloServer.applyMiddleware({ app });
  // 4000ポートで起動
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
};

main();
