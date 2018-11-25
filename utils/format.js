

class Format{
    //格式化sql语句取代占位符
    format(str) {
        let replacements = Array.prototype.slice.call(arguments, 1);
    
        replacements.forEach(function(attrs) {
            Object.keys(attrs).forEach(function(attr) {
                str = str.replace(new RegExp('\\{' + attr + '\\}', 'g'), attrs[attr]);
            });
        });
    
        return str;
    }

    //验证瓦片格式
    check(format){
        if(format!='png'&&format!='mvt'&&format!='utfgrid'&&format!='torque'){
            console.log('no such format')
            return;
        }
        return format;
    }
}

module.exports = new Format();
