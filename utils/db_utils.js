const pg = require('pg')
const config = require('../config')

const pool = new pg.Pool(config.db);

pool.on('error', (err, client) => {
    console.log('数据库连接异常', err);
})

let executeSQL = async function (sql,params) {
    let client, result;
    params=params||[];
    try {
        client = await pool.connect();  
        result = await client.query(sql,params);
    } catch (error) {
        throw error;
    } finally {
        if (client){
            client.release();
        }
           
    }
    
    if (result) {
        return result;
    }
    return null;
}


module.exports={
    executeSQL
}