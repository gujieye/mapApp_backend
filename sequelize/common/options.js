'use strict'

const opt =  (tableName) => {
    return {
        // 不添加默认字段 (updatedAt, createdAt)
        timestamps: false,
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: false,

        //不允许编辑表名
        freezeTableName: true,

        //映射表名
        tableName:tableName
    }
};

module.exports = opt();