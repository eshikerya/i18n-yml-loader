// @flow weak
//
const yaml = require('js-yaml');
const getOptions = require('loader-utils').getOptions;
const processor = require('./processor');

module.exports = function i18nYmlLoader(source, map) {
    const loader = this;

    const filename = loader.resourcePath;

    const yamlFile = yaml.safeLoad(source, {
        filename: filename,
        onWarning: function emitLoaderWarning(error) {
            loader.emitWarning(error.toString());
        }
    });
    const options = getOptions(loader) || {};

    const idsOnly = ('IDsOnly' in options ? options.IDsOnly : loader.IDsOnly) || false;
    const defLocale = ('defLocale' in options ? options.defLocale : loader.defLocale) || 'en';
    const skipPlatform = 'skipPlatform' in options ? true : false;
    // var debug = 'debug' in options ? options.debug : loader.debug || false;

    let result;
    try {
        result = JSON.stringify(processor(yamlFile, idsOnly, defLocale, skipPlatform), null, '\t');
    } catch (ex) {
        result = JSON.stringify({
            exception: ex,
            error: ex.message,
            filename: filename
        });
        loader.emitError(
            ['Failed to stringify yaml from file ', filename, '! Message: ', ex.message, ' Stack: \n', ex.stack].join(
                '"'
            )
        );
    }
    return 'module.exports = ' + result + ';';
};
