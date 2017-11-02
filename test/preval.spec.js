const proc = require('../index');

const sourceFilename = './test/test_platforms.i18n.yml';
const sourceNoPlatforms = './test/test.i18n.yml';

const opts = {
    source: sourceFilename,
    platform: false,
    IDsOnly: true,
    defLocale: 'en',
    skipPlatforms: false
};

describe('preval processing', () => {
    it('should return ids for mobile', () => {
        expect(proc({ ...opts, platform: 'mobile' })).toEqual({
            another_title: { id: 'app.component.another_title' },
            result_message: { id: 'app.component.result_message' }
        });
    });
});
