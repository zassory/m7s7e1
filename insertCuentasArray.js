const {
    pool
} = require("./dataBase.js");

const format = require('pg-format');

const registros = [
    ['jose',1000],
    ['pedro',2000],
    ['maria',3000],
    ['antonny',4000],
    ['marcos',5000],
    ['juan',6000],
    ['william',7000],
    ['miguel',8000],
    ['alberto',9000],
    ['carlos',10000],
    ['carolina',11000],
    ['julian',12000],
    ['fernanda',13000]
];

const insertsCuentas = async() => {
    try{

        const result = await pool.query(format("INSERT INTO cuentas (nombre,balance) VALUES %L",registros));
        if(result.err){
            console.log(result.err);
            return result.err;
        }
        console.log(`Se ejecuto el comando: ${result.command} con ${result.rowCount} inserciones`);
        console.table(registros);

    }catch(error){
        console.error(error);
    }
}

module.exports = { insertsCuentas }