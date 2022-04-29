export default [
  {
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions: {
      external: ['./src/*']
    }, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
  {
    input: './src/asymmetric.ts',
    name: 'asymmetric',
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions: {
      external: ['./src/*']
    }, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
  {
    input: './src/symmetric.ts',
    name: 'symmetric',
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions: {
      external: ['./src/*']
    }, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
  {
    input: './src/signer.ts',
    name: 'signer',
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions: {
      external: ['./src/*']
    }, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
  {
    input: './src/types.ts',
    name: 'types',
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions:{}, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
  {
    input: './src/utils.ts',
    name: 'utils',
    format: ['cjs', 'esm'], // will generate multiple outputs: one for cjs and one for esm
    cjsMode: 'development', // will generate separate files for development and production
    outdir: 'dist', // default output directory
    declaration: 'bundle', // will bundle declarations using https://github.com/timocov/dts-bundle-generator
    externalNodeModules: true, // automatically will mark all node_modules as external
    tsconfig: 'tsconfig.json', // default path to tsconfig
    incremental: true, // will build incrementally
    buildOptions:{}, // custom esbuild options
    watchOptions: {
      // chokidar watch options
      ignored: ['node_modules/**', 'dist/**', 'build/**', 'out/**'], // by default, will ignore those folders
      followSymlinks: false, // will not follow symlinks
    },
  },
]
