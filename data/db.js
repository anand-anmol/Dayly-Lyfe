const mysql = require('mysql2/promise');
const pool  = mysql.createPool({
    host:       'localhost',
    user:       'root',
    database:   'myTestDb',
    password:    '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

class DB {
    DB() {
    }

    async getNotes() {
        const result = await pool.query('SELECT * FROM Notes');
        return result;
    }
}
module.exports = DB;
