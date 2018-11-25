const BaseRenderer = require('../baseRenderer')
const FormatUtils = require('../../utils/format')
const DBUtils = require('../../utils/db_utils')
const SphericalMercatorUtils = require('../../utils/sphericalmercator_utils')
/**
 * 矢量瓦片渲染引擎
 */
class MvtRenderer extends BaseRenderer{

    constructor(options){
        super(options);
        this.tileSize = options.tileSize || 256;
        this.srid = options.srid || 3857;
        this.layerName = options.layerName || 'layer0';
        this.layer_sql = options.layer_sql;
        this.geo_column = options.geo_column || 'the_geom_webmercator';
        this.mvtExtent = options.mvtExtent || 4096;
        //从pg中取出矢量瓦片的sql
        //主要逻辑是计算出每一个瓦片zxy对应的坐标范围，查询位于该范围内的几何要素，之后对所有的几何要素聚合成一张矢量瓦片
        this.sql = 'SELECT ST_AsMVT(' + 'q,' + "'{layerName}'" + ',{mvt_extent},' + "'geom'" + ') ' +
            'FROM ' +
            '(SELECT ST_AsMVTGeom(ST_RemoveRepeatedPoints(i.the_geom_webmercator,1000),st_makebox2d(' +
            'st_point({lftpx},{lftpy}),st_point({rtbtx}, {rtbty}) ' +
            '),{mvt_extent},0,false) as geom ' +
            'FROM (SELECT * from ({layer_sql}) as layersql where "the_geom_webmercator" && ST_MakeEnvelope({lftpx},' +
            ' {lftpy}, {rtbtx}, {rtbty},{srid})) as i) as q';
    }

     async getTile(z,x,y){
         //计算瓦片的地理坐标范围
        let extent = SphericalMercatorUtils.getXYZExtent(x,y,z);
        let completedSQL = FormatUtils.format(this.sql, { layerName: this.layerName }, { layer_sql: this.layer_sql, mvt_extent: this.mvtExtent, srid: this.srid }, {
            lftpx: extent.xmin,
            lftpy: extent.ymin,
            rtbtx: extent.xmax,
            rtbty: extent.ymax
        });
        let result;
        try {
            result = await DBUtils.executeSQL(completedSQL, []);
        } catch (error) {
            console.log('error',error);
            return;
        }

        return result.rows[0].st_asmvt;


    }
}

module.exports=MvtRenderer;