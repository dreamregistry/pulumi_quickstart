import {babel} from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'index.ts',
    output: {
        dir: 'bin',
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        commonjs(),
        json(),
        babel({
            babelHelpers: 'bundled',
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx']}),
        nodeResolve(),
    ]
};
