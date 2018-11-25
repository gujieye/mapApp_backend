/**
 * 渲染引擎基类
 */
class BaseRenderer {

    constructor(options) {
        this.options = options || {};
        this.uid = this.options.uid || '';
        this.layerId = this.options.layerId || '0';
        this.retina = this.options.retina || '@1x';
        this.format = this.options.format || 'png';
    }

    getFormat(){
        return this.format;
    }

}

module.exports = BaseRenderer;