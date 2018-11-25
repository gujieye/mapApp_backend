'use strict'
const opt = require('./common/options')
module.exports = (sequelize,DataType)=>{
    const model = {
        dirhash:{
            type: DataType.BIGINT,
            field: 'dirhash',
            allowNull: false,
            primaryKey: true
        },
        name:{
            type:DataType.STRING(1000),
            field:'name',
            allowNull: false
        },
        directory:{
            type:DataType.STRING(4096),
            field:'directory'
        },
        meta:{
            type:DataType.BLOB,
            field:'meta'
        }
    }

    return sequelize.define('filemeta',model,opt)
}