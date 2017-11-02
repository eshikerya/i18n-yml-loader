const loader = require('../loader');
const fs = require('fs');

function OpObj(fn, opts) {
    this.filename = fn;
    this.query = opts;
    // this.IDsOnly = true;
}
OpObj.prototype.filename = '';
OpObj.prototype.query = {};

const sfile = fs.readFileSync(sourceFilename);
const sourceFilename = './test/test_platforms.i18n.yml';
const sourceNoPlatforms = './test/test.i18n.yml';

describe('webpack loader', () => {
    it('should return ids for mobile', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: 'mobile',
            IDsOnly: true,
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    another_title: { id: 'app.component.another_title' },
                    result_message: { id: 'app.component.result_message' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should return ids for mobile and common', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: ['common', 'mobile'],
            IDsOnly: true,
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title' },
                    another_title: { id: 'app.component.another_title' },
                    result_message: { id: 'app.component.result_message' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should return ids for web', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: 'web',
            IDsOnly: true,
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title' },
                    another_title: { id: 'app.component.another_title' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should return ids for web and common', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: ['common', 'web'],
            IDsOnly: true,
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title' },
                    another_title: { id: 'app.component.another_title' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should return ids for all platforms', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            IDsOnly: true,
            defLocale: 'en',
            skipPlatform: true
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title' },
                    another_title: { id: 'app.component.another_title' },
                    result_message: { id: 'app.component.result_message' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should overwrite common by platform data', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: ['common', 'web'],
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title', defaultMessage: 'overriden title' },
                    another_title: { id: 'app.component.another_title', defaultMessage: 'test title for en - web' }
                },
                'null',
                '\t'
            )};`
        );
        inst.query.defLocale = 'ru';
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title', defaultMessage: 'overriden title' },
                    another_title: { id: 'app.component.another_title', defaultMessage: 'test title for ru - web' }
                },
                'null',
                '\t'
            )};`
        );
    });
    it('should return empty for unspecified platform', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: 'test',
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(`module.exports = ${JSON.stringify({}, null, '\t')};`);
    });
    it('should return empty for list of unspecified platform', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: ['test1', 'test'],
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(`module.exports = ${JSON.stringify({}, null, '\t')};`);
    });
    it('should return skip for unspecified platform', () => {
        const inst = new OpObj(sourceFilename, {
            filename: sourceFilename,
            reqPlatform: ['common', 'test'],
            IDsOnly: true,
            defLocale: 'en'
        });
        expect(loader.call(inst, sfile)).toEqual(
            `module.exports = ${JSON.stringify(
                {
                    title: { id: 'app.component.title' }
                },
                'null',
                '\t'
            )};`
        );
    });
});
