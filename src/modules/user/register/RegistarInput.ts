import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
// ユーザーからの入力を受け付ける
@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  userName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
