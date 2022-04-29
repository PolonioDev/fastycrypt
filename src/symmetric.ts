import { nanoid } from 'nanoid/non-secure';
import { randomBytes, secretbox } from 'tweetnacl';

import type { IFastyCryptEncoding } from './types';
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

  constructor(
    encoding: IFastyCryptEncoding = 'base64',
    key?: string | Uint8Array,
  ) {
    this.encoding = encoding;
    if (key) {
      this.useKey(key);
    } else {
      this.createKey();
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

  encrypt(document: any): string {
    const nonce = randomBytes(secretbox.nonceLength);
    const padingLength = random_int(0, 22);
    const paddingCode = StringToUint8(
      padingLength < 10 ? `0${padingLength}` : padingLength.toString(),
    );
    const padding = StringToUint8(nanoid(padingLength));
    let EncryptedDoc: Uint8Array;
    const DocToEncrypt = Uint8Array.from([
      ...padding,
      ...ObjectToUint8(document),
    ]);

    const encrypted = secretbox(DocToEncrypt, nonce, this.Uint8SecretKey);
    EncryptedDoc = Uint8Array.from([...paddingCode, ...nonce, ...encrypted]);

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
      paddingLength !== NaN &&
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
