import typescript from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: {
    format: 'cjs',
    file: './dist/index.js',
  },
  plugins: [
    typescript({
      typescript: require('ttypescript'),
      tsconfigDefaults: {
        compilerOptions: {
          plugins: [
            {transform: 'typescript-transform-paths'},
            {transform: 'typescript-transform-paths', afterDeclarations: true},
          ],
        },
      },
    }),
  ],
}
