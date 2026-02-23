const { Client } = require('pg');
const passwords = ['spa', 'postgres', 'root', 'password', 'admin123', ''];
const targetUser = 'spa';
const targetPass = 'spa';
const targetDb = 'punarvika_db';

async function setupDb() {
    for (const pw of passwords) {
        console.log(`Trying postgres password: "${pw}"`);
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: pw,
            port: 5432,
        });

        try {
            await client.connect();
            console.log(`SUCCESS: Connected as postgres with password "${pw}"`);

            // Create target user
            try {
                await client.query(`CREATE USER ${targetUser} WITH PASSWORD '${targetPass}'`);
                await client.query(`ALTER USER ${targetUser} WITH SUPERUSER`); // Temporary superuser for setup
                console.log(`User ${targetUser} created/updated.`);
            } catch (e) {
                if (e.code === '42710') {
                    console.log(`User ${targetUser} already exists, updating password.`);
                    await client.query(`ALTER USER ${targetUser} WITH PASSWORD '${targetPass}'`);
                } else {
                    console.error('Error creating user:', e.message);
                }
            }

            // Create target database
            try {
                await client.query(`CREATE DATABASE ${targetDb} OWNER ${targetUser}`);
                console.log(`Database ${targetDb} created.`);
            } catch (e) {
                if (e.code === '42P04') {
                    console.log(`Database ${targetDb} already exists.`);
                } else {
                    console.error('Error creating database:', e.message);
                }
            }

            await client.end();
            return true;
        } catch (err) {
            console.log(`FAILED: ${err.message}`);
        }
    }
    return false;
}

setupDb().then(success => {
    if (success) {
        process.exit(0);
    } else {
        process.exit(1);
    }
});
