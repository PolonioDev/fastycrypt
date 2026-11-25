import { writeFile } from 'node:fs/promises';
import { generateDtsBundle } from 'dts-bundle-generator';
import { defineConfig } from 'tsup';

const entry = {
  fastycrypt: 'src/index.ts',
  asymmetric: 'src/asymmetric.ts',
  symmetric: 'src/symmetric.ts',
  signer: 'src/signer.ts',
  types: 'src/types.ts',
  utils: 'src/utils.ts'
};

export default defineConfig({
  entry,
  format: [ 'esm', 'cjs' ],
  platform: 'node',
  target: 'node14',
  clean: true,
  splitting: false,
  sourcemap: true,
  keepNames: true,
  outExtension({ format }) {
    return { js: format === 'esm' ? '.esm.js' : '.cjs.development.js' };
  },
  async onSuccess() {
    // Keep the bundled declarations and filenames used by the published API.
    const bundles = generateDtsBundle(
      Object.values(entry).map(filePath => ({ filePath })),
      { preferredConfigPath: 'tsconfig.json' }
    );

    await Promise.all(Object.keys(entry).map((name, index) => writeFile(`dist/${name}.d.ts`, bundles[ index ])));
  }
});
