<div align="center">
  <h1 align="center">⚡️ FastyCrypt 🔒 - Encrypting And Signer</h1>
  <p align="center">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/PolonioDev/fastycrypt">
    <img alt="GitHub" src="https://img.shields.io/github/license/PolonioDev/fastycrypt">
    <img alt="npm type definitions" src="https://img.shields.io/npm/types/fastycrypt">
    <img alt="Visitors" src="https://visitor-badge.laobi.icu/badge?page_id=PolonioDev.fastycrypt&left_text=Visitors&format=true"
  </p>
</div>

[Español](README_es.md)

## What is FastyCrypt? ⚡️
FastyCrypt is a wrapper for the TweetNaCl.js module with additional features.
It allows you to encrypt and decrypt data using symmetrical and asymmetric encryption (also known as public key encryption) and additionally allows you to sign documents so that anyone can read them and verify if they are legitimate documents of the issuer.

## Why should I use it? ⚡️
FastyCrypt does the hard work for you. We know you need to protect data, and we also know that the last thing you need is to waste time understanding arduous documentation and cumbersome concepts that don't help you in your daily work. We know that writing repetitive and similar data over and over again such as "Secret Key" and "Public Key" is something that in addition to tiring takes away your valuable time, and FastyCrypt does it for you.

## How do you do it? ⚡️
FastyCrypt abstracts you from using data of type Uint8Array and implements methods so that you only have to worry about your main task, encrypting and decrypting messages, in addition to this allows you to not worry about using JSON, since internally FastyCrypt converts encryption entries to JSON format and returns it to you in the same way you have encrypted it, this means that no matter if it is a text or not, FastyCrypt knows how to work with both and does so without you having to do anything extra. If you are new to working with symmetric or asymmetric encryption FastyCrypt is your best option because it is designed to be easy to understand, easy to use and easy to implement, in addition to using TweetNaCl, it guarantees you an impressive speed and security. Are you anxious? Let's learn it!

## Contents
- [QuickStart](#quickstart)
  - [Installation](#installation)
  - [Usage](#usage)
- [Asymmetric Encryption (Public Key Encryption)](#asymmetric-encryption-public-key-encryption)
  - [new FastyCryptAsymmetric(settings)](#new-fastycryptasymmetricsettings)
  - [get keys: IFastyCryptPairKeys](#keys-ifastycryptpairkeys)
  - [createKeys()](#createkeys-ifastycryptpairkeys)
  - [FastyCryptAsymmetric.createKeys(encoding)](#fastycryptasymmetriccreatekeysencoding-static-method)
  - [useKeys(keys)](#usekeyskeys-void)
  - [FastyCryptAsymmetric.from(keys, settings)](#fastycryptasymmetricfromkeys-settings-fastycryptasymmetric)
  - [encrypt(document, receiverPublicKey)](#encryptdocument-receiverpublickey-string)
  - [decrypt(encryptedDocument, senderPublicKey)](#decryptencrypteddocument-senderpublickey-unknown)
  - [ephemeralEncrypt(document, receiverPublicKey)](#ephemeralencryptdocument-receiverpublickey-string)
  - [ephemeralDecrypt(encryptedDocument)](#ephemeraldecryptencrypteddocument-unknown)
  - [get Uint8PublicKey: Uint8Array](#get-uint8publickey-uint8array)
  - [get Uint8SecretKey: Uint8Array](#get-uint8secretkey-uint8array)
  - [get Uint8StaticSubject: Uint8Array](#get-uint8staticsubject-uint8array)
  - [get publicKey: string](#get-publickey-string)
  - [get secretKey: string](#get-secretkey-string)
  - [get staticSubject: string](#get-staticsubject-string)
  - [set staticSubject: string|Uint8Array|null](#set-staticsubject-stringuint8arraynull)
  - [Examples](#examples-for-asymmetric-encryption)
- [Symmetric Encryption](#symmetric-encryption)
  - [new FastyCryptSymmetric(settings)](#new-fastycryptsymmetricsettings)
  - [get secretKey: string](#get-secretkey-string-1)
  - [createKey(): string](#createkey-string)
  - [FastyCryptSymmetric.createKey(encoding)](#fastycryptsymmetriccreatekeyencoding-string-static-method)
  - [useKey(key)](#usekeykey-void)
  - [FastyCryptSymmetric.from(key, settings)](#fastycryptsymmetricfromkey-settings-fastycryptsymmetric)
  - [encrypt(document)](#encryptdocument-string)
  - [decrypt(encryptedDocument)](#decryptencrypteddocument-unknown)
  - [Examples](#examples-for-symmetric-encryption)
- [Document Signer](#document-signer)
  - [new FastyCryptSigner(encoding, keys)](#new-fastycryptsignerencoding-keys)
  - [get keys: IFastyCryptPairKeys](#get-keys-ifastycryptpairkeys)
  - [createKeys()](#createkeys-ifastycryptpairkeys)
  - [FastyCryptSigner.createKeys(encoding)](#fastycryptsignercreatekeysencoding-ifastycryptpairkeys-static-method)
  - [useKeys(keys)](#usekeyskeys-void-1)
  - [FastyCryptSigner.from(keys, encoding)](#fastycryptsignerfromkeys-encoding-fastycryptsigner)
  - [sign(document)](#signdocument-string)
  - [read(signedDocument, senderPublicKey)](#readsigneddocument-senderpublickey-unknown)
  - [readAnyway(signedDocument): any](#readanywaysigneddocument-any)
  - [create(document)](#createdocument-string)
  - [verify(document, signature, senderPublicKey)](#verifydocument-signature-senderpublickey-boolean)
  - [verifyDocument(signedDocument, senderPublicKey)](#verifydocumentsigneddocument-senderpublickey-boolean)
  - [getSignFor(signedDocument)](#getsignforsigneddocument-string)
  - [get Uint8PublicKey: Uint8Array](#get-uint8publickey-uint8array-1)
  - [get Uint8SecretKey: Uint8Array](#get-uint8secretkey-uint8array-1)
  - [get Uint8StaticSubject: Uint8Array](#get-uint8staticsubject-uint8array-1)
  - [get publicKey: string](#get-publickey-string-1)
  - [get secretKey: string](#get-secretkey-string-2)
  - [get staticSubject: string](#get-staticsubject-string-1)
  - [set staticSubject: string|Uint8Array|null](#set-staticsubject-stringuint8arraynull-1)
#
## QuickStart

### Installation

  Installation using NPM:
  ```bash
  npm install fastycrypt
  ```

  Installation using Yarn:
  ```bash
  yarn add fastycrypt
  ```

### Usage

#### Main entry point:
```js
import FastyCrypt from 'fastycrypt';

const FastyCryptAsymmetric = FastyCrypt.box;
const FastyCryptSymmetric = FastyCrypt.secretbox;
const FastyCryptSigner = FastyCrypt.signer;
```
#### Asymmetric entry
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';
```

#### Symmetric entry
```js
import FastyCryptSymmetric from 'fastycrypt/symmetric';
```

#### Asymmetric entry
```js
import FastyCryptSigner from 'fastycrypt/signer';
```

## Asymmetric Encryption (Public Key Encryption)

Standard asymmetric encryption uses the sender's secret key and the recipient's public key. Decryption uses the recipient's secret key and the sender's public key. Obtain the peer's public key through a trusted channel. FastyCrypt generates a fresh nonce for each encryption and supports configurable padding.

[Go now to the example](#examples-for-asymmetric-encryption)

```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';
```

### **new FastyCryptAsymmetric(settings)**
The constructor method allows you to set data that is repetitive in the encryption process. If it don't received keys, it generate a new pair of keys.
By default, FastCrypt uses the recommended settings for padding.

#### **Settings Object Structure**
| Attribute Name  |                  Type                     |             Default Value          | required |
|-----------------|-------------------------------------------|------------------------------------|----------|
|     encoding    |[IFastyCryptEncoding](#ifastycryptencoding)|                base64              | false    |
|       keys      |   [IFastyCryptKeys](#ifastycryptkeys)     |               undefined            | false    |
| paddingSettings |  [IPaddingSettings](#ipaddingsettings)    |[default](#default-padding-settings)| false    |

### **keys: [IFastyCryptPairKeys](#ifastycryptpairkeys)**
Returns the current keys in use.

### **createKeys(): [IFastyCryptPairKeys](#ifastycryptpairkeys)**
Creates a pair of new keys and returns them encoded in the format specified in the constructor.

### **FastyCryptAsymmetric.createKeys(encoding)** (Static Method)
Creates a pair of new keys and returns them encoded in the format specified (base64 by default).

### **useKeys(keys): void**
Specified an Key or Keys to use.

| Parameter |               Type                  | required |
|-----------|-------------------------------------|----------|
|    keys   | [IFastyCryptKeys](#ifastycryptkeys) | true     |

**NOTE:**
You can replace the keys in string with keys in Uint8Array. <br/>

### **FastyCryptAsymmetric.from(keys, settings): FastyCryptAsymmetric**
It creates an instance of FastyCryptAsymmetric and return it.

| Parameter Name  |                        Type                 | Default Value | required |
|-----------------|---------------------------------------------|---------------|----------|
|       keys      |      [IFastyCryptKeys](#ifastycryptkeys)    |    undefined  | true     |
|     settings    | [IAsymmetricSettings](#iasymmetricsettings) |     default   | false    |


### **encrypt(document, receiverPublicKey): string**
Encrypt your document using the recipient's public key. The document can be a string or an object suitable for transcribing into JSON format. Returns a string encrypted using the encoding specified in the constructor.<br/>
Supply the recipient's public key explicitly or configure it with `staticSubject`.

| Parameter         |     Type      | required |
|-------------------|---------------|----------|
| document          | unknown       | true     |
| receiverPublicKey |     string    | false    |

**NOTE:**
If you don't specify the "receiverPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **decrypt(encryptedDocument, senderPublicKey): unknown**
It decrypts an encrypted document and returns the original document.<br/>
Supply the sender's public key explicitly or configure it with `staticSubject`. A failed authentication returns `null`.

|  Parameter        |        Type       | required |
|-------------------|-------------------|----------|
| encryptedDocument |       string      | true     |
| senderPublicKey   | string (optional) | false    |

**NOTE:**
If you don't specify the "senderPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **ephemeralEncrypt(document, receiverPublicKey): string**
It encrypts your document using a disposable key pair (they change with each message)
and the recipient's public key. The document can be a string or an object suitable
for transcribing into JSON format. You can set the public key of the re Returns a
string encrypted using the encoding specified in the constructor.<br/>
The sender generates a temporary key pair for each message. The recipient can decrypt the message using its own secret key.

| Parameter         |     Type      | required |
|-------------------|---------------|----------|
| document          | unknown       | true     |
| receiverPublicKey |     string    | false    |

**NOTE:**
If you don't specify the "receiverPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **ephemeralDecrypt(encryptedDocument): unknown**
It decrypts an encrypted document and returns the original document.<br/>
The recipient uses the temporary public key included in the message. Use a separate signature when the recipient must verify a known sender's identity.

| Parameter        |        Type       | required |
|------------------|-------------------|----------|
| encryptedDocument |       string     | true     |

### **get Uint8PublicKey: Uint8Array**
Returns the public key of the instance as a Uint8Array
### **get Uint8SecretKey: Uint8Array**
Returns the secret key of the instance as a Uint8Array
### **get Uint8StaticSubject: Uint8Array**
Returns the public key of the static subject as a Uint8Array
### **get publicKey: string**
Returns the public key of the instance as a string in the format of the encoding specified in the constructor.
### **get secretKey: string**
Returns the secret key of the instance as a string in the format of the encoding specified in the constructor.
### **get staticSubject: string**
Returns the public key of the static subject as a string in the format of the encoding specified in the constructor.
### **set staticSubject: string|Uint8Array|null**
Sets the default public key for the peer. Set it to `null` to clear it. Supply the peer's public key explicitly on later operations that require it.

### **EXAMPLES FOR ASYMMETRIC ENCRYPTION**

In this example we pose a hypothetical conversation between the CIA and the President
to understand how the encryption and decryption mechanism works.

```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';

// The CIA builds its own FastyCrypt asymmetric object
const CIA = new FastyCryptAsymmetric();
// The CIA shares with the president his public key.

// The President builds its own FastyCrypt asymmetric object
const USAPresident = new FastyCryptAsymmetric();
// The President shares with the president his public key.


// CIA Code

  // The Central Intelligence Agency of U.S.A (CIA) wants to send a message
  // to the president without anyone altering or reading it.
  // So, CIA encrypts his message and sets it up so that only President can read it.

  const CIA_TopSecretMessage = '[S.O.S]: The Aliens are coming!';
  const CIAEncryptedMessage = CIA.encrypt(CIA_TopSecretMessage, USAPresident.publicKey);

  // Let's go! CIA Send the encrypted Message to the president using a text message
  console.log('Message sended to the president:', CIAEncryptedMessage);

// END CIA Code

 // ############################################################################################333

// USA President Code

  // The president of the USA has received a message from the CIA, and he wants to read it
  // So the president is going to do something like this.

  const TopSecretMessage = USAPresident.decrypt(CIAEncryptedMessage, CIA.publicKey);

  // The president knows the message, right now!
  console.log('Hey, president! You got a message from the CIA: \n', TopSecretMessage);

  // The president response with this message
  const TopSecretResponseMessage_USAPresident = 'Launch the missiles!';

  // The President encrypt his response
  const TopSecretResponseMessageEncrypted = USAPresident.encrypt(TopSecretResponseMessage_USAPresident, CIA.publicKey);

  // The President sends his response message to the CIA
  console.log('Message sended to the CIA: ', TopSecretResponseMessageEncrypted);
// END USA President Code


// CIA CODE
  // CIA receives the encrypted message and decrypt it
  const TopSecretResponseMessage = CIA.decrypt(TopSecretResponseMessageEncrypted, USAPresident.publicKey);

  // The CIA knows the response message
  console.log('Hey, CIA! You got a message from the USA President: \n', TopSecretResponseMessage);

// END CIA CODE

// File Output
// Message sended to the president:
// MDVJMtDuDh3HY+Cd+JbgkgR/ir6y7q291Ia4cgObs3v1Vwx8Npsx1lOGJBa0rHAiDjrOib4QgDLFadp8o99mlgz5yr247Bz2XCzs98CMOUn+LM43GuD1xM0amA==

// Hey, president! You got a message from the CIA:
//  [S.O.S]: The Aliens are coming!

// Message sended to the CIA:
// MTUwttKgVaD2nX+vsdxbKCsLVXy085WUPdzpQdefm0KbLS2zPjfvdJGzvoWOsAZznIfQHOewI0wbiTx8yPctEmMjXbKC5FbQdo1PZAsliWWqmdw7REVZIC8=

// Hey, CIA! You got a message from the USA President:
//  Launch the missiles!

```

The Same example, but using a `staticSubject` setter.
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';

// The CIA builds its own FastyCrypt asymmetric object
const CIA = new FastyCryptAsymmetric();
// The President builds its own FastyCrypt asymmetric object
const USAPresident = new FastyCryptAsymmetric();

// The President shares with the CIA his public key using a text massage
// The CIA set the President as Static Subject to make an conversation
CIA.staticSubject = USAPresident.publicKey;

// The CIA shares with the president his public key using a text massage
// The President set the CIA as Static Subject to make an conversation
USAPresident.staticSubject = CIA.publicKey;


// CIA Code

  // The Central Intelligence Agency of U.S.A (CIA) wants to send a message
  // to the president without anyone altering or reading it.
  // So, CIA encrypts his message and sets it up so that only President can read it.

  const CIA_TopSecretMessage = '[S.O.S]: The Aliens are coming!';
  const CIAEncryptedMessage = CIA.encrypt(CIA_TopSecretMessage);

  // Let's go! CIA Send the encrypted Message to the president using a text message
  console.log('Message sended to the president:', CIAEncryptedMessage);

// END CIA Code

 // ############################################################################################333

// USA President Code

  // The president of the USA has received a message from the CIA, and he wants to read it
  // So the president is going to do something like this.

  const TopSecretMessage = USAPresident.decrypt(CIAEncryptedMessage);

  // The president knows the message, right now!
  console.log('Hey, president! You got a message from the CIA: \n', TopSecretMessage);

  // The president response with this message
  const TopSecretResponseMessage_USAPresident = 'Launch the missiles!';

  // The President encrypt his response
  const TopSecretResponseMessageEncrypted = USAPresident.encrypt(TopSecretResponseMessage_USAPresident);

  // The President sends his response message to the CIA
  console.log('Message sended to the CIA: ', TopSecretResponseMessageEncrypted);
// END USA President Code


// CIA CODE
  // CIA receives the encrypted message and decrypt it
  const TopSecretResponseMessage = CIA.decrypt(TopSecretResponseMessageEncrypted);

  // The CIA knows the response message
  console.log('Hey, CIA! You got a message from the USA President: \n', TopSecretResponseMessage);

// END CIA CODE



// File Output
// Message sended to the president:
// MDVJMtDuDh3HY+Cd+JbgkgR/ir6y7q291Ia4cgObs3v1Vwx8Npsx1lOGJBa0rHAiDjrOib4QgDLFadp8o99mlgz5yr247Bz2XCzs98CMOUn+LM43GuD1xM0amA==

// Hey, president! You got a message from the CIA:
//  [S.O.S]: The Aliens are coming!

// Message sended to the CIA:
// MTUwttKgVaD2nX+vsdxbKCsLVXy085WUPdzpQdefm0KbLS2zPjfvdJGzvoWOsAZznIfQHOewI0wbiTx8yPctEmMjXbKC5FbQdo1PZAsliWWqmdw7REVZIC8=

// Hey, CIA! You got a message from the USA President:
//  Launch the missiles!
```

The same example but using ephemeral encryption.
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';

// The CIA builds its own FastyCrypt asymmetric object
const CIA = new FastyCryptAsymmetric();
// The CIA shares with the president his public key.

// The President builds its own FastyCrypt asymmetric object
const USAPresident = new FastyCryptAsymmetric();
// The President shares with the president his public key.


// CIA Code

  // The Central Intelligence Agency of U.S.A (CIA) wants to send a message
  // to the president without anyone altering or reading it.
  // So, CIA encrypts his message and sets it up so that only President can read it.

  const CIA_TopSecretMessage = '[S.O.S]: The Aliens are coming!';
  const CIAEncryptedMessage = CIA.ephemeralEncrypt(CIA_TopSecretMessage, USAPresident.publicKey);

  // Let's go! CIA Send the encrypted Message to the president using a text message
  console.log('Message sended to the president:\n', CIAEncryptedMessage);

// END CIA Code

 // ############################################################################################333

// USA President Code

  // The president of the USA has received a message from the CIA, and he wants to read it
  // So the president is going to do something like this.

  const TopSecretMessage = USAPresident.ephemeralDecrypt(CIAEncryptedMessage);

  // The president knows the message, right now!
  console.log('Hey, president! You got a message from the CIA: \n', TopSecretMessage);

  // The president response with this message
  const TopSecretResponseMessage_USAPresident = 'Launch the missiles!';

  // The President encrypt his response
  const TopSecretResponseMessageEncrypted = USAPresident.ephemeralEncrypt(TopSecretResponseMessage_USAPresident, CIA.publicKey);

  // The President sends his response message to the CIA
  console.log('Message sended to the CIA: \n', TopSecretResponseMessageEncrypted);
// END USA President Code


// CIA CODE
  // CIA receives the encrypted message and decrypt it
  const TopSecretResponseMessage = CIA.ephemeralDecrypt(TopSecretResponseMessageEncrypted);

  // The CIA knows the response message
  console.log('Hey, CIA! You got a message from the USA President: \n', TopSecretResponseMessage);

// END CIA CODE

// File Output
// Message sended to the president:
// wJoY1nY4W0KNoEfzwzwrxXQ/qB+zC7hB8Qpy0mSKNBoxOVFczOXBdwhCSq1cvBPYh5Us8pV0LBfxuwh//dMECKSQ+lKPv/ZNwoj/xhBY4bkNVTKGW32YqKApcaK/7odwgXVbr0hwXxSlBYF1zADsL/HZm1+R4JmjLJJVCUAMV/Jkh6s0Ya4OgRE=

// Hey, president! You got a message from the CIA:
//  [S.O.S]: The Aliens are coming!

// Message sended to the CIA:
// 6VOAri+xG1w61kmBOFPx3L3E7CESKsqViLsAQ207HzYxODcMxN4mejveUTs5gJ1WprebWjGLz5hBSNWZCUcbI7UrRIQxk96kNZVqiCQClubDwHNg/t0tQhkuDTzkzm8v4FYiyrbMWtYBgix6KSS/6WUcwvU0nrkOCCJDrg==

// Hey, CIA! You got a message from the USA President:
//  Launch the missiles!
```

Example of rehydration of the instance for this encryption method.
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';

// I create mi first Encryption instance
const crypt = new FastyCryptAsymmetric();

const test_msg = 'test';
const test_encrypted_msg = crypt.encrypt(test_msg, crypt.publicKey);
// Keep my pair of Keys
const keys = crypt.keys // hydrate my Crypt Instance
const cryptRehydrated = FastyCryptAsymmetric.from(keys);
const testDecryptedMsg = cryptRehydrated.decrypt(test_encrypted_msg, cryptRehydrated.publicKey);

console.log('Rehydration Successfully: ', testDecryptedMsg === test_msg);
// Rehydration Successfully:  true
```

## Symmetric Encryption

It allows you to encrypt data using a unique and extremely confidential key. Data encrypted by this method can only be decrypted by the sender of the message. The messages can also be objects that are candidates to be transformed into JSON format, these objects in combination with the plain texts in this module we call documents.
Each document, internally, is encrypted using a unique nonce or initialization vector for each message and which are also accompanied by a padding used to vary the output length of the encrypted document to add an extra degree of security.
<br/>

[Go now to the example](#examples-for-symmetric-encryption)

Importation
```js
import FastyCryptSymmetric from 'fastycrypt/symmetric';
```

### **new FastyCryptSymmetric(settings)**
The constructor method allows you to set data that is repetitive in the encryption process.
If it don't received a key, it generate it.

#### **Settings Object Structure**
| Attribute Name  |                    Type                   |             Default Value          | required |
|-----------------|-------------------------------------------|------------------------------------|----------|
|     encoding    |[IFastyCryptEncoding](#ifastycryptencoding)|                base64              | false    |
|       key       |           string or Uint8Array            |               undefined            | false    |
| paddingSettings |  [IPaddingSettings](#ipaddingsettings)    |[default](#default-padding-settings)| false    |


### **get secretKey: string**
Returns the current key in use.

### **createKey(): string**
Creates a new key and returns it encoded in the format specified in the constructor. (base64 by default)

### **FastyCryptSymmetric.createKey(encoding): string (Static Method)**
Creates a new key and returns it encoded in the format specified (base64 by default).
The **encoding** param accepts the [IFastyCryptEncoding](#ifastycryptencoding) type

### **useKey(key): void**
Specified an secret key to use.

| Parameter |          Type         | required |
|-----------|-----------------------|----------|
|    key    | string or Uint8Array  | true     |

### **FastyCryptSymmetric.from(key, settings): FastyCryptSymmetric**
It creates an instance of FastyCryptSymmetric and return it.

| Parameter Name  |                      Type                   | Default Value | required |
|-----------------|---------------------------------------------|---------------|----------|
|        key      |                   string                    |   undefined   | true     |
|     settings    |  [ISymmetricSettings](#isymmetricsettings)  |   default     | false    |

### **encrypt(document): string**
Encrypt your document using the secret key. The document can be a string or an object suitable for transcribing into JSON format. Returns a string encrypted using the encoding specified in the constructor.

| Parameter         |     Type      | required |
|-------------------|---------------|----------|
| document          | unknown       | true     |

### **decrypt(encryptedDocument): unknown**
Decrypts an encrypted document and returns the original document.<br/>
Throws an error when the encrypted document does not meet the design characteristics of an encrypted document.

| Parameter         |        Type       | required |
|-------------------|-------------------|----------|
| encryptedDocument |       string      | true     |

### **EXAMPLES FOR SYMMETRIC ENCRYPTION**

Example of use of this encryption method with rehydration of the safe.
```js
import secretbox from 'fastycrypt/symmetric';

const Safe = new secretbox();
const MySecret = {
  email: 'bob@mail.com',
  password: 'bob&aliceloveforever'
};

// Store Safe.secretKey in your secret manager.

const MyEncryptedSecret = Safe.encrypt(MySecret);
console.log('My encrypted secret:\n', MyEncryptedSecret);

const MyDecryptedSecret = Safe.decrypt(MyEncryptedSecret);
console.log('My decrypted secret:\n', MyDecryptedSecret);

const RehydratedSafe = secretbox.from(Safe.secretKey);

const MyDecryptedSecretByRehydration = RehydratedSafe.decrypt(MyEncryptedSecret);
console.log('My decrypted secret by rehydration:\n', MyDecryptedSecretByRehydration);

// File Output

// My encrypted secret:
//  MTRg7ciIUn7WHCYoiWqPrq/by9DI2XrSk55gsKDTI549V2LX3i3uSKa32Ne2V+SQGLTSX8eSjbCQa1JxCnwdnUpltNBy1FUwgjCUA8I8l+TEhWMcpJrYyMjzMZZK2hylX8aTOrLVQdyf1XAYnn/IcKok4KmKVTeaWF0iMq6cvJXF3pV+6EwVWA==

// My decrypted secret:
//  { email: 'bob@mail.com', password: 'bob&aliceloveforever' }

// My decrypted secret by rehydration:
//  { email: 'bob@mail.com', password: 'bob&aliceloveforever' }

```

## Document Signer

It allows you to emit signed documents that can be read by anyone. It is a quick and efficient mechanism to issue documents that you do not want them to be modified but read by anyone easily and quickly.
**We strongly suggest you always sign the documents on the server side and also verify them on the server side**, otherwise, an attacker could extract your signature and issue signed documents through JavaScript injection directly on your website, make sure Do not do it unless it is completely safe. of what you are doing. **Remember that this method is designed so that you or any other person can read and verify that you are you who issued a certain document, but not to hide sensitive content.** If you want to set a secure communication bridge between two subjects, you are looking for the [asymmetric encryption method](#asymmetric-encryption-public-key-encryption).
<br/>

[Go now to the example](#examples-for-signer-module)

```js
import FastyCryptSigner from 'fastycrypt/signer';
```

### **new FastyCryptSigner(encoding, keys)**
The constructor method allows you to establish data that is repetitive in the signature and reading process.
If it don't received a keys, it generate it.

| Parameter |                  Type                               | Default      |
|-----------|-----------------------------------------------------|--------------|
| encoding  |      [IFastyCryptEncoding](#ifastycryptencoding)    |    base64    |
|   keys    | [IFastyCryptKeys](#ifastycryptkeys) or string       |   optional   |

#### **NOTE**:
if you set keys as string it will considered as publicKey and FastyCrypt going to use it as static subject.

### **get keys: [IFastyCryptPairKeys](#ifastycryptpairkeys)**
Returns the current keys in use.

### **createKeys(): [IFastyCryptPairKeys](#ifastycryptpairkeys)**
Creates a new pair of keys and returns it encoded in the format specified in the constructor. (base64 by default)

### **FastyCryptSigner.createKeys(encoding): [IFastyCryptPairKeys](#ifastycryptpairkeys)** (Static Method)
Creates a new key and returns it encoded in the format specified (base64 by default).
The **encoding** param accepts the [IFastyCryptEncoding](#ifastycryptencoding)

### **useKeys(keys): void**
Specified an secret key to use.

| Parameter |                      Type                  | required |
|-----------|--------------------------------------------|----------|
|    keys   | [IFastyCryptKeys](#ifastycryptkeys)        | true     |

### **FastyCryptSigner.from(keys, encoding): FastyCryptSigner**
It creates an instance of FastyCryptSigner and return it.

| Parameter |                  Type                       |  Default |
|-----------|---------------------------------------------|----------|
|    keys   |     [IFastyCryptKeys](#ifastycryptkeys)     | required |
|  encoding | [IFastyCryptEncoding](#ifastycryptencoding) |  base64  |

### **sign(document): string**
Sign your document using the secret key. The document can be a string or an object suitable for transcribing into JSON format.
Returns a signed document as string using the encoding specified in the constructor.

| Parameter         |     Type      | required |
|-------------------|---------------|----------|
|     document      | unknown       | true     |

### **read(signedDocument, senderPublicKey): unknown**
Read a signed document and return the original document and verify if it is legitimate using the sender's public key.<br/>
If the sender's public key is not specified, it will try to use the specified static subject's public key and as a last resort it will be interpreted that an own document is being tried, so the instance's public key will be used.<br/>
Throws an error when the document does not meet the minimum design characteristics of a signed document.

|  Parameter      |        Type       |  Default |
|-----------------|-------------------|----------|
| signedDocument  |       string      | required |
| senderPublicKey |       string      | optional |

### **readAnyway(signedDocument): any**
Read a signed document without verifying if the author is legitimate.<br/>
Throws an error when the document does not meet the minimum design characteristics of a signed document.

|  Parameter        |        Type       |  Default |
|-------------------|-------------------|----------|
|   signedDocument  |       string      | required |

### **create(document): string**
create a signature for your document using the secret key.
The document can be a string or an object suitable for transcribing into JSON format.
Returns a signature associated with the specified document as a string using the encoding specified in the constructor.

| Parameter         |     Type      | required |
|-------------------|---------------|----------|
|     document      | unknown       | true     |

### **verify(document, signature, senderPublicKey): boolean**
Validates the legitimacy of a document using a signature associated with the document and the sender's public key.<br/>
If the public key of the sender is not specified, it will try to use the public key of the specified static subject and as a last resort it will be interpreted that it is trying to validate its own document, so the public key of the instance will be used to validate it.< br/>
Throws an error when the signature does not meet the design characteristics of a signature.

| Parameter        |        Type       |  Default |
|------------------|-------------------|----------|
| document         |      unknown      | required |
|     signature    |       string      | required |
| senderPublicKey  |       string      | optional |

### **verifyDocument(signedDocument, senderPublicKey): boolean**
Validates the legitimacy of a signed document using the sender's public key.<br/>
If the public key of the sender is not specified, it will try to use the public key of the specified static subject and as a last resort it will be interpreted that it is trying to validate its own document, so the public key of the instance will be used to validate it.< br/>
Throws an error when the document does not meet the design characteristics of a signed document.

| Parameter        |        Type       |  Default |
|------------------|-------------------|----------|
| signedDocument   |       string      | required |
| senderPublicKey  |       string      | optional |


### **getSignFor(signedDocument): string**
Extracts the signature from a document that has been signed and
returns it in the format of the encoding specified in the constructor.<br/>
Throws an error if the document does not meet the design characteristics of a signed document.

| Parameter        |  Type  |  Default |
|------------------|--------|----------|
|  signedDocument  | string | required |


### **get Uint8PublicKey: Uint8Array**
Returns the public key of the instance as a Uint8Array
### **get Uint8SecretKey: Uint8Array**
Returns the secret key of the instance as a Uint8Array
### **get Uint8StaticSubject: Uint8Array**
Returns the public key of the static subject as a Uint8Array
### **get publicKey: string**
Returns the public key of the instance as a string in the format of the encoding specified in the constructor.
### **get secretKey: string**
Returns the secret key of the instance as a string in the format of the encoding specified in the constructor.
### **get staticSubject: string**
Returns the public key of the static subject as a string in the format of the encoding specified in the constructor.
### **set staticSubject: string|Uint8Array|null**
Sets as static the public key of a subject that will be used frequently to avoid the need to specify it every time it is required to read or validate signatures. If you specify it you can still read and validate other subjects' signatures simply by specifying it in the read or verify methods. Additionally you can set it to null to remove this public key, which will cause the default behavior when a sender's public key is not specified to use the current instance's own public key.

### **EXAMPLES FOR SIGNER MODULE**

```js
import FastyCryptSigner from 'fastycrypt/signer';

const sender = new FastyCryptSigner();
const receiver = new FastyCryptSigner();
const document = { message: 'Hello' };

const signed = sender.sign(document);
const verified = receiver.verifyDocument(signed, sender.publicKey);
const recovered = receiver.read(signed, sender.publicKey);

const signature = sender.create(document);
const valid = receiver.verify(document, signature, sender.publicKey);
```

## Utilities Module
It provides you with some functions that are frequently used in the encryption and decryption processes that you may require when working with this module.

### Importation
ES6+ And TypeScript
```js
import * as FastyCryptUtils from 'fastycrypt/utils';
```
Node.js
```js
const FastyCryptUtils = require('fastycrypt/utils');
```

### **Uint8ToObject(input: Uint8Array): unknown**
Convert a Uint8Array to a JavaScript object or string

### **Uint8ToString(input: Uint8Array): string**
Decodes a Uint8Array as UTF-8 text. Use `Uint8ToEncoding()` for base64 or hex.

### **ObjectToUint8(input: unknown): Uint8Array**
Convert a JavaScript object or string to a Uint8Array.

### **StringToUint8(input: string): Uint8Array**
Encodes UTF-8 text as a Uint8Array. Use `EncodingToUint8()` to decode a base64 or hex string.

### **random_int(min: number, max:number): number***
Generates a pseudo-random integer.


## FastyCrypt Types
The types that can be accessed by the user are described below.

### **IFastyCryptPairKeys**
```ts
{
  secretKey: string,
  publicKey: string
}
```

### **IFastyCryptUint8PairKeys**
```ts
{
  secretKey: Uint8Array;
  publicKey: Uint8Array;
}
```

### **IFastyCryptKeys**
```ts
IFastyCryptPairKeys | IFastyCryptUint8PairKeys
```

### **IPaddingSettings**
```ts
{
  stronger?: boolean,
  minLength?: number,
  maxLength?: number,
  dictionary?: string
}
```

### **IFastyCryptEncoding**

```ts
'base64' | 'binary' | 'hex'
```

### **IPadding**
```ts
{
  padding: Uint8Array,
  length: number,
  lengthCode: Uint8Array
}
```

### **IAsymmetricSettings**
```ts
{
  encoding?: IFastyCryptEncoding,
  keys?: IFastyCryptKeys,
  paddingSettings?: IPaddingSettings
}
```

### **ISymmetricSettings**
```ts
{
  encoding?: IFastyCryptEncoding,
  key?: string | Uint8Array,
  paddingSettings?: IPaddingSettings
}
```

## **Default Padding Settings**

Padding varies the length of the encrypted output. FastyCrypt generates the nonce independently.

```js
const paddingSettings = {
  stronger: false,
  minLength: 5,
  maxLength: 22
};
```

Set `dictionary` to use a custom alphabet.

## License
MIT © [DevPolonio84 <dev.polonio84@gmail.com>](https://github.com/PolonioDev)
