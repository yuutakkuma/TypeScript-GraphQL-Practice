import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../../types/MyContext';
// 認証済みユーザーか判断する
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error('認証されていません');
  }
  return next();
};
