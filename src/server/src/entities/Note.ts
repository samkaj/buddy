import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Users)
    @JoinColumn()
    owner: Users;

    @Column()
    title: string;

    @Column()
    markdown: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
