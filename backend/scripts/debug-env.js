const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD ? '***' : 'MISSING',
    port: process.env.DB_PORT || 5432
};
console.log('Database Config loaded:', dbConfig);
console.log('Environment variables check:');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('CWD:', process.cwd());
console.log('__dirname:', __dirname);
