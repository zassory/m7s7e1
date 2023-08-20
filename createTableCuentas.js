const {
    pool
} = require("./dataBase.js");

const query = `CREATE TABLE IF NOT EXISTS cuentas (
    "id" SERIAL,
    "nombre" VARCHAR(50) NOT NULL,
    "balance" DEC(15,2) NOT NULL,
    PRIMARY KEY("id")
)`;

const createTableCuentas = async() => {
    try{

        const res = await pool.query(query);
        console.table(res);
        console.log('Tabla cuentas creada ok');

    }catch(error){
        console.error(error);
    }
}

module.exports = { createTableCuentas }