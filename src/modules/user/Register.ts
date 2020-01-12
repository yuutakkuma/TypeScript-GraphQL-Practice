import { Resolver, Query, Mutation, Arg, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegistarInput';
import { isAuth } from '../middleware/isAuth';
// 登録スキーマ
@Resolver()
export class RegisterResolver {
  // 認証済みユーザーのみHelloWorldが可能
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello,World';
  }
  // MutationはRESTfullでいうとcreate,update,deleteにあたる
  @Mutation(() => User)
  // 非同期処理でユーザーを登録するregisterメソッドを作成、入力タイプはRegisterInputから受け取ってる
  async register(
    @Arg('data') { userName, email, password }: RegisterInput
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
