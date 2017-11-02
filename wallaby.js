module.exports = wallaby => {
    process.env.NODE_ENV = 'test';
    process.env.BABEL_ENV = 'test';

    return {
        files: [
            { pattern: './{index,loader,processor}.js', load: false },
            { pattern: './test/*.i18n.yml', load: false },
            { pattern: '!node_modules', load: false }
        ],

        tests: ['./test/*.spec.js'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'
        // compilers: {
        //     '**/*.js': wallaby.compilers.babel({
        //         ...require('./package.json').babelConfig.web,
        //         babelrc: false
        //     })
        // },
        // debug: false
        // setup: function(wallaby) {
        //     var jestConfig = require('./package.json').jest;
        //     jestConfig.globals = { __DEV__: true };
        //     wallaby.testFramework.configure(jestConfig);
        // }
    };
};
// var wallabyWebpack = require('wallaby-webpack');
//
// module.exports = function(wallaby) {
//     var webpackPostprocessor = wallabyWebpack({
//         // webpack options
//         resolve: {
//             extensions: ['.js']
//         }
//     });
//
//     return {
//         files: [{ pattern: 'src/**/*.js', load: false }],
//
//         tests: [{ pattern: 'test/**/*.spec.js', load: false }],
//
//         compilers: {
//             '**/*.js': wallaby.compilers.babel()
//         },
//
//         postprocessor: webpackPostprocessor,
//
//         setup: function() {
//             window.__moduleBundler.loadTests();
//         }
//     };
// };
