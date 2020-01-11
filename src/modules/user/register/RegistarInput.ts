import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';

// ユーザーからの入力を受け付ける
@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 30)
  userName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'このメールアドレスは既に使われています' })
  email: string;

  @Field()
  password: string;
}
