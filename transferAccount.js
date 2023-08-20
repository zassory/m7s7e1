const { pool } = require("./dataBase.js");

//Funcion para hacer una transferencia

const transferAccount = async () => {
    const [idClienteA , idClienteB, mont] = process.argv.slice(2);

    await pool.connect();
    try{
        //Inicio de la transacción
        await pool.query('BEGIN');
        try{

            const { rows } = await pool.query('SELECT * FROM "cuentas" WHERE "id" = $1',[idClienteA]);
            const balance = rows[0].balance;

            //Verificamos si la cuenta posee balance, caso contrario no realizamos la actual
            if(balance >= mont){
                await pool.query('UPDATE "cuentas" SET "balance" = "balance" - $1 WHERE "id" = $2',[mont,idClienteA]);

                await pool.query('UPDATE "cuentas" SET "balance" = "balance" + $1 WHERE "id" = $2',[mont,idClienteB]);

                console.log(`Transferencia realizada del cliente con id: ${idClienteA} al cliente con id: ${idClienteB} por un monto de: ${mont}`)
            }else{
                console.log("Balance insuficiente");
            }
            await pool.query('COMMIT');
        }catch(error){
            // Si existe un error, revertir todos los cambios hasta el punto del inicio de la transaccion
            await pool.query('ROLLBACK');
            console.error(error);
        }
    } finally{
        pool.end(); // Finaliza la conexión
    }
}

//Llamamos a la función haciendo uso de: node transferAccount.js 1 2 1000
module.exports = { transferAccount };