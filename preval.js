// @flow weak
const processor = require('./processor');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function prevalI18n(options) {
    const { source, idsOnly = false, locale = 'en', platform } = options;
    const yamlFile = yaml.safeLoad(fs.readFileSync(source, 'utf8'));

    let result;
    try {
        result = processor(yamlFile, idsOnly, locale);
    } catch (e) {
        result = {};
    }

    return result;
};
