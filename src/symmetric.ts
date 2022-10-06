import { nanoid as NonSecureNanoid } from 'nanoid/non-secure';
import { nanoid as SecureNanoid } from 'nanoid';
import NaCl from 'tweetnacl';
const { secretbox, randomBytes } = NaCl;

import type { 
  IFastyCryptEncoding, 
  IPadding, 
  IPaddingSettings 
} from './types';

import {
  EncodingToUint8,
  ObjectToUint8,
  random_int,
  StringToUint8,
  Uint8ToEncoding,
  Uint8ToObject,
  Uint8ToString,
} from './utils';

export default class FastyCryptSymmetric {
  // @ts-ignore 2564
  protected SignerKey: Uint8Array;
  // @ts-ignore 2564
  protected SignerEncodedKey: string;
  protected encoding: IFastyCryptEncoding;
  protected maxPaddingLength: number = 22;
  protected minPaddingLength: number = 0;
  protected nanoid: typeof NonSecureNanoid | typeof SecureNanoid = NonSecureNanoid;

  constructor(
    encoding: IFastyCryptEncoding = 'base64',
    key?: string | Uint8Array,
    paddingsSettings?: IPaddingSettings
  ) {
    this.encoding = encoding;
    if (key) {
      this.useKey(key);
    } else {
      this.createKey();
    }
    if(paddingsSettings){
      if(typeof paddingsSettings.maxPaddingLength == 'number')
        this.maxPaddingLength = paddingsSettings.maxPaddingLength;
      if(typeof paddingsSettings.minPaddingLength == 'number')
        this.minPaddingLength = paddingsSettings.minPaddingLength;
      this.nanoid = paddingsSettings.stronger ? SecureNanoid : NonSecureNanoid;
    }
  }

  static from(
    key: string,
    encoding: IFastyCryptEncoding = 'base64',
  ): FastyCryptSymmetric {
    return new FastyCryptSymmetric(encoding, key);
  }

  get secretKey() {
    return this.SignerEncodedKey;
  }
  get Uint8SecretKey() {
    return this.SignerKey;
  }

  createKey(): string {
    const key = randomBytes(secretbox.keyLength);
    this.useKey(key);

    return this.SignerEncodedKey;
  }

  static createKey(encoding: IFastyCryptEncoding = 'base64'): string {
    return Uint8ToEncoding(randomBytes(secretbox.keyLength), encoding);
  }

  useKey(key: Uint8Array | string): void {
    if (typeof key == 'string') {
      const Uint8Key = EncodingToUint8(key, this.encoding);

      if (Uint8Key.length === secretbox.keyLength) {
        this.SignerEncodedKey = key;
        this.SignerKey = Uint8Key;
        return;
      }
    } else {
      if (key.length === secretbox.keyLength) {
        this.SignerKey = key;
        this.SignerEncodedKey = Uint8ToEncoding(key, this.encoding);
        return;
      }
    }
    throw new Error(
      'Your Secret Key is invalid, please, use an valid Secret Key or execute "createKey" method to create a new key.',
    );
  }

  protected createPadding(): IPadding {
    const length: number = random_int(this.minPaddingLength, this.maxPaddingLength);
    const lengthCode: string = length >= 10 ? length.toString() : '0' + length;
    const padding: Uint8Array = StringToUint8(this.nanoid(length));
    return {
      padding,
      length,
      lengthCode: StringToUint8(lengthCode)
    };
  }

  encrypt(document: any): string {
    const nonce = randomBytes(secretbox.nonceLength);
    const {padding, lengthCode: paddingLength} = this.createPadding();
    let EncryptedDoc: Uint8Array;
    const DocToEncrypt = Uint8Array.from([
      ...padding,
      ...ObjectToUint8(document),
    ]);

    const encrypted = secretbox(DocToEncrypt, nonce, this.Uint8SecretKey);
    EncryptedDoc = Uint8Array.from([...paddingLength, ...nonce, ...encrypted]);

    return Uint8ToEncoding(EncryptedDoc, this.encoding);
  }

  decrypt(encryptedDocument: string): any {
    const Uint8EncryptedDocument = EncodingToUint8(
      encryptedDocument,
      this.encoding,
    );
    const paddingLengthUint8 = Uint8EncryptedDocument.subarray(0, 2);
    const PaddingCode = Uint8ToString(paddingLengthUint8);
    const paddingLength = parseInt(PaddingCode);
    if (
      !Number.isNaN(paddingLength) &&
      Uint8EncryptedDocument.length > 2 + paddingLength + secretbox.nonceLength
    ) {
      const nonce = Uint8EncryptedDocument.subarray(2, secretbox.nonceLength + 2);
      const EncryptedDoc = Uint8EncryptedDocument.subarray(secretbox.nonceLength + 2);
      const document = secretbox.open(EncryptedDoc, nonce, this.Uint8SecretKey);
      return document ? Uint8ToObject(document.subarray(paddingLength)) : null;
    } else {
      throw new Error('Invalid document.');
    }
  }
}
