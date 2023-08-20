const { Pool } = require("pg");

const pool = new Pool({
    user: 'zasory',
    host: 'localhost',
    database: 'practica_db',
    password: 'Hakxf2n5$',
    port: 5432,
});

module.exports = {
    pool
}