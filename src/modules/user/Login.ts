import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { MyContext } from '../../types/MyContext';
// ログインスキーマ
@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    // 登録ユーザーが存在しない場合はnullを返す
    if (!user) {
      return null;
    }
    // 登録してるハッシュパスワードと一致するか確かめる
    const valid = await bcrypt.compare(password, user.password);
    // パスワードが一致しない場合はnullを返す
    if (!valid) {
      return null;
    }
    // emailとpasswordが一致したらリクエストセッションを行い、ログイン
    ctx.req.session!.userId = user.id;

    return user;
  }
}
