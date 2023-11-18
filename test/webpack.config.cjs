const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ResolveTypeScriptPlugin = require("resolve-typescript-plugin");

const projectRoot = 'c:/projects-mono/';

const extensions = [
    '.js', '.mjs', '.cjs', 
    '.jsx', '.cjsx', '.mjsx'
];


const config = {
    entry: './src/index.ts',
    // mode: 'production',
    mode: 'development',
    target: 'node',
    devtool: 'inline-source-map',
    node: {
        global: true,
        __dirname: true,
        __filename: false
    },
    resolve: {
        extensions,
        plugins: [
            new ResolveTypeScriptPlugin({includeNodeModules: false})
        ],
        alias: {
            'flo-mat$': path.resolve(projectRoot, 'mat/src/index.ts'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    stats: {
        // Don't display most things
        all: false,
        colors: true,
        errors: true,
        builtAt: true
    },
    plugins: [
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.cjs',
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
        // library: { type: 'module' }
    },
    // experiments: { outputModule: true }
    experiments: { outputModule: false },
    // optimization: { minimize: false }
}


module.exports = [
    config
];
