const fs = require('fs');
const loader = require('./index.js');
const filename = './test_platforms.i18n.yml';

function OpObj(fn) {
    this.filename = fn;
    this.query = {
        skipPlatform: true
    };
    this.IDsOnly = true;
}
OpObj.prototype.filename = '';
OpObj.prototype.query = {};

const instance = new OpObj(filename);

console.log(loader.call(instance, fs.readFileSync(filename)));
