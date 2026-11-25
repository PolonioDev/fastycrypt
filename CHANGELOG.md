# FASTYCRYPT CHANGELOG

[Español](CHANGELOG_es.md)

## Release 1.1.5 (Unreleased)

### Breaking changes for TypeScript consumers

- `decrypt()` (symmetric and asymmetric), `ephemeralDecrypt()`, `read()`, `readAnyway()`, and `utils.Uint8ToObject()` now return `unknown` instead of `any`. Narrow the decoded value or assert its type before accessing its properties. The runtime values and ciphertext format are unchanged.

### Security

- Removed the unused production dependency `got` and the development tools `np`, `lint-staged`, and Size Limit. Removed their related scripts and configuration.
- Configured pnpm to resolve tsup's esbuild dependency to a patched version. The updated lockfile resolves `esbuild` to `0.28.2`.

### Development

- Migrated the 13 existing tests from Mocha and Chai to Vitest, including watch mode and V8 coverage.
- Replaced Aqu with tsup for builds and watch mode. The build retains the existing ESM and CommonJS entry paths and output filenames, and generates TypeScript declarations.
- Added an explicit ESLint configuration for the library and tests so linting can run independently of Aqu.
- Removed Aqu and its Jest and Babel Core dependency paths from the Yarn lockfile. The npm advisory comparison found 37 package and advisory matches before this step and 23 afterward.
- Replaced the Yarn lockfile with a pnpm lockfile and workspace configuration. GitHub Actions uses pnpm for frozen installs, Vitest coverage, and builds on Node.js 22 and 24.
- Updated `@types/node` to 22.x to satisfy the Vite and Vitest peer requirements.
- Standardized formatting across the source, tests, and configuration. ESLint also checks tooling files and enforces LF line endings. TypeScript checks for consistent casing in import paths.

---
## **Release 1.1.4**:  *Maintenance Update*
### **User Features**
1. **Padding customization**: It is now possible to customize the padding for encryption methods *(Asymmetric and Symmetric)*.
2. **readAnyway**: It is now possible to read a signed document without verifying if the author is legitimate. *(Signer)*.

### **Development Features**
1. We have migrated from Jest to Mocha Unit Test System.
2. Corrected spelling errors.
3. GitHub reference is now in the package.json
4. changelog.md file started.
5. The methods are optimized to reduce their complexity and some were segmented into other more specific and simpler methods.
6. Issues on GitHub are enabled now, give me your feedback.

### **Internal Features**
1. **createPadding**'s method has been created in **./src/utils.ts**
2. **setupNanoid**'s method has been created in **./src/utils.ts**
3. **segmentDocument**'s method has been created in **./src/utils.ts**
4. **Uint8From**'s method has been created in **./src/utils.ts**
5. New FastyCrypt Type: **IPaddingSettings**
6. New FastyCrypt Type: **IDocumentSegment**
7. New FastyCrypt Type: **IPaddingSetUp**
8. New FastyCrypt Type: **INanoid**
9. New FastyCrypt Type: **IPadding**
10. New FastyCrypt Type: **IPaddingSetUp**
11. New FastyCrypt Type: **IAsymmetricSettings**
12. New FastyCrypt Type: **ISymmetricSettings**
 ---
