///커뮤니티 subs
//포스트 post
//좋아요votes
//코멘츠
//유저

//@Entity() 데코레이터 클래스는 User클래스가 엔티티임을 나타내는데 사용됨.
//CREATE TABLE user 부분임

//@Column() 데코레이터 클래스는 User 엔터티의 email 및 username과 같은 다른 열을 나타내는데 사용됨
//@Index() 데이터베이스의 인덱스 생성, 엔터티 속성 또는 엔터티에 사용할 수 있음. 엔터티에 사용될 때 복합 열로 인덱스 생성 가능함
import { Exclude } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import Post from "./Post";
import Vote from "./Vote";
import BaseEntity from "./Entity";
@Entity("users")
export default class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." })
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습ㄴ디ㅏ." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3자 이상이어야 합니다." })
  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야합니다." })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
