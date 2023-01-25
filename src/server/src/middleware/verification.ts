import { getUserByUsername, getUserByEmail } from '../entities/Users';

/**
 * Check if the username is unqiue in the database
 * @param username the username to check
 * @returns true if the username is unique, false otherwise
 */
export const isUsernameUnique = async (username: string): Promise<boolean> => {
    const user = await getUserByUsername(username);
    return user ? false : true;
};

/**
 * Check if the email is unqiue in the database
 * @param email the email to check
 * @returns true if the email is unique, false otherwise
 */
export const isEmailUnique = async (email: string): Promise<boolean> => {
    const user = await getUserByEmail(email);
    return user ? false : true;
};
