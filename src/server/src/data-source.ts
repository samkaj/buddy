import { DataSource } from 'typeorm';
import { env } from './index';

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASS,
});
