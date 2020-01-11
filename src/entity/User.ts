import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
// テーブル作成、親クラスとしてBaseEntityを拡張
// ObjectTypeを使うことで、grahpqlにクラスをマークしている
@ObjectType()
@Entity()
export class User extends BaseEntity {
  // idをDB側で自動生成される主キーとして設定、number型からID型へ変換し、uuidで保存する
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Field()
  @Column()
  userName: string;
  // 列タイプをtextとし、一意であることをtrueにする
  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;
}
