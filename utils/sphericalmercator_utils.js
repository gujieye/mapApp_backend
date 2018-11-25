const TILE_MAX_GEOSIZE=40075017;
const BUFFER_SIZE=0;
let getXYZResolution=function(z,tile_size=256) {
    let full_resolution = TILE_MAX_GEOSIZE / tile_size;
    return full_resolution / Math.pow(2, z);
}

let getXYZExtent=function(x, y, z,resolution=4,tile_size=256){
    let initial_resolution = getXYZResolution(0);
            
    //因为web墨卡托投影的坐标范围-20037508.5至20037508.5
    let origin_shift = (initial_resolution * tile_size) / 2.0;

    //当前zoom level下的分辨率
    let pixres = initial_resolution / Math.pow(2,z);
    //瓦片实际大小
    let tile_geo_size = tile_size * pixres;

    let buffer = BUFFER_SIZE / 2;
    //x轴从左至右
    let xmin = -origin_shift + x*tile_geo_size;
    let xmax = -origin_shift + (x+1)*tile_geo_size;

    //y轴从上至下
    let ymin = origin_shift - y*tile_geo_size;
    let ymax = origin_shift - (y+1)*tile_geo_size;
    return {
        xmin: xmin,
        ymin: ymin,
        xmax: xmax,
        ymax: ymax,
        b_xmin: xmin - (pixres * buffer),
        b_ymin: ymin + (pixres * buffer),
        b_xmax: xmax + (pixres * buffer),
        b_ymax: ymax - (pixres * buffer),
        b_size: buffer / resolution
    };   
}

module.exports={
    getXYZExtent,
    getXYZResolution
}