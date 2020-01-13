import { Resolver, Mutation, Ctx } from 'type-graphql';
import { MyContext } from '../../types/MyContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session?.destroy(err => {
        // ログアウトに失敗したらerrを返す
        if (err) {
          console.log(err);
          return rej(false);
        }
        // ログアウトに成功したらcookiを削除する
        ctx.res.clearCookie('qid');
        return res(true);
      })
    );
  }
}
