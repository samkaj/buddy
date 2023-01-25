import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    Repository,
    Unique,
    UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';
import psqlDataSource from '../data-source';
import { Note } from './Note';

@Unique(['email', 'username'])
@Entity()
export class Users {
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

const userRepo = (): Repository<Users> => psqlDataSource.getRepository(Users);

/** Create a new user */
export const newUser = async (
    email: string,
    username: string,
    password: string
): Promise<void> => {
    const user = new Users();
    console.log('new user');
    user.email = email;
    user.username = username;
    user.password = password;
    await userRepo().save(user);
};

/** Get a user by their email */
export const getUser = async (email: string): Promise<Users | null> => {
    return await userRepo().findOneBy({
        email,
    });
};

/** Get a user by their ID */
export const getUserById = async (id: string): Promise<Users | null> => {
    return await userRepo().findOneBy({
        id,
    });
};

/** Get a user by their username */
export const getUserByUsername = async (
    username: string
): Promise<Users | null> => {
    return await userRepo().findOneBy({
        username,
    });
};

/** Get a user by their email */
export const getUserByEmail = async (email: string): Promise<Users | null> => {
    return await userRepo().findOneBy({
        email,
    });
};

/** Delete a user by their ID */
export const deleteUser = async (id: string) => {
    const user = await getUserById(id);
    if (user) await userRepo().remove(user);
    else throw new Error('User not found');
};

/** Update a user's password */
export const updatePassword = async (
    id: string,
    password: string
): Promise<void> => {
    const user = await getUserById(id);
    if (user) {
        user.password = password;
        await userRepo().save(user);
    } else throw new Error('User not found');
};

/** Update a user's username */
export const updateUsername = async (
    id: string,
    username: string
): Promise<void> => {
    const user = await getUserById(id);
    if (user) {
        user.username = username;
        await userRepo().save(user);
    } else throw new Error('User not found');
};