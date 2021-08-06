/* eslint-disable camelcase */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm'

import User from '@models/User'

@Entity('posts')
class Post {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    text_post: string;

    @Column({ type: 'timestamptz' })
    created_at: Date;

    @ManyToOne(() => User, user => user.posts)
    user:User;
}

export default Post
