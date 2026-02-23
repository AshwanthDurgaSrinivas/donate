const { Client } = require('pg');
const passwords = ['spa', 'punarvika', 'punarvira', 'punarvika_admin_2024', 'admin123', 'password', 'root', '123456'];
const user = 'spa';
const database = 'punarvika_db';

async function testPasswords() {
    for (const pw of passwords) {
        const client = new Client({
            user: user,
            host: 'localhost',
            database: database,
            password: pw,
            port: 5432,
        });
        try {
            await client.connect();
            console.log(`SUCCESS: Password for ${user} is "${pw}"`);
            await client.end();
            return;
        } catch (err) {
            console.log(`FAILED: Password "${pw}" - ${err.message}`);
        }
    }
}

testPasswords();
