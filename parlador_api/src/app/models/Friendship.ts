import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    Index,
} from 'typeorm';


@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;
    
    @Column()
    user_id: string;

    @Column()
    friend_id: string;

    @Column({ type:'timestamptz' })
    created_at: Date;

}

export default User;
