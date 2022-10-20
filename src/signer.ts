import NaCl from 'tweetnacl';
const { sign } = NaCl;

import type {
  IFastyCryptEncoding,
  IFastyCryptKeys,
  IFastyCryptPairKeys,
  IFastyCryptUint8PairKeys,
} from './types';
import {
  EncodingToUint8,
  ObjectToUint8,
  Uint8From,
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

  get staticSubject() {
    return this.SubjectPublicKey
      ? Uint8ToEncoding(this.SubjectPublicKey, this.encoding)
      : null;
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

  protected set Uint8PairKeys(keys: IFastyCryptUint8PairKeys) {
    const {publicKey, secretKey} = keys;
    const {publicKeyLength, secretKeyLength} = sign;

    let SignerKeys: IFastyCryptUint8PairKeys;
    let SignerEncodedKeys: IFastyCryptPairKeys;
    SignerEncodedKeys = {
      secretKey: Uint8ToEncoding(secretKey, this.encoding),
      publicKey: Uint8ToEncoding(publicKey, this.encoding),
    };
    SignerKeys = keys as IFastyCryptUint8PairKeys;
    
    if(publicKey.length !== publicKeyLength || secretKey.length !== secretKeyLength)
      throw new Error(
        'Your keys are invalid, please, use an valid keys or execute "createKeys" method to create a new keys.',
      );

    this.SignerKeys = SignerKeys;
    this.SignerEncodedKeys = SignerEncodedKeys;
  }

  set keys(keys: IFastyCryptKeys) {
    const {publicKey, secretKey} = keys;
    if (typeof publicKey === 'string' && typeof secretKey === 'string') {
      const Uint8Keys: IFastyCryptUint8PairKeys = {
        secretKey: EncodingToUint8(secretKey, this.encoding),
        publicKey: EncodingToUint8(publicKey, this.encoding),
      };
      this.Uint8PairKeys = Uint8Keys;
    }
    if(typeof publicKey === 'object' && typeof secretKey === 'object'){
      this.Uint8PairKeys = keys as IFastyCryptUint8PairKeys;
    } 
  }

  useKeys(keys: IFastyCryptKeys | string): void {
    if (typeof keys == 'string') {
      this.staticSubject = keys;
    } else if (typeof keys.publicKey == 'string') {
      this.keys = keys;
    }
  }

  set staticSubject(publicKey: string | Uint8Array | null) {
    if (publicKey) {
      let Uint8PublicKey: Uint8Array = typeof publicKey == 'string' 
        ? EncodingToUint8(publicKey, this.encoding)
        : publicKey;

      if (Uint8PublicKey.length !== sign.publicKeyLength)
        throw new Error('Invalid Subject Public Key');
      this.SubjectPublicKey = Uint8PublicKey;
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
    if (signedDocument.length <= sign.signatureLength) 
      throw new Error('Invalid signed Document.');
    const publicKey = senderPublicKey
      ? EncodingToUint8(senderPublicKey, this.encoding)
      : this.SubjectPublicKey
      ??this.SignerKeys.publicKey

    return sign.open(signedDocument, publicKey);
  }

  read(signedDocument: string, senderPublicKey?: string): any {
    const document = this.readToUint8(
      EncodingToUint8(signedDocument, this.encoding),
      senderPublicKey,
    );
    return document ? Uint8ToObject(document) : null;
  }

  readAnyway(signedDocument: string): any {
    if (signedDocument.length <= sign.signatureLength) 
      throw new Error('Invalid Signed Document');
    const document = EncodingToUint8(signedDocument, this.encoding)
    .subarray(sign.signatureLength);
    return Uint8ToObject(document);
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
      ??this.SignerKeys.publicKey;

    return sign.detached.verify(
      ObjectToUint8(document),
      EncodingToUint8(signature, this.encoding),
      publicKey,
    );
  }

  verifyDocument(document: string, senderPublicKey?: string) {
    const Uint8Document = EncodingToUint8(document, this.encoding);
    const DecryptedDoc = this.readToUint8(Uint8Document, senderPublicKey);
      return DecryptedDoc !== null;
  }

  protected getUint8SignFor(signedDocument: Uint8Array): Uint8Array {
    if (signedDocument.length <= sign.signatureLength) 
      throw new Error('Invalid Signed Document');

    return signedDocument
      .subarray(0, sign.signatureLength);
  }

  getSignFor(signedDocument: string): string {
    let document: Uint8Array = EncodingToUint8(signedDocument, this.encoding);

    const Uint8Sign = this.getUint8SignFor(document);
    const EncodedSign = Uint8ToEncoding(Uint8Sign, this.encoding);
    return EncodedSign;
  }
}
