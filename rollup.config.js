import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/mytime.esm.js',
      format: 'esm',
      sourcemap: true
    },
    {
      file: 'dist/mytime.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'auto'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true
    })
  ],
  external: []
};