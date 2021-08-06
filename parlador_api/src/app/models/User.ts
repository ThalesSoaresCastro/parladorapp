import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    Index,
    OneToMany,
} from 'typeorm';

import bcrypt from 'bcryptjs';

import Post from './Post';

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
    hasPassword(){
        this.password = bcrypt.hashSync(this.password, 8);
    }

    @Column({ type:'timestamptz' })
    created_at: Date;

    @OneToMany(()=> Post, post => post.user)
    posts: Post[];
}

export default User;
