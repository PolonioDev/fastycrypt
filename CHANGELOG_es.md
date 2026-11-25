# Historial de cambios de FastyCrypt

[English](CHANGELOG.md)

## Versión 1.1.5 (sin publicar)

### Desarrollo

- Se migraron las 13 pruebas existentes de Mocha y Chai a Vitest, incluido el modo de observación y la cobertura con V8.
- Se sustituyó Aqu por tsup para compilar y observar cambios. El paquete conserva sus rutas de entrada ESM y CommonJS, los nombres de los archivos generados y las declaraciones de TypeScript.
- Se añadió una configuración explícita de ESLint para la biblioteca y las pruebas, con el fin de ejecutar el análisis de código de forma independiente de Aqu.
- Se retiraron Aqu y las rutas de dependencias que incorporaban Jest y Babel Core del archivo de bloqueo de Yarn. La comparación con los avisos de npm encontró 37 coincidencias entre paquetes y avisos antes de este paso y 23 después.
- Se añadieron un archivo de bloqueo y una configuración de espacio de trabajo para pnpm junto al archivo de bloqueo existente de Yarn.

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
