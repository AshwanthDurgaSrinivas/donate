const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Client } = require('pg');
const fs = require('fs');

async function initDB() {
    const dbConfig = {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
    };

    // 1. Connect to default 'postgres' database to create the target database
    const client = new Client({ ...dbConfig, database: 'postgres' });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL server.');

        // Check if database exists
        const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`);
        if (res.rowCount === 0) {
            console.log(`Creating database ${process.env.DB_NAME}...`);
            await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
            console.log('Database created successfully.');
        } else {
            console.log(`Database ${process.env.DB_NAME} already exists.`);
        }
    } catch (err) {
        console.error('Error during database creation phase:', err.message);
        console.log('Ensure your DB_USER and DB_PASSWORD in .env are correct and PostgreSQL is running.');
        process.exit(1);
    } finally {
        await client.end();
    }

    // 2. Connect to the new database to create tables
    const targetClient = new Client({ ...dbConfig, database: process.env.DB_NAME });

    try {
        await targetClient.connect();
        console.log(`Connected to ${process.env.DB_NAME}.`);

        const schemaPath = path.join(__dirname, '../../db_schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await targetClient.query(schema);
        console.log('Tables created and initialized successfully!');

    } catch (err) {
        console.error('Error during table creation phase:', err.message);
    } finally {
        await targetClient.end();
    }
}

initDB();
