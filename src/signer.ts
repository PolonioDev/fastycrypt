import NaCl from 'tweetnacl';
const { sign } = NaCl;

import { decodeKeyPair, encodeKeyPair } from './key-pair';
import type { IFastyCryptEncoding, IFastyCryptKeys, IFastyCryptPairKeys, IFastyCryptUint8PairKeys } from './types';
import { EncodingToUint8, ObjectToUint8, Uint8ToEncoding, Uint8ToObject } from './utils';

export default class FastyCryptSigner {
  protected SignerKeys!: IFastyCryptUint8PairKeys;
  protected SignerEncodedKeys!: IFastyCryptPairKeys;
  protected encoding: IFastyCryptEncoding;
  protected SubjectPublicKey?: Uint8Array;

  constructor(encoding: IFastyCryptEncoding = 'base64', keys?: IFastyCryptKeys | string) {
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
    return this.SubjectPublicKey ? Uint8ToEncoding(this.SubjectPublicKey, this.encoding) : null;
  }

  static from(keys: IFastyCryptKeys | string, encoding: IFastyCryptEncoding = 'base64'): FastyCryptSigner {
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
      secretKey: Uint8ToEncoding(keys.secretKey, this.encoding)
    };

    return this.SignerEncodedKeys;
  }

  static createKeys(encoding: IFastyCryptEncoding = 'base64'): IFastyCryptPairKeys {
    const { secretKey, publicKey } = sign.keyPair();
    return {
      secretKey: Uint8ToEncoding(secretKey, encoding),
      publicKey: Uint8ToEncoding(publicKey, encoding)
    };
  }

  protected set Uint8PairKeys(keys: IFastyCryptUint8PairKeys) {
    const encodedKeys = encodeKeyPair(keys, this.encoding, sign);
    this.SignerKeys = keys;
    this.SignerEncodedKeys = encodedKeys;
  }

  set keys(keys: IFastyCryptKeys) {
    const decodedKeys = decodeKeyPair(keys, this.encoding);
    if (decodedKeys) this.Uint8PairKeys = decodedKeys;
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
      const Uint8PublicKey: Uint8Array =
        typeof publicKey == 'string' ? EncodingToUint8(publicKey, this.encoding) : publicKey;

      if (Uint8PublicKey.length !== sign.publicKeyLength) throw new Error('Invalid Subject Public Key');
      this.SubjectPublicKey = Uint8PublicKey;
    } else {
      this.SubjectPublicKey = undefined;
    }
  }

  sign(document: unknown): string {
    return Uint8ToEncoding(sign(ObjectToUint8(document), this.Uint8SecretKey), this.encoding);
  }

  protected readToUint8(signedDocument: Uint8Array, senderPublicKey?: string): Uint8Array | null {
    if (signedDocument.length <= sign.signatureLength) throw new Error('Invalid signed Document.');
    const publicKey = senderPublicKey
      ? EncodingToUint8(senderPublicKey, this.encoding)
      : (this.SubjectPublicKey ?? this.SignerKeys.publicKey);

    return sign.open(signedDocument, publicKey);
  }

  read(signedDocument: string, senderPublicKey?: string): unknown {
    const document = this.readToUint8(EncodingToUint8(signedDocument, this.encoding), senderPublicKey);
    return document ? Uint8ToObject(document) : null;
  }

  /** Extracts the document without verifying its signature. */
  readUnverified(signedDocument: string): unknown {
    if (signedDocument.length <= sign.signatureLength) throw new Error('Invalid Signed Document');
    const document = EncodingToUint8(signedDocument, this.encoding).subarray(sign.signatureLength);
    return Uint8ToObject(document);
  }

  /** @deprecated Use readUnverified() instead. Scheduled for removal in v2. */
  readAnyway(signedDocument: string): unknown {
    return this.readUnverified(signedDocument);
  }

  create(document: unknown): string {
    return Uint8ToEncoding(sign.detached(ObjectToUint8(document), this.Uint8SecretKey), this.encoding);
  }

  verify(document: unknown, signature: string, senderPublicKey?: string): boolean {
    const publicKey = senderPublicKey
      ? EncodingToUint8(senderPublicKey, this.encoding)
      : (this.SubjectPublicKey ?? this.SignerKeys.publicKey);

    return sign.detached.verify(ObjectToUint8(document), EncodingToUint8(signature, this.encoding), publicKey);
  }

  verifyDocument(document: string, senderPublicKey?: string) {
    const Uint8Document = EncodingToUint8(document, this.encoding);
    const DecryptedDoc = this.readToUint8(Uint8Document, senderPublicKey);
    return DecryptedDoc !== null;
  }

  protected getUint8SignFor(signedDocument: Uint8Array): Uint8Array {
    if (signedDocument.length <= sign.signatureLength) throw new Error('Invalid Signed Document');

    return signedDocument.subarray(0, sign.signatureLength);
  }

  getSignFor(signedDocument: string): string {
    const document: Uint8Array = EncodingToUint8(signedDocument, this.encoding);

    const Uint8Sign = this.getUint8SignFor(document);
    const EncodedSign = Uint8ToEncoding(Uint8Sign, this.encoding);
    return EncodedSign;
  }
}
