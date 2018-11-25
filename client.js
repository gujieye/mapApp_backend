const RendererFactory = require('./renderer/rendererFactory')

let getTile = async function(z,x,y,options){
    let renderer = RendererFactory.getRenderer(options);
    let tile = await renderer.getTile(z,x,y);
    return tile;
}

module.exports={
    getTile
}