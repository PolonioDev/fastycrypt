<div align="center">
  <h1 align="center">⚡️ FastyCrypt 🔒 - Encrypting And Signer</h1>
  <p align="center">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/PolonioDev/fastycrypt">
    <img alt="Snyk Vulnerabilities for GitHub Repo" src="https://img.shields.io/snyk/vulnerabilities/github/PolonioDev/fastycrypt">
    <img alt="GitHub branch checks state" src="https://img.shields.io/github/checks-status/PolonioDev/fastycrypt/main">
    <img alt="GitHub" src="https://img.shields.io/github/license/PolonioDev/fastycrypt">
    <img alt="npm type definitions" src="https://img.shields.io/npm/types/fastycrypt">
  </p>
</div>

## What is FastyCrypt? ⚡️
FastyCrypt is a wrapper for the TweetNaCl.js module with additional features.
It allows you to encrypt and decrypt data using symmetrical and asymmetric encryption (also known as public key encryption) and additionally allows you to sign documents so that anyone can read them and verify if they are legitimate documents of the issuer.

## Why should I use it? ⚡️
FastyCrypt does the hard work for you. We know you need to protect data, and we also know that the last thing you need is to waste time understanding arduous documentation and cumbersome concepts that don't help you in your daily work. We know that writing repetitive and similar data over and over again such as "Secret Key" and "Public Key" is something that in addition to tiring takes away your valuable time, and FastyCrypt does it for you.

## How do you do it? ⚡️
FastyCrypt abstracts you from using data of type Uint8Array and implements methods so that you only have to worry about your main task, encrypting and decrypting messages, in addition to this allows you to not worry about using JSON, since internally FastyCrypt converts encryption entries to JSON format and returns it to you in the same way you have encrypted it, this means that no matter if it is a text or not, FastyCrypt knows how to work with both and does so without you having to do anything extra. If you are new to working with symmetric or asymmetric encryption FastyCrypt is your best option because it is designed to be easy to understand, easy to use and easy to implement, in addition to using TweetNaCl, it guarantees you an impressive speed and security. Are you anxious? Let's learn it!

## Contents
- [Quickstart](#quickstart-🔒⚡️)
  - [Installation](#installation)
  - [Usage](#usage)
- [Asymmetric Encryptation (Public Key Encryptation)](#asymmetric-encryptation-public-key-encryptation)
  - [new FastyCryptAsymmetric(encoding, keys)](#new-fastycryptasymmetricencoding-keys)
  - [get keys: IFastyCryptPairKeys](#keys-ifastycryptpairkeysfastycrypt-types)
  - [createKeys()](#createkeys-ifastycryptpairkeysfastycrypt-types)
  - [FastyCryptSymmetric.createKey(encoding)](#fastycryptsymmetriccreatekeyencoding-string-static-method)
  - [useKey(keys)](#usekeyskeys-void)
  - [FastyCryptAsymmetric.from(keys, encoding)](#fastycryptasymmetricfromkeys-encoding-fastycryptasymmetric)
  - [encrypt(document, receiverPublicKey)](#encryptdocument-receiverpublickey-string)
  - [decrypt(ecryptedDocument, senderPublicKey)](#decryptecrypteddocument-senderpublickey-string--any)
  - [ephemeralEncrypt(document, receiverPublicKey)](#ephemeralencryptdocument-receiverpublickey-string)
  - [ephemeralDecrypt(encryptedDocument)](#ephemeraldecryptecrypteddocument-string--any)
  - [get Uint8PublicKey: Uint8Array](#get-uint8publickey-uint8array)
  - [get Uint8SecretKey: Uint8Array](#get-uint8secretkey-uint8array)
  - [get Uint8StaticSubject: Uint8Array](#get-uint8staticsubject-uint8array)
  - [get publicKey: string](#get-publickey-string)
  - [get secretKey: string](#get-secretkey-string)
  - [get staticSubject: string](#get-staticsubject-string)
  - [set staticSubject: string|Uint8Array|null](#set-staticsubject-stringuint8arraynull)
  - [Examples](#examples-for-asymmetric-encryptation)
- [Symmetric Encryptation](#symmetric-encryptation)
  - [new FastyCryptSymmetric(encoding, key)](#new-fastycryptsymmetricencoding-key)
  - [get key: string](#get-key-string)
  - [createKey(): string](#createkey-string)
  - [FastyCryptSymmetric.createKey(encoding)](#fastycryptsymmetriccreatekeyencoding-string-static-method)
  - [useKey(key)](#usekeykey-void)
  - [FastyCryptSymmetric.from(key, encoding)](#fastycryptsymmetricfromkey-encoding-fastycryptsymmetric)
  - [encrypt(document)](#encryptdocument-string)
  - [decrypt(ecryptedDocument)](#decryptecrypteddocument-string--any)
  - [Examples](#examples-for-symmetric-encryptation)
- [Signator of documents](#signator-of-documents)
  - [new FastyCryptSign(encoding, key)](#new-fastycryptsignencoding-key)
  - [get keys: IFastyCryptPairKeys](#get-keys-ifastycryptpairkeysfastycryptsigner-types)
  - [createKeys()](#createkeys-ifastycryptpairkeysfastycryptsigner-types)
  - [FastyCryptSymmetric.createKeys(encoding)](#fastycryptsymmetriccreatekeysencoding-ifastycryptpairkeysfastycryptsigner-types-static-method)
  - [useKeys(keys)](#usekeyskeys-void-1)
  - [FastyCryptSymmetric.from(keys, encoding)](#fastycryptsymmetricfromkeys-encoding-fastycryptsigner)
  - [sign(document)](#signdocument-string)
  - [read(ecryptedDocument, senderPublicKey)](#readecrypteddocument-senderpublickey-string--any)
  - [create(document)](#createdocument-string)
  - [verify(ecryptedDocument, signature, senderPublicKey)](#verifyecrypteddocument-signature-senderpublickey-boolean)
  - [verifyDocument(ecryptedDocument, signature, senderPublicKey)](#verifydocumentecrypteddocument-signature-senderpublickey-boolean)
  - [getSignFor(signedDocument)](#getsignforsigneddocument-stringuint8array)
  - [get Uint8PublicKey: Uint8Array](#get-uint8publickey-uint8array-1)
  - [get Uint8SecretKey: Uint8Array](#get-uint8secretkey-uint8array-1)
  - [get Uint8StaticSubject: Uint8Array](#get-uint8staticsubject-uint8array-1)
  - [get publicKey: string](#get-publickey-string-1)
  - [get secretKey: string](#get-secretkey-string-1)
  - [get staticSubject: string](#get-staticsubject-string-1)
  - [set staticSubject: string|Uint8Array|null](#set-staticsubject-stringuint8arraynull-1)
#
## Quickstart 🔒⚡️

### Installation

  Installation usign NPM:
  ```bash
  npm install fastycrypt
  ```

  Installation usign Yarn:
  ```bash
  yarn add fastycrypt
  ```

### Usage

#### Main entry point:
```js
import FastyCrypt from 'fastycrypt';

const FastyCryptAsymmetric = FastyCrypt.box;
const FastyCryptSymmetric = FastyCrypt.secretbox;
const FastyCryptSigner = FastyCrypt.sign;
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

## Asymmetric Encryptation (Public Key Encryptation)

It allows you to encrypt and decrypt messages using a public key that you can share in insecure environments, such as a web client or REST API. The messages can also be candidate objects to be transformed into JSON format, these objects in combination with the plain texts in this module are called documents. By using this encryption method, it creates a secure means of communication where each document is protected, signed by the sender and addressed to a single recipient, if the document is modified in the slightest, the document is corrupted and cannot be decrypted, indicating that the received document was not written by the intended sender.<br/>
This implementation has some additional functions with respect to TweetNaCl, among them I tried a high-level api to send messages with disposable encoding, different nonce for each message and padding to add more security, the padding is used to generate output of random lengths.
<br/>
[Go now to the example](#examples-for-asymmetric-encryptation)
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';
```

### **new FastyCryptAsymmetric(encoding, keys)**
The constructor method allows you to set data that is repetitive in the encryption process. If it don't received keys, it generate it.

| Parameter |                  Type                               | Default |
|-----------|-----------------------------------------------------|---------|
| encoding  |      [IFastyCryptEncoding](#fastycrypt-types)       |  base64 |
|   keys    |        {secretKey: string, publicKey:string}        |  null   |

#### **NOTE**
You can replace the keys in string with keys in Uint8Array. <br/>

### **keys: [IFastyCryptPairKeys](#fastycrypt-types)**
Returns the current keys in use.

### **createKeys(): [IFastyCryptPairKeys](#fastycrypt-types)**
Creates a pair of new keys and returns them encrypted in the format specified in the constructor.

### FastyCryptAsymmetric.createKeys(encoding) (Static Method)
Creates a pair of new keys and returns them encrypted in the format specified (base64 by default).
The **encoding** param accepts the [Buffer's encoding list](#the-encodings-param-accepts)

### **useKeys(keys): void**
Specified an Key or Keys to use.

| Parameter |                      Type                  |
|-----------|--------------------------------------------|
|    keys   | [IFastyCryptKeys](#fastycryptsigner-types) |

#### **NOTE**
You can replace the keys in string with keys in Uint8Array. <br/>

### **FastyCryptAsymmetric.from(keys, encoding): FastyCryptAsymmetric**
It creates an instance of FastyCryptAsymmetic and return it.

| Parameter |                  Type                                |  Default |
|-----------|------------------------------------------------------|----------|
|   keys    |       {secretKey: string, publicKey:string}          | required |
| encoding  |     [IFastyCryptEncoding](#fastycrypt-types)         |  base64  |

### **encrypt(document, receiverPublicKey): string**
Encrypt your document using the recipient's public key. The document can be a string or an object suitable for transcribing into JSON format. Returns a string encrypted using the encoding specified in the constructor.<br/>
It throws an error when secretKey is not specified.

| Parameter         |     Type      |
|-------------------|---------------|
| document          | string or any |
| receiverPublicKey |     string    |

#### **NOTE**
If you don't specify the "receiverPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **decrypt(ecryptedDocument, senderPublicKey): string | any**
It decrypts an encrypted document and returns the original document.<br/>
It throws an error when secretKey is not specified.

| Parameter        |        Type       |
|------------------|-------------------|
| ecryptedDocument |       string      |
| senderPublicKey  | string (optional) |

#### **NOTE**
If you don't specify the "senderPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **ephemeralEncrypt(document, receiverPublicKey): string**
It encrypts your document using a disposable key pair (they change with each message)
and the recipient's public key. The document can be a string or an object suitable
for transcribing into JSON format. You can set the public key of the re Returns a
string encrypted using the encoding specified in the constructor.<br/>
It throws an error when secretKey is not specified.

| Parameter         |     Type      |
|-------------------|---------------|
| document          | string or any |
| receiverPublicKey |     string    |

#### **NOTE**
If you don't specify the "receiverPublicKey" parameter it will try to use the value you
specified when you set staticSubject setter. <br/>

### **ephemeralDecrypt(ecryptedDocument): string | any**
It decrypts an encrypted document and returns the original document.<br/>
It throws an error when secretKey is not specified.

| Parameter        |        Type       |
|------------------|-------------------|
| ecryptedDocument |       string      |

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

### EXAMPLES FOR ASYMMETRIC ENCRYPTATION

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

The Same example, but usign a `staticSubject` setter.
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

The same example but using ephemeral encryptation.
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

Example of rehydration of the instance for this encryptation method.
```js
import FastyCryptAsymmetric from 'fastycrypt/asymmetric';

// I create mi first Encryptation instance
const crypt = new FastyCryptAsymmetric();

const test_msg = 'test';
const test_encrypted_msg = crypt.encrypt(test_msg, crypt.publicKey);
// Keep my pair of Keys
const keys = crypt.keys // hydrate my Crypt Instance
const cryptRehydrated = FastyCryptAsymmetric.from(keys);
const testDecryptedMsg = cryptRehydrated.decrypt(test_encrypted_msg, cryptRehydrated.publicKey);

console.log('Rehydratation Successfully: ', testDecryptedMsg === test_msg);
// Rehydratation Successfully:  true
```

## Symmetric Encryptation

It allows you to encrypt data using a unique and extremely confidential key. Data encrypted by this method can only be decrypted by the sender of the message. The messages can also be objects that are candidates to be transformed into JSON format, these objects in combination with the plain texts in this module we call documents.
Each document, internally, is encrypted using a unique nonce or initialization vector for each message and which are also accompanied by a padding used to vary the output length of the encrypted document to add an extra degree of security.
<br/>
[Go now to the example](#examples-for-symmetric-encryptation)

Importation
```js
import FastyCryptSymmetric from 'fastycrypt/symmetric';
```

### **new FastyCryptSymmetric(encoding, key)**
The constructor method allows you to set data that is repetitive in the encryption process.
If it don't received a key, it generate it.

| Parameter |                  Type                               | Default      |
|-----------|-----------------------------------------------------|--------------|
| encoding  |      [IFastyCryptEncoding](#fastycrypt-types)       |    base64    |
|    key    |                  string or Uint8Array               |  undefined   |

### **get key: string**
Returns the current key in use.

### **createKey(): string**
Creates a new key and returns it encrypted in the format specified in the constructor. (base64 by default)

### FastyCryptSymmetric.createKey(encoding): string (Static Method)
Creates a new key and returns it encrypted in the format specified (base64 by default).
The **encoding** param accepts the [IFastyCryptEncoding](#fastycrypt-types) type

### **useKey(key): void**
Specified an secret key to use.

| Parameter |          Type         |
|-----------|-----------------------|
|    key    | string or Uint8Array  |

### **FastyCryptSymmetric.from(key, encoding): FastyCryptSymmetric**
It creates an instance of FastyCryptSymmetic and return it.

| Parameter |                  Type                                |  Default |
|-----------|------------------------------------------------------|----------|
|    key    |                  string or Uint8Array                | required |
| encoding  |       [IFastyCryptEncoding](#fastycrypt-types)       |  base64  |

### **encrypt(document): string**
Encrypt your document using the secret key. The document can be a string or an object suitable for transcribing into JSON format. Returns a string encrypted using the encoding specified in the constructor.

| Parameter         |     Type      |
|-------------------|---------------|
| document          | string or any |

### **decrypt(ecryptedDocument): string | any**
Decrypts an encrypted document and returns the original document.<br/>
Throws an error when the encrypted document does not meet the design characteristics of an encrypted document.

| Parameter        |        Type       |
|------------------|-------------------|
| ecryptedDocument |       string      |

### EXAMPLES FOR SYMMETRIC ENCRYPTATION

Example of use of this encryption method with rehydration of the safe.
```js
import secretbox from 'fastycrypt/symmetric';

const Safe = new secretbox();
const MySecret = {
  email: 'bob@mail.com',
  password: 'bob&aliceloveforever'
};

console.log('Keep it in a safe place:\n', Safe.secretKey);

const MyEncryptedSecret = Safe.encrypt(MySecret);
console.log('My encrypted secret:\n', MyEncryptedSecret);

const MyDecryptedSecret = Safe.decrypt(MyEncryptedSecret);
console.log('My decrypted secret:\n', MyDecryptedSecret);

const RehydratedSafe = secretbox.from(Safe.secretKey);

const MyDecryptedSecretByRehydratation = RehydratedSafe.decrypt(MyEncryptedSecret);
console.log('My decrypted secret by rehydratation:\n', MyDecryptedSecretByRehydratation);

// File Outoput

// Keep it in a safe place:
//  IwPFd3w6shvDpWywwqpAU9nNweJukI4kwwfL5gy4Cno=

// My encrypted secret:
//  MTRg7ciIUn7WHCYoiWqPrq/by9DI2XrSk55gsKDTI549V2LX3i3uSKa32Ne2V+SQGLTSX8eSjbCQa1JxCnwdnUpltNBy1FUwgjCUA8I8l+TEhWMcpJrYyMjzMZZK2hylX8aTOrLVQdyf1XAYnn/IcKok4KmKVTeaWF0iMq6cvJXF3pV+6EwVWA==

// My decrypted secret:
//  { email: 'bob@mail.com', password: 'bob&aliceloveforever' }

// My decrypted secret by rehydratation:
//  { email: 'bob@mail.com', password: 'bob&aliceloveforever' }

```

## Signator of documents

It allows you to emit signed documents that can be read by anyone. It is a quick and efficient mechanism to issue documents that you do not want them to be modified but read by anyone easily and quickly.
**We strongly suggest you always sign the documents on the server side and also verify them on the server side**, otherwise, an attacker could extract your signature and issue signed documents through JavaScript injection directly on your website, make sure Do not do it unless it is completely safe. of what you are doing. **Remember that this method is designed so that you or any other person can read and verify that you are you who issued a certain document, but not to hide sensitive content.** If you want to set a secure communication bridge between two subjects, you are looking for the [asymmetric encryption method](#asymmetric-encryptation-public-key-encryptation).
<br/>
[Go now to the example](#examples-for-signer-module)

```js
import FastyCryptSign from 'fastycrypt/sign';
```

### **new FastyCryptSign(encoding, key)**
The constructor method allows you to establish data that is repetitive in the signature and reading process.
If it don't received a keys, it generate it.

| Parameter |                  Type                               | Default      |
|-----------|-----------------------------------------------------|--------------|
| encoding  |      [IFastyCryptEncoding](#fastycrypt-types)       |    base64    |
|   keys    | [IFastyCryptKeys](#fastycryptsigner-types) or string|   optional   |

#### NOTE:
if you set keys as strign it will considered as publicKey and FastyCrypt goin to use it as static subject.

### **get keys: [IFastyCryptPairKeys](#fastycryptsigner-types)**
Returns the current keys in use.

### **createKeys(): [IFastyCryptPairKeys](#fastycryptsigner-types)**
Creates a new pair of keys and returns it encrypted in the format specified in the constructor. (base64 by default)

### **FastyCryptSymmetric.createKeys(encoding): [IFastyCryptPairKeys](#fastycryptsigner-types)** (Static Method)
Creates a new key and returns it encrypted in the format specified (base64 by default).
The **encoding** param accepts the [Buffer's encoding list](#the-encodings-param-accepts)

### **useKeys(keys): void**
Specified an secret key to use.

| Parameter |                      Type                  |
|-----------|--------------------------------------------|
|    keys   | [IFastyCryptKeys](#fastycryptsigner-types) |

### **FastyCryptSymmetric.from(keys, encoding): FastyCryptSigner**
It creates an instance of FastyCryptSigner and return it.

| Parameter |                  Type                                |  Default |
|-----------|------------------------------------------------------|----------|
|    keys   |       [IFastyCryptKeys](#fastycryptsigner-types)     | required |
|  encoding |        [IFastyCryptEncoding](#fastycrypt-types)      |  base64  |

### **sign(document): string**
Sign your document using the secret key. The document can be a string or an object suitable for transcribing into JSON format.
Returns a signed document as string using the encoding specified in the constructor.

| Parameter         |     Type      |
|-------------------|---------------|
|     document      | string or any |

### **read(ecryptedDocument, senderPublicKey): string | any**
Read a signed document and return the original document and verify if it is legitimate using the sender's public key.<br/>
If the sender's public key is not specified, it will try to use the specified static subject's public key and as a last resort it will be interpreted that an own document is being tried, so the instance's public key will be used.<br/>
Throws an error when the document does not meet the minimum design characteristics of a signed document.

| Parameter        |        Type       |  Default |
|------------------|-------------------|----------|
| ecryptedDocument |       string      | required |
| senderPublicKey  |       string      | optional |

### **create(document): string**
create a signature for your document using the secret key.
The document can be a string or an object suitable for transcribing into JSON format.
Returns a signature associated with the specified document as a string using the encoding specified in the constructor.

| Parameter         |     Type      |
|-------------------|---------------|
|     document      | string or any |

### **verify(ecryptedDocument, signature, senderPublicKey): boolean**
Validates the legitimacy of a document using a signature associated with the document and the sender's public key.<br/>
If the public key of the sender is not specified, it will try to use the public key of the specified static subject and as a last resort it will be interpreted that it is trying to validate its own document, so the public key of the instance will be used to validate it.< br/>
Throws an error when the signature does not meet the design characteristics of a signature.

| Parameter        |        Type       |  Default |
|------------------|-------------------|----------|
| ecryptedDocument |       string      | required |
|     signature    |       string      | required |
| senderPublicKey  |       string      | optional |

### **verifyDocument(ecryptedDocument, signature, senderPublicKey): boolean**
Validates the legitimacy of a signed document using the sender's public key.<br/>
If the public key of the sender is not specified, it will try to use the public key of the specified static subject and as a last resort it will be interpreted that it is trying to validate its own document, so the public key of the instance will be used to validate it.< br/>
Throws an error when the document does not meet the design characteristics of a signed document.

| Parameter        |        Type       |  Default |
|------------------|-------------------|----------|
| ecryptedDocument |       string      | required |
| senderPublicKey  |       string      | optional |


### **getSignFor(signedDocument): string|Uint8Array**
Extracts the signature from a document that has been signed and
returns it in the format of the encoding specified in the constructor.<br/>
Throws an error if the document does not meet the design characteristics of a signed document.

| Parameter        |          Type        |  Default |
|------------------|----------------------|----------|
|  signedDocument  | string or Uint8Array | required |


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

### EXAMPLES FOR SIGNER MODULE

Example of use of this encryption method with rehydration of the safe.
```js
import { StringToUint8, Uint8ToString } from 'fastycrypt/utils';
import FastyCryptSigner from 'fastycrypt/signer';

// The USA President create your own Signer Instance
const USAPresident = new FastyCryptSigner();
const RealDocument = 'My brothers are coming!';

let PresidentSignedDocument = USAPresident.sign(RealDocument);
// Alice is an person like you an i
const Alice = new FastyCryptSigner();
// Alice try to read the President's Document and validate it
console.log('Is this document signed by the president?', Alice.verifyDocument(PresidentSignedDocument, USAPresident.publicKey));
console.log('Document:', Alice.read(PresidentSignedDocument, USAPresident.publicKey));

// Trying to hack it
  const hacker = new FastyCryptSigner();

  // Hacker try to change the document and sign it
  // Hacker try change the document of the president to 'Alies are coming!'
  let modifiedDocument = RealDocument.replace('My brothers', 'Alies');
  let hackedDocument = hacker.sign(modifiedDocument);


  // Alice try to read the Hacker's Document and validate it
  // Hacker fail...
  console.log('Is this document signed by the president?', Alice.verifyDocument(hackedDocument, USAPresident.publicKey));
  console.log('Hacked Document:', Alice.read(hackedDocument, USAPresident.publicKey));

  // Hacker try to falsify the document again
  // try to change the document of the president to 'Alies are coming!'
  modifiedDocument = RealDocument.replace('My brothers', 'Alies');
  // and falsify the signature of the president
  let PresidentSignature = hacker.getSignFor(PresidentSignedDocument) as string;
  // Hacker build the falsified document
  const Uint8PresidentSignature = StringToUint8(PresidentSignature);
  const Uint8ModifiedDocument = StringToUint8(modifiedDocument, 'ascii');
  hackedDocument = Uint8ToString(Uint8Array.from([...Uint8PresidentSignature, ...Uint8ModifiedDocument]));

  // Alice try to read the Hacker's Document and validate it
  // Hacker fail, again
  console.log('Is this document signed by the president?', Alice.verifyDocument(hackedDocument, USAPresident.publicKey));
  console.log('Hacked Document:', Alice.read(hackedDocument, USAPresident.publicKey));



// File Output
// Is this document signed by the president? true
// Document: My brothers are coming!

// Is this document signed by the president? false
// Hacked Document: null

// Is this document signed by the president? false
// Hacked Document: null
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

### **Uint8ToObject(input: Uint8Array): any**
Convert a Uint8Array to a JavaScript object or string

### **Uint8ToString(input: Uint8Array, encoding: BufferEncoding='base64'): string**
Converts a Uint8Array to a string using the specified encoding.

#### The **encoding**'s param accepts
- ascii
- utf8
- utf-8
- utf16le
- ucs2
- ucs-2
- base64
- base64url
- latin1
- binary
- hex

### **ObjectToUint8(input: any): Uint8Array**
Convert a JavaScript object or string to a Uint8Array.

### **StringToUint8(input: string, encoding: BufferEncoding='base64'): Uint8Array**
Converts a string using the specified encoding to a Uint8Array.

### **random_int(min: number, max:number): number***
Generates a pseudo-random integer.


## FastyCrypt Types
|          Type            |                    Definition                  |
|--------------------------|------------------------------------------------|
|   IFastyCryptPairKeys    |      {secretKey: string, publicKey:string}     |
| IFastyCryptUint8PairKeys | {secretKey: Uint8Array, publicKey: Uint8Array} |
|     IFastyCryptKeys      | IFastyCryptPairKeys | IFastyCryptUint8PairKeys |

## Licence
MIT © [DevPolonio84 <dev.polonio84@gmail.com>](https://github.com/PolonioDev)
