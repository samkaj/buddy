import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: 'buddy',
    entities: ['src/entities/**/*{.js,.ts}'],
    migrations: ['src/migrations/**/*{.js,.ts}'],
});
