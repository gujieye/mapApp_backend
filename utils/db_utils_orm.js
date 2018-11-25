const Sequelize = require('sequelize');
const model = require('../sequelize')
const dbConfig = require('../config').dbConfig
const sequelize = new Sequelize(dbConfig.dbname,dbConfig.user,dbConfig.password,{
    host:dbConfig.host,
    port:dbConfig.port,
    dialect:dbConfig.dialect,
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

let getTable =  async function(tableName){
    let table = model[tableName](sequelize,Sequelize);
    await table.sync();
    return table;
}

module.exports={
    getTable
}