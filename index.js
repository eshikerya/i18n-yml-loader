// @flow weak
const processor = require('./processor');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function prevalI18n(options) {
    const { source, content, IDsOnly = false, defLocale = 'en', platform, skipPlatform = false } = options;
    const yamlFile = source && !content ? yaml.safeLoad(fs.readFileSync(source, 'utf8')) : content;

    // return `module.exports = ${JSON.stringify(
    //     processor(yamlFile, reqPlatform, IDsOnly, defLocale, skipPlatform),
    //     null,
    //     '\t'
    // )}`;
    return processor(yamlFile, platform, IDsOnly, defLocale, skipPlatform);
};
