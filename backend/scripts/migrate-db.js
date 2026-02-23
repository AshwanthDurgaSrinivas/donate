const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../config/db');
const fs = require('fs');

async function applyMigration() {
    try {
        console.log('Starting migration...');

        // Add websites_sold to stats if it doesn't exist
        await db.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='stats' AND column_name='websites_sold') THEN
                    ALTER TABLE stats ADD COLUMN websites_sold INT DEFAULT 0;
                END IF;
            END $$;
        `);
        console.log('Stats table updated.');

        // Create website_leads if it doesn't exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS website_leads (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                mobile TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT,
                status TEXT DEFAULT 'pending',
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `);
        console.log('Website leads table created/verified.');

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

applyMigration();
