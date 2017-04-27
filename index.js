const yaml = require('js-yaml');
// const getOptions = require('loader-utils').getOptions;

module.exports = function i18nYmlLoader(source, map, isTest) {
    var loader = this;

    var filename = loader.resourcePath;

    const yamlFile = yaml.safeLoad(source, {
        filename: filename,
        onWarning: function emitLoaderWarning(error) {
            loader.emitWarning(error.toString());
        }
    });
    // var options = getOptions(loader) || {};
    // var debug = 'debug' in options ? options.debug : loader.debug || false;

    const data = {}
    //     locale: 'en',
    //     messages: {}
    // };
    Object.keys(yamlFile).forEach(ns => {
        Object.keys(yamlFile[ns]).forEach(id => {
            const v = yamlFile[ns][id];
            const k = `${ns}.${id}`;
            let r;
            switch (true) {
                case typeof(v) == 'string':
                    r = v;
                    break;
                case typeof(v) == 'object' && v.en:
                    r = v.en;
                    break;
                default:
                    r = null;
            }
            if (r) {
                data[id] = {
                    id: k,
                    defaultMessage: r
                }
            }
        })
    })

    var result;
    try {
        result = JSON.stringify(data, null, '\t');
    } catch (ex) {
        result = JSON.stringify({
            exception: ex,
            error: ex.message,
            filename: filename
        });
        loader.emitError(
            [
                'Failed to stringify yaml from file ',
                filename,
                '! Message: ',
                ex.message,
                ' Stack: \n',
                ex.stack
            ].join('"')
        );
    }
    return 'module.exports = ' + result + ';';
};
