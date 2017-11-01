// @flow weak

const getData = (ns, src, data, defLocale, idsOnly) =>
    Object.keys(src).forEach(id => {
        const v = src[id];
        const k = `${ns}.${id}`;
        let r;
        switch (true) {
            case typeof v == 'string':
                r = v;
                break;
            case typeof v == 'object' && !!v[defLocale]:
                r = v[defLocale];
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

module.exports = function processor(source, idsOnly, defLocale, skipPlatform) {
    const data = {};
    Object.keys(source).forEach(ns => {
        if (skipPlatform) {
            const platforms = source[ns];
            Object.keys(platforms).forEach(platform => {
                const locales = platforms[platform];
                getData(ns, locales, data, defLocale, idsOnly);
            });
        } else {
            getData(ns, source[ns], data, defLocale, idsOnly);
        }
    });

    return data;
};
