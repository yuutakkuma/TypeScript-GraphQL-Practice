import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
// スキーマ
@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello,World';
  } // MutationはRESTfullでいうとcreate,update,deleteにあたる
  @Mutation(() => User)
  // 非同期処理でユーザーを登録するregister関数を作成
  async register(
    @Arg('userName') userName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    // ハッシュ関数を生成
    const hashedPassword = await bcrypt.hash(password, 12);
    // ユーザーを作成する、passwordの型にhashedPasswordを設定することで、ハッシュ化している
    const user = await User.create({
      userName,
      email,
      password: hashedPassword
    }).save();
    // UserEntityに返し、DBに保存
    return user;
  }
}
