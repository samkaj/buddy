require('dotenv').config();
import 'reflect-metadata';

import { PostgresDataSource } from './data-source';

PostgresDataSource.initialize()
    .then(() => {
        // Database stuff happens here.
    })
    .catch((error) => console.log(error));
