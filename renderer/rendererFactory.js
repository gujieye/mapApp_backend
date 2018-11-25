const PngFactory = require('./png/factory');
const MvtFactory = require('./mvt/factory');
const UTFGridFactory = require('./utfgrid/factory');

class RendererFactory{

    constructor(){
        this.factories={
            'PNG':new MvtFactory(),
            'Mvt':new MvtFactory(),
            'UTFGrid':new MvtFactory()
        }
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new RendererFactory();
        }
        return this.instance;
    }

    static getRenderer(options){
        let format = options.format || 'PNG';
        return RendererFactory.getInstance().factories[format].getRenderer(options);
    }

}

module.exports = RendererFactory;