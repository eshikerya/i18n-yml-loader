const p = require('../processor');
const fs = require('fs');
const yaml = require('js-yaml');
const { resolve } = require('path');

const source = yaml.safeLoad(fs.readFileSync('./test/test_platforms.i18n.yml'));

const sourceNoPlatforms = yaml.safeLoad(fs.readFileSync('./test/test.i18n.yml'));

describe('processor', () => {
    describe('platforms processing', () => {
        it('should return ids for mobile', () => {
            expect(p(source, 'mobile', true, 'en')).toEqual({
                another_title: { id: 'app.component.another_title' },
                result_message: { id: 'app.component.result_message' }
            });
        });
        it('should return ids for mobile and common', () => {
            expect(p(source, ['common', 'mobile'], true, 'en')).toEqual({
                title: {id: 'app.component.title'},
                another_title: { id: 'app.component.another_title' },
                result_message: { id: 'app.component.result_message' }
            });
        });
        it('should return ids for web', () => {
            expect(p(source, 'web', true, 'en')).toEqual({
                another_title: { id: 'app.component.another_title' },
                title: {id: 'app.component.title'}
            });
        })
        it('should return ids for web and common', () => {
            expect(p(source, ['common', 'web'], true, 'en')).toEqual({
                title: {id: 'app.component.title'},
                another_title: { id: 'app.component.another_title' },
            });
        });
        it('should return ids for all platforms', () => {
            expect(p(source, false, true, 'en', true)).toEqual({
                title: {id: 'app.component.title'},
                another_title: { id: 'app.component.another_title' },
                result_message: { id: 'app.component.result_message' }
            })
        })
        it('should overwrite common by platform data', () => {
            expect(p(source, ['common', 'web'], false, 'en')).toEqual({
                title: {id: 'app.component.title', defaultMessage: 'overriden title'},
                another_title: { id: 'app.component.another_title', defaultMessage: 'test title for en - web' },
            })
            expect(p(source, ['common', 'web'], false, 'ru')).toEqual({
                title: {id: 'app.component.title', defaultMessage: 'overriden title'},
                another_title: { id: 'app.component.another_title', defaultMessage: 'test title for ru - web' },
            })
        })
        it('should return empty for unspecified platform', () => {
            expect(p(source, 'test', true, 'en')).toEqual({})
        })
        it('should return empty for list of unspecified platform', () => {
            expect(p(source, ['test1','test'], true, 'en')).toEqual({})
        })
        it('should return skip for unspecified platform', () => {
            expect(p(source, ['common','test'], true, 'en')).toEqual({
                title: {id: 'app.component.title'}
            })
        })
    })
});
