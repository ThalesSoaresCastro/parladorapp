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

    @Column({ type: 'timestamptz', default: null, nullable: true })
    edited_in!: Date | null

    @Column({ default: false, nullable: true })
    changed!: boolean;

    @ManyToOne(() => User, user => user.posts, { cascade: true })
    user:User;
}

export default Post
