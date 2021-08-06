import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    Index,
    ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('posts')
class Post {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    text_post: string;

    @Column({ type:'timestamptz' })
    created_at: Date;

    
    @ManyToOne(()=>User, user => user.posts)
    user:User;    

}

export default Post;
