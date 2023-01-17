import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';
import { Note } from './Note';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('varchar', { length: 265 })
    email: string;

    @Column({ length: 40 })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(() => Note, (note) => note.owner)
    notes: Note[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
