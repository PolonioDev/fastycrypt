# Historial de cambios de FastyCrypt

[English](CHANGELOG.md)

## Versión 1.1.5 — Actualización de seguridad y herramientas

### Firma de documentos

- Se añadió `readUnverified()` para extraer el contenido de un documento firmado sin verificar su firma. `readAnyway()` queda obsoleto y conserva su comportamiento como alias hasta su retirada prevista en v2.

### Cambios incompatibles

- Node.js 14 deja de ser compatible. Nano ID `5.1.16` requiere Web Crypto y declara compatibilidad con Node.js 18.x o 20 en adelante.
- `decrypt()` (simétrico y asimétrico), `ephemeralDecrypt()`, `read()`, `readAnyway()` y `utils.Uint8ToObject()` ahora devuelven `unknown` en lugar de `any`. Comprueba o declara el tipo del valor decodificado antes de acceder a sus propiedades. Los valores en ejecución y el formato de los mensajes cifrados se mantienen.

### Seguridad

- Se retiraron la dependencia de producción `got`, que la biblioteca no usaba, y las herramientas de desarrollo `np`, `lint-staged` y Size Limit, junto con sus scripts y configuraciones.
- Se configuró pnpm para que tsup use una versión corregida de esbuild. El archivo de bloqueo actualizado resuelve `esbuild` a `0.28.2`.

### Desarrollo

- Se migraron las 13 pruebas existentes de Mocha y Chai a Vitest, incluido el modo de observación y la cobertura con V8.
- Se sustituyó Aqu por tsup para compilar y observar cambios. Se conservan las rutas públicas de importación. La compilación CommonJS ahora genera archivos `.cjs` e incluye Nano ID para que `require()` funcione en las versiones compatibles de Node.js. Se generan declaraciones de TypeScript para ambos formatos.
- En CommonJS, `require('fastycrypt/asymmetric')`, `require('fastycrypt/symmetric')` y `require('fastycrypt/signer')` devuelven directamente el constructor.
- Se añadió una configuración explícita de ESLint para la biblioteca y las pruebas, con el fin de ejecutar el análisis de código de forma independiente de Aqu.
- Se retiraron Aqu y las rutas de dependencias que incorporaban Jest y Babel Core del archivo de bloqueo de Yarn. La comparación con los avisos de npm encontró 37 coincidencias entre paquetes y avisos antes de este paso y 23 después.
- Se sustituyó el archivo de bloqueo de Yarn por el de pnpm y se añadió la configuración del espacio de trabajo. GitHub Actions usa pnpm para instalar con el archivo de bloqueo, ejecutar la cobertura de Vitest y compilar en Node.js 22 y 24.
- Se actualizó `@types/node` a la rama 22.x para cumplir los requisitos de Vite y Vitest.
- Se unificó el formato del código, las pruebas y la configuración. ESLint también revisa los archivos de herramientas y exige finales de línea LF. TypeScript comprueba que las mayúsculas y minúsculas de las rutas de importación coincidan con los nombres de archivo.

---

## Versión 1.1.4 (actualización de mantenimiento)

### Funciones para usuarios

1. Se puede personalizar el relleno de los métodos de cifrado simétrico y asimétrico.
2. El firmador incorpora `readAnyway()` para leer un documento firmado sin verificar su autoría.

### Desarrollo

1. Se migraron las pruebas unitarias de Jest a Mocha.
2. Se corrigieron errores ortográficos.
3. Se añadió la referencia al repositorio de GitHub en `package.json`.
4. Se creó el historial de cambios.
5. Se redujo la complejidad de varios métodos y se dividieron algunos en métodos más específicos.
6. Se habilitaron las incidencias de GitHub para recibir comentarios.

### Cambios internos

- Se añadieron `createPadding()`, `setupNanoid()`, `segmentDocument()` y `Uint8From()` en `src/utils.ts`.
- Se añadieron los tipos `IPaddingSettings`, `IDocumentSegments`, `IPaddingSetUp`, `INanoid`, `IPadding`, `IAsymmetricSettings` e `ISymmetricSettings`.
