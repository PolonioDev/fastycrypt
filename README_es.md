# ⚡️ FastyCrypt 🔒

[English](README.md)

FastyCrypt es una biblioteca basada en TweetNaCl.js para cifrar documentos de forma simétrica o asimétrica, y para firmarlos y verificar su autoría. Convierte valores compatibles con JSON a bytes antes de operar y recupera el valor de JavaScript al leer un documento válido.

## Contenido

- [Instalación](#instalación)
- [Importación](#importación)
- [Cifrado asimétrico](#cifrado-asimétrico)
- [Cifrado simétrico](#cifrado-simétrico)
- [Firma de documentos](#firma-de-documentos)
- [Utilidades](#utilidades)
- [Tipos de FastyCrypt](#tipos-de-fastycrypt)
- [Configuración predeterminada del relleno](#configuración-predeterminada-del-relleno)
- [Licencia](#licencia)

## Instalación

Con npm:

~~~sh
npm install fastycrypt
~~~

Con Yarn:

~~~sh
yarn add fastycrypt
~~~

## Importación

Puedes acceder a las tres clases desde la entrada principal:

~~~js
import FastyCrypt from 'fastycrypt';

const FastyCryptAsymmetric = FastyCrypt.box;
const FastyCryptSymmetric = FastyCrypt.secretbox;
const FastyCryptSigner = FastyCrypt.signer;
~~~

También puedes importar cada clase por separado:

~~~js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';
import FastyCryptSymmetric from 'fastycrypt/symmetric';
import FastyCryptSigner from 'fastycrypt/signer';
~~~

## Cifrado asimétrico

El cifrado asimétrico ordinario usa la clave privada del remitente y la clave pública del destinatario. Para descifrar, el destinatario usa su clave privada y la clave pública del remitente. Obtén las claves públicas a través de un canal de confianza. La biblioteca genera un nonce aleatorio por mensaje.

### Constructor y claves

`new FastyCryptAsymmetric(settings?)` genera un par de claves cuando se omite `keys`.

| Opción | Tipo | Valor predeterminado |
| --- | --- | --- |
| `encoding` | [IFastyCryptEncoding](#ifastycryptencoding) | `base64` |
| `keys` | [IFastyCryptKeys](#ifastycryptkeys) | Par nuevo |
| `paddingSettings` | [IPaddingSettings](#ipaddingsettings) | [Configuración predeterminada](#configuración-predeterminada-del-relleno) |

| Método o propiedad | Comportamiento |
| --- | --- |
| `keys` | Devuelve el par de claves en la codificación de la instancia. |
| `createKeys()` | Genera un par nuevo, lo activa y lo devuelve codificado. |
| `FastyCryptAsymmetric.createKeys(encoding?)` | Genera un par codificado, en base64 por defecto. |
| `useKeys(keys)` | Carga un par con ambas claves como cadenas o ambas como `Uint8Array`. Una cadena sola configura `staticSubject`. |
| `FastyCryptAsymmetric.from(keys, settings?)` | Crea una instancia con un par guardado. Indica la codificación si difiere de base64. |

### Cifrar y descifrar

| Método | Comportamiento |
| --- | --- |
| `encrypt(document, receiverPublicKey?)` | Cifra un valor compatible con JSON para el destinatario y devuelve el resultado codificado. Usa `staticSubject` si omites la clave pública. |
| `decrypt(encryptedDocument, senderPublicKey?)` | Recupera el documento con la clave pública del remitente, o con `staticSubject` si omites el argumento. Devuelve `null` si falla la autenticación. |
| `ephemeralEncrypt(document, receiverPublicKey?)` | Genera un par temporal y cifra para el destinatario. Usa `staticSubject` si omites la clave pública. |
| `ephemeralDecrypt(encryptedDocument)` | Recupera el documento usando la clave privada del destinatario y la clave pública temporal incluida en el mensaje. |

> [!NOTE]
> El modo efímero protege el mensaje para su destinatario. Si necesitas atribuirlo a una identidad conocida, verifica una firma por separado.

### Consultar y configurar claves

| Propiedad | Comportamiento |
| --- | --- |
| `publicKey` y `secretKey` | Claves de la instancia en la codificación elegida. |
| `Uint8PublicKey` y `Uint8SecretKey` | Claves de la instancia como bytes. |
| `staticSubject` y `Uint8StaticSubject` | Clave pública del interlocutor configurado, como cadena o como bytes, respectivamente. |
| `staticSubject = publicKey` | Configura una clave de uso frecuente como cadena o `Uint8Array`. Asigna `null` para limpiar la configuración. |

### Ejemplos de cifrado asimétrico

~~~js
import Box from 'fastycrypt/asymmetric';

const alice = new Box();
const bob = new Box();
const documento = { mensaje: 'Hola, Bob' };

// Claves explícitas.
const cifrado = alice.encrypt(documento, bob.publicKey);
const recibido = bob.decrypt(cifrado, alice.publicKey);

// Claves públicas configuradas para un interlocutor frecuente.
alice.staticSubject = bob.publicKey;
bob.staticSubject = alice.publicKey;
const recibidoConSujeto = bob.decrypt(alice.encrypt(documento));

// Cifrado con un par temporal.
const efimero = alice.ephemeralEncrypt(documento, bob.publicKey);
const recibidoEfimero = bob.ephemeralDecrypt(efimero);

// Guardar el par de Bob en un almacén de secretos y restaurarlo después.
const clavesGuardadas = bob.keys;
const bobRestaurado = Box.from(clavesGuardadas);
const recuperado = bobRestaurado.decrypt(cifrado, alice.publicKey);
~~~

## Cifrado simétrico

Quien tenga la clave secreta puede cifrar y descifrar documentos. Cada mensaje usa un nonce aleatorio y, según la configuración, relleno de longitud variable.

### Constructor y clave secreta

`new FastyCryptSymmetric(settings?)` crea una instancia y genera una clave si se omite `key`.

| Opción | Tipo | Valor predeterminado |
| --- | --- | --- |
| `encoding` | [IFastyCryptEncoding](#ifastycryptencoding) | `base64` |
| `key` | `string \| Uint8Array` | Clave nueva |
| `paddingSettings` | [IPaddingSettings](#ipaddingsettings) | [Configuración predeterminada](#configuración-predeterminada-del-relleno) |

| Método o propiedad | Comportamiento |
| --- | --- |
| `secretKey` | Devuelve la clave actual codificada. |
| `Uint8SecretKey` | Devuelve la clave actual como bytes. |
| `createKey()` | Genera, activa y devuelve una clave nueva. |
| `FastyCryptSymmetric.createKey(encoding?)` | Genera una clave codificada, en base64 por defecto. |
| `useKey(key)` | Carga una clave como cadena o `Uint8Array`. |
| `FastyCryptSymmetric.from(key, settings?)` | Crea una instancia a partir de una clave guardada como cadena. |

### Cifrar y descifrar

`encrypt(document)` devuelve una cadena cifrada en la codificación configurada. `decrypt(encryptedDocument)` devuelve el valor original o `null` si falla la autenticación. Un documento mal formado puede provocar un error.

### Ejemplo de cifrado simétrico y restauración

~~~js
import SecretBox from 'fastycrypt/symmetric';

const caja = new SecretBox();
const cifrado = caja.encrypt({ mensaje: 'Documento privado' });

// Guarda este valor en un almacén de secretos.
const claveGuardada = caja.secretKey;
const cajaRestaurada = SecretBox.from(claveGuardada);
const documento = cajaRestaurada.decrypt(cifrado);
~~~

## Firma de documentos

La firma permite comprobar la integridad de un documento y su autoría mediante una clave pública de confianza. El contenido de un documento firmado se puede leer. Mantén la clave privada en el entorno de confianza que emite las firmas.

### Constructor y claves de firma

`new FastyCryptSigner(encoding?, keys?)` usa base64 por defecto y genera un par si omites `keys`. Si suministras una cadena como segundo argumento, se interpreta como la clave pública de `staticSubject`.

| Método o propiedad | Comportamiento |
| --- | --- |
| `keys` | Devuelve el par que usa la instancia. |
| `createKeys()` | Genera, activa y devuelve un par de firma nuevo. |
| `FastyCryptSigner.createKeys(encoding?)` | Genera un par codificado, en base64 por defecto. |
| `useKeys(keys)` | Carga un par de firma codificado. Una cadena sola configura `staticSubject`. |
| `FastyCryptSigner.from(keys, encoding?)` | Crea una instancia con un par de firma guardado. |
| `publicKey`, `secretKey`, `Uint8PublicKey`, `Uint8SecretKey` | Devuelven las claves de la instancia como cadenas codificadas o como bytes. |
| `staticSubject` y `Uint8StaticSubject` | Devuelven la clave pública del interlocutor configurado como cadena o bytes. Asigna una cadena o `Uint8Array` a `staticSubject` para configurarlo y `null` para limpiarlo. |

### Firmar, leer y verificar

| Método | Comportamiento |
| --- | --- |
| `sign(document)` | Devuelve un documento firmado que incluye su contenido y su firma. |
| `read(signedDocument, senderPublicKey?)` | Verifica la firma y recupera el documento. Devuelve `null` si la firma carece de validez. |
| `readAnyway(signedDocument)` | Extrae el contenido del documento firmado sin verificar su firma. |
| `create(document)` | Devuelve una firma separada del documento original. |
| `verify(document, signature, senderPublicKey?)` | Comprueba una firma separada contra el documento original y devuelve un booleano. |
| `verifyDocument(signedDocument, senderPublicKey?)` | Comprueba la firma incluida en el documento y devuelve un booleano. |
| `getSignFor(signedDocument)` | Extrae la firma en la codificación configurada. |

Si omites `senderPublicKey`, los métodos de verificación usan `staticSubject` y, si falta, la clave pública de la instancia. Una entrada mal formada puede provocar un error.

> [!WARNING]
> Trata el resultado de `readAnyway()` como contenido sin autenticar.

### Ejemplo de firma y verificación

~~~js
import Signer from 'fastycrypt/signer';

const emisor = new Signer();
const verificador = new Signer();
const documento = { mensaje: 'Documento firmado' };

const firmado = emisor.sign(documento);
const valido = verificador.verifyDocument(firmado, emisor.publicKey);
const recuperado = verificador.read(firmado, emisor.publicKey);

const firma = emisor.create(documento);
const firmaValida = verificador.verify(documento, firma, emisor.publicKey);
~~~

## Utilidades

Importa las utilidades desde TypeScript o desde un módulo ES:

~~~js
import * as utils from 'fastycrypt/utils';
~~~

| Función | Comportamiento |
| --- | --- |
| `ObjectToUint8(input)` | Serializa un valor como JSON y devuelve sus bytes. |
| `Uint8ToObject(input)` | Interpreta los bytes como JSON y devuelve el valor. |
| `StringToUint8(input)` | Convierte texto UTF-8 a bytes. |
| `Uint8ToString(input)` | Convierte bytes a texto UTF-8. |
| `EncodingToUint8(input, encoding?)` | Decodifica una cadena a bytes. Usa base64 por defecto. |
| `Uint8ToEncoding(input, encoding?)` | Codifica bytes como cadena. Usa base64 por defecto. |
| `random_int(min, max)` | Genera un entero pseudoaleatorio. |

## Tipos de FastyCrypt

### IFastyCryptPairKeys

~~~ts
{ secretKey: string; publicKey: string }
~~~

### IFastyCryptUint8PairKeys

~~~ts
{ secretKey: Uint8Array; publicKey: Uint8Array }
~~~

### IFastyCryptKeys

~~~ts
IFastyCryptPairKeys | IFastyCryptUint8PairKeys
~~~

### IPaddingSettings

~~~ts
{
  stronger?: boolean;
  minLength?: number;
  maxLength?: number;
  dictionary?: string;
}
~~~

### IFastyCryptEncoding

~~~ts
'base64' | 'binary' | 'hex'
~~~

### IPadding

~~~ts
{ padding: Uint8Array; length: number; lengthCode: Uint8Array }
~~~

### IAsymmetricSettings

~~~ts
{
  encoding?: IFastyCryptEncoding;
  keys?: IFastyCryptKeys;
  paddingSettings?: IPaddingSettings;
}
~~~

### ISymmetricSettings

~~~ts
{
  encoding?: IFastyCryptEncoding;
  key?: string | Uint8Array;
  paddingSettings?: IPaddingSettings;
}
~~~

## Configuración predeterminada del relleno

El relleno varía la longitud de salida. El nonce de cada mensaje se genera por separado.

~~~js
const paddingSettings = {
  stronger: false,
  minLength: 5,
  maxLength: 22,
};
~~~

Puedes definir `dictionary` para usar un alfabeto personalizado.

## Licencia

MIT © [DevPolonio84](https://github.com/PolonioDev)
