const MvtRenderer = require('./renderer')
/**
 * postgresql矢量瓦片渲染引擎工厂
 */
class MvtFactory{

    constructor(){}

    getRenderer(options){
        let uid =options.uid;
        let layerId = options.layerId;
        let layer_sql = 'select * from data.t_6b63b32ba9444fa99545e2b18ad65544'
        return new MvtRenderer({
            layer_sql:layer_sql
        })
    }
}

module.exports = MvtFactory;