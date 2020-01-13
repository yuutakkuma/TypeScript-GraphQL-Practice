require('dotenv').config();
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';

const main = async () => {
  // DBと接続
  await createConnection();
  // スキーマをビルド
  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.ts'],
    authChecker: ({ context: { req } }) => {
      // ユーザーがログインしてたらtrueを返す
      return !!req.session.userId;
    }
  });
  // インスタンス作成（スキーマを代入している）
  const apolloServer = new ApolloServer({
    schema,
    // 同じリクエストオブジェクトを持っているコンテキストでのみアクセス出来る
    context: ({ req, res }: any) => ({ req, res })
  });
  const app = Express();
  const RedisStore = connectRedis(session);
  // クッキーの設定
  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: 'processenvSECRET',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7年
      }
    })
  );

  apolloServer.applyMiddleware({ app });
  // 4000ポートで起動
  app.listen(4000, () => {
    console.log('server started on http://localhost:4000/graphql');
  });
};

main();
