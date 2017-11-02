// @flow weak

const getData = (ns, src, data, platform, defLocale, idsOnly) => {
    for (const [id, v] of Object.entries(src)) {
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
            data[platform][id] = idsOnly
                ? {
                      id: k
                  }
                : {
                      id: k,
                      defaultMessage: r
                  };
        }
    }
};

module.exports = function processor(source, reqPlatform, idsOnly, defLocale, skipPlatforms) {
    const data = {};
    for (const [ns, platforms] of Object.entries(source)) {
        for (const [platform, locales] of Object.entries(platforms)) {
            !data[platform] && (data[platform] = {});
            getData(ns, locales, data, platform, defLocale, idsOnly);
        }
    }

    if (Array.isArray(reqPlatform)) {
        let r = {};
        reqPlatform.forEach(platform => {
            r = { ...r, ...(data[platform] || {}) };
        });
        return r;
    } else if (typeof reqPlatform == 'string') {
        return data[reqPlatform] || {};
    } else if (skipPlatforms) {
        let r = {};
        for (const [platform, pdata] of Object.entries(data)) {
            r = { ...r, ...data[platform] };
        }
        return r;
    }
};
