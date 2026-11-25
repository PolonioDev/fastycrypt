import { copyFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { basename, dirname, join } from 'node:path';
import { generateDtsBundle } from 'dts-bundle-generator';
import { defineConfig } from 'tsup';

const require = createRequire(import.meta.url);

const entry = {
  fastycrypt: 'src/index.ts',
  asymmetric: 'src/asymmetric.ts',
  symmetric: 'src/symmetric.ts',
  signer: 'src/signer.ts',
  types: 'src/types.ts',
  utils: 'src/utils.ts'
};

const constructorEntries = new Set([ 'asymmetric', 'symmetric', 'signer' ]);

function declareCommonJsConstructor(bundle: string): string {
  const className = /^export default class (\w+)/m.exec(bundle)?.[ 1 ];
  if (!className) throw new Error('Expected a default class in the CommonJS constructor declaration');

  return bundle
    .replace(/^export type /gm, 'type ')
    .replace(/^export default class /m, 'declare class ')
    .replace(/\nexport \{\};\s*$/, '') + `export = ${className};\n`;
}

export default defineConfig({
  entry,
  format: [ 'esm', 'cjs' ],
  platform: 'node',
  target: 'node14',
  clean: true,
  splitting: false,
  sourcemap: true,
  keepNames: true,
  // Bundle Nano ID only for CommonJS so older Node releases can load it synchronously.
  noExternal: [ /^nanoid(?:\/|$)/ ],
  esbuildOptions(options, { format }) {
    if (format === 'esm') options.external = [ ...(options.external ?? []), 'nanoid' ];
  },
  plugins: [
    {
      name: 'commonjs-constructors',
      renderChunk(code, chunk) {
        if (this.format === 'cjs' && constructorEntries.has(basename(chunk.path, '.cjs'))) {
          return { code: `${code}\nmodule.exports = module.exports.default;\n` };
        }
      }
    }
  ],
  outExtension({ format }) {
    return { js: format === 'esm' ? '.esm.js' : '.cjs' };
  },
  async onSuccess() {
    const bundles = generateDtsBundle(
      Object.values(entry).map(filePath => ({ filePath })),
      { preferredConfigPath: 'tsconfig.json' }
    );

    const nanoidDirectory = dirname(require.resolve('nanoid/package.json'));

    await Promise.all([
      ...Object.keys(entry).flatMap((name, index) => {
        const bundle = bundles[ index ];

        if (name === 'fastycrypt') {
          const namespaceImports = (extension: string) =>
            `import * as FastyCryptUtils from './utils.${extension}';\n` +
            `import * as FastyCryptTypes from './types.${extension}';\n\n`;
          return [
            writeFile('dist/fastycrypt.d.ts', namespaceImports('js') + bundle),
            writeFile('dist/fastycrypt.d.cts', namespaceImports('cjs') + bundle)
          ];
        }

        const commonJsBundle = constructorEntries.has(name) ? declareCommonJsConstructor(bundle) : bundle;
        return [
          writeFile(`dist/${name}.d.ts`, bundle),
          writeFile(`dist/${name}.d.cts`, commonJsBundle)
        ];
      }),
      copyFile(join(nanoidDirectory, 'LICENSE'), 'dist/nanoid.LICENSE')
    ]);
  }
});
