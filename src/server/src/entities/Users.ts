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

    @Column('text', { select: false })
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
    user.email = email;
    user.username = username;
    user.password = password;
    await userRepo().save(user);
};

/** Get a user by their email */
export const getUser = async (email: string): Promise<Users | null> => {
    const user = await userRepo().findOneBy({
        email,
    });
    return user;
};

/** Get a user by their ID */
export const getUserById = async (id: string): Promise<Users | null> => {
    const user = await userRepo().findOneBy({
        id,
    });
    return user;
};

/** Get a user by their username */
export const getUserByUsername = async (
    username: string
): Promise<Users | null> => {
    const user = await userRepo().findOneBy({
        username,
    });
    return user;
};

/** Check if a user exists by their email */
export const userExists = async (email: string): Promise<boolean> => {
    const user = await userRepo().findOneBy({
        email,
    });
    if (user) return true;
    else return false;
};

/** Get a user by their email */
export const getUserByEmail = async (email: string): Promise<Users | null> => {
    const user = await userRepo().findOneBy({
        email,
    });
    return user;
};

/** Delete a user by their ID */
export const deleteUser = async (id: string) => {
    const user = await getUserById(id);
    if (user) await userRepo().remove(user);
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
    }
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
    }
};

/** Update a user's email */
export const updateEmail = async (id: string, email: string): Promise<void> => {
    const user = await getUserById(id);
    if (user) {
        user.email = email;
        await userRepo().save(user);
    }
};

/** Get a user's hashed password */
export const getHashedPassword = async (email: string): Promise<string> => {
    const res = await userRepo().query(
        'SELECT password FROM users WHERE email = $1',
        [email]
    );
    if (res.length === 0) return '';
    return res[0].password;
};
