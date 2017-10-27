const yaml = require('js-yaml');
const getOptions = require('loader-utils').getOptions;

module.exports = function i18nYmlLoader(source, map) {
    const getData = (ns, src, data) =>
        Object.keys(src).forEach(id => {
            const v = src[id];
            const k = `${ns}.${id}`;
            let r;
            switch (true) {
                case typeof v == 'string':
                    r = v;
                    break;
                case typeof v == 'object' && !!v[locale]:
                    r = v[locale];
                    break;
                default:
                    r = null;
            }
            if (r) {
                data[id] = idsOnly
                    ? {
                          id: k
                      }
                    : {
                          id: k,
                          defaultMessage: r
                      };
            }
        });

    var loader = this;

    var filename = loader.resourcePath;

    const yamlFile = yaml.safeLoad(source, {
        filename: filename,
        onWarning: function emitLoaderWarning(error) {
            loader.emitWarning(error.toString());
        }
    });
    var options = getOptions(loader) || {};
    var idsOnly = ('IDsOnly' in options ? options.IDsOnly : loader.IDsOnly) || false;
    var locale = ('defLocale' in options ? options.defLocale : loader.defLocale) || 'en';
    var skipPlatform = 'skipPlatform' in options ? true : false;
    // var debug = 'debug' in options ? options.debug : loader.debug || false;

    const data = {};
    Object.keys(yamlFile).forEach(ns => {
        if (skipPlatform) {
            const platforms = yamlFile[ns];
            Object.keys(platforms).forEach(platform => {
                const locales = platforms[platform];
                getData(ns, locales, data);
            });
        } else {
            getData(ns, yamlFile[ns], data);
        }
    });

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
            ['Failed to stringify yaml from file ', filename, '! Message: ', ex.message, ' Stack: \n', ex.stack].join(
                '"'
            )
        );
    }
    return 'module.exports = ' + result + ';';
};
