require('dotenv').config();
import { DataSource } from 'typeorm';

const psqlDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: 'buddy',
    synchronize: true,
    entities: ['src/entities/**/*{.js,.ts}'],
    migrations: ['src/migrations/**/*{.js,.ts}'],
});

export default psqlDataSource;
