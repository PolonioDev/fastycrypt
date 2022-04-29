import { sign } from 'tweetnacl';

import type {
  IFastyCryptEncoding,
  IFastyCryptKeys,
  IFastyCryptPairKeys,
  IFastyCryptUint8PairKeys,
} from './types';
import {
  EncodingToUint8,
  ObjectToUint8,
  Uint8ToEncoding,
  Uint8ToObject,
} from './utils';

export default class FastyCryptSigner {
  // @ts-ignore 2564
  protected SignerKeys: IFastyCryptUint8PairKeys;
  // @ts-ignore 2564
  protected SignerEncodedKeys: IFastyCryptPairKeys;
  protected encoding: IFastyCryptEncoding;
  protected SubjectPublicKey?: Uint8Array;

  constructor(
    encoding: IFastyCryptEncoding = 'base64',
    keys?: IFastyCryptKeys | string,
  ) {
    this.encoding = encoding;
    if (keys) {
      this.useKeys(keys);
    }
    if (keys === undefined || typeof keys === 'string') {
      this.createKeys();
    }
  }

  get Uint8PublicKey() {
    return this.SignerKeys.publicKey;
  }

  get Uint8SecretKey() {
    return this.SignerKeys.secretKey;
  }

  get Uint8StaticSubject() {
    return this.SubjectPublicKey;
  }

  get publicKey() {
    return this.SignerEncodedKeys.publicKey;
  }

  get secretKey() {
    return this.SignerEncodedKeys.secretKey;
  }

  get staticSuject() {
    return this.SubjectPublicKey
      ? Uint8ToEncoding(this.SubjectPublicKey, this.encoding)
      : undefined;
  }

  static from(
    keys: IFastyCryptKeys | string,
    encoding: IFastyCryptEncoding = 'base64',
  ): FastyCryptSigner {
    return new FastyCryptSigner(encoding, keys);
  }

  get keys() {
    return this.SignerEncodedKeys;
  }

  createKeys(): IFastyCryptPairKeys {
    const keys = sign.keyPair();
    this.SignerKeys = keys;
    this.SignerEncodedKeys = {
      publicKey: Uint8ToEncoding(keys.publicKey, this.encoding),
      secretKey: Uint8ToEncoding(keys.secretKey, this.encoding),
    };

    return this.SignerEncodedKeys;
  }

  static createKeys(
    encoding: IFastyCryptEncoding = 'base64',
  ): IFastyCryptPairKeys {
    const { secretKey, publicKey }: any = sign.keyPair();
    return {
      secretKey: Uint8ToEncoding(secretKey, encoding),
      publicKey: Uint8ToEncoding(publicKey, encoding),
    };
  }

  set keys(keys: IFastyCryptKeys) {
    this.useKeys(keys);
  }

  useKeys(keys: IFastyCryptKeys | string): void {
    if (typeof keys == 'string') {
      this.staticSubject = keys;
    } else if (typeof keys.publicKey == 'string') {
      const Uint8Keys = {
        secretKey: EncodingToUint8(keys.secretKey as string, this.encoding),
        publicKey: EncodingToUint8(keys.publicKey, this.encoding),
      };
      if (
        Uint8Keys.publicKey.length == sign.publicKeyLength &&
        (Uint8Keys.secretKey == undefined ||
          Uint8Keys.secretKey.length == sign.secretKeyLength)
      ) {
        this.SignerEncodedKeys = keys as IFastyCryptPairKeys;
        this.SignerKeys = Uint8Keys;
        return;
      }
    } else if (
      keys.publicKey.length == sign.publicKeyLength &&
      (keys.secretKey == undefined ||
        keys.secretKey.length == sign.secretKeyLength)
    ) {
      this.SignerKeys = keys as IFastyCryptUint8PairKeys;
      this.SignerEncodedKeys = {
        secretKey: Uint8ToEncoding(keys.secretKey as Uint8Array, this.encoding),
        publicKey: Uint8ToEncoding(keys.publicKey, this.encoding),
      };
      return;
    }
    throw new Error(
      'Your keys are invalid, please, use an valid keys or execute "createKeys" method to create a new keys.',
    );
  }

  set staticSubject(publicKey: string | Uint8Array | null) {
    if (publicKey) {
      let Uint8PublicKey: Uint8Array;
      if (typeof publicKey == 'string') {
        Uint8PublicKey = EncodingToUint8(publicKey, this.encoding);
      } else {
        Uint8PublicKey = publicKey;
      }

      if (Uint8PublicKey.length !== sign.publicKeyLength) {
        throw new Error('Invalid Subject Public Key');
      } else {
        this.SubjectPublicKey = Uint8PublicKey;
      }
    } else {
      this.SubjectPublicKey = undefined;
    }
  }

  sign(document: any): string {
    return Uint8ToEncoding(
      sign(ObjectToUint8(document), this.Uint8SecretKey),
      this.encoding,
    );
  }

  protected readToUint8(
    signedDocument: Uint8Array,
    senderPublicKey?: string,
  ): Uint8Array | null {
    if (signedDocument.length > sign.signatureLength) {
      const publicKey = senderPublicKey
        ? EncodingToUint8(senderPublicKey, this.encoding)
        : this.SubjectPublicKey
        ? this.SubjectPublicKey
        : this.SignerKeys.publicKey;

      const document = sign.open(signedDocument, publicKey);
      return document ? document : null;
    } else {
      throw new Error('Invalid signed Document.');
    }
  }

  read(signedDocument: string, senderPublicKey?: string): any {
    const document = this.readToUint8(
      EncodingToUint8(signedDocument, this.encoding),
      senderPublicKey,
    );
    return document ? Uint8ToObject(document) : null;
  }

  create(document: any): string {
    return Uint8ToEncoding(
      sign.detached(ObjectToUint8(document), this.Uint8SecretKey),
      this.encoding,
    );
  }

  verify(document: any, signature: string, senderPublicKey?: string): boolean {
    const publicKey = senderPublicKey
      ? EncodingToUint8(senderPublicKey, this.encoding)
      : this.SubjectPublicKey
      ? this.SubjectPublicKey
      : this.SignerKeys.publicKey;

    return sign.detached.verify(
      ObjectToUint8(document),
      EncodingToUint8(signature, this.encoding),
      publicKey,
    );
  }

  verifyDocument(document: string, senderPublicKey?: string) {
    const Uint8Document = EncodingToUint8(document, this.encoding);
    if (Uint8Document.length > sign.signatureLength) {
      const DecryptedDoc = this.readToUint8(Uint8Document, senderPublicKey);
      return DecryptedDoc !== null;
    } else {
      throw new Error('Invalid Signed Document.');
    }
  }

  getSignFor(signedDocument: string | Uint8Array): string | Uint8Array {
    const isUsingString = typeof signedDocument === 'string';
    const document = isUsingString
      ? EncodingToUint8(signedDocument as string, this.encoding)
      : (signedDocument as Uint8Array);
    if (document.length > sign.signatureLength) {
      const Uint8Sign = document.subarray(0, sign.signatureLength);
      return isUsingString
        ? Uint8ToEncoding(Uint8Sign, this.encoding)
        : Uint8Sign;
    } else {
      throw new Error('Invalid Signed Document');
    }
  }
}
