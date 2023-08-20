const { pool } = require("./dataBase.js");

const getUsers = async() => {
    const [idClienteA, idClienteB] = process.argv.slice(2);

    try{

        const res = await pool.query('SELECT * FROM "cuentas" WHERE "id" = $1 OR "id" = $2',
        [idClienteA,idClienteB])
        console.table(res.rows);
    }catch(error){
        console.error(error);
    }
}

module.exports = { getUsers }