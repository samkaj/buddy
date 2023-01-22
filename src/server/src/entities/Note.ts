import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import psqlDataSource from '../data-source';

@Entity()
export class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    @JoinColumn()
    owner: User;

    @Column()
    title: string;

    @Column()
    markdown: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

const noteRepo = psqlDataSource.getRepository(Note);

/** Create a new note */
export const newNote = async (owner: User, title: string, markdown: string) => {
    const note = new Note();
    note.owner = owner;
    note.title = title;
    note.markdown = markdown;
    await noteRepo.save(note);
};

/** Get a note by its ID */
export const getNote = async (id: string): Promise<Note | null> => {
    return await noteRepo.findOneBy({ id });
};

/** Get all notes by a user */
export const getNotesByUser = async (user: User): Promise<Note[]> => {
    return await noteRepo.find({
        relations: {
            owner: true,
        },
        where: {
            owner: {
                id: user.id,
            },
        },
    });
};

/** Set a note's title */
export const setNoteTitle = async (
    note: Note,
    title: string
): Promise<void> => {
    note.title = title;
    await noteRepo.save(note);
};

/** Set a note's markdown */
export const setNoteMarkdown = async (
    note: Note,
    markdown: string
): Promise<void> => {
    note.markdown = markdown;
    await noteRepo.save(note);
};

/** Delete a note */
export const deleteNote = async (note: Note): Promise<void> => {
    const exists = (await getNote(note.id)) != null; // Check if the note exists
    if (exists) await noteRepo.remove(note);
};
