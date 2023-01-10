import { load } from 'ts-dotenv';
import 'reflect-metadata';
export const env = load({
    POSTGRES_USER: String,
    POSTGRES_PASS: String,
});
