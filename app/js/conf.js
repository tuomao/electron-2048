
var fs=require('fs');
var path=require('path');
var CONF=JSON.parse(fs.readFileSync('app/conf.json'));

function read_conf(name){
    return CONF[name];
}

exports.read_conf=read_conf;

