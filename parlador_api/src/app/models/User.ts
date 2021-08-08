/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm'

import bcrypt from 'bcryptjs'

import Post from '@models/Post'

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @BeforeInsert()
    @BeforeUpdate()
    hasPassword () {
      this.password = bcrypt.hashSync(this.password, 8)
    }

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @Column({ type: 'timestamptz', default: null, nullable: true })
    edited_in!: Date | null;

    @OneToMany(() => Post, post => post.user, { eager: true })
    posts: Post[];
}

export default User
