import { nanoid as NonSecureNanoid } from 'nanoid/non-secure';
import { nanoid as SecureNanoid } from 'nanoid';
import NaCl from 'tweetnacl';
const { box, randomBytes } = NaCl;

import type {
  IFastyCryptEncoding,
  IFastyCryptKeys,
  IFastyCryptPairKeys,
  IFastyCryptUint8PairKeys,
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

export default class FastyCryptAsymmetric {
  // @ts-ignore 2564
  protected SignerKeys: IFastyCryptUint8PairKeys;
  // @ts-ignore 2564
  protected SignerEncodedKeys: IFastyCryptPairKeys;
  protected encoding: IFastyCryptEncoding;
  protected SubjectPublicKey?: Uint8Array;
  protected maxPaddingLength: number = 22;
  protected minPaddingLength: number = 0;
  protected nanoid: typeof NonSecureNanoid | typeof SecureNanoid = NonSecureNanoid;


  constructor(
    encoding: IFastyCryptEncoding = 'base64',
    keys?: IFastyCryptKeys,
    paddingsSettings?: IPaddingSettings
  ) {
    this.encoding = encoding;
    if (keys) {
      this.useKeys(keys);
    } else {
      this.createKeys();
    }
    if(paddingsSettings){
      if(typeof paddingsSettings.maxPaddingLength == 'number')
        this.maxPaddingLength = paddingsSettings.maxPaddingLength;
      if(typeof paddingsSettings.minPaddingLength == 'number')
        this.minPaddingLength = paddingsSettings.minPaddingLength;
      this.nanoid = paddingsSettings.stronger ? SecureNanoid : NonSecureNanoid;
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
    return (this.SubjectPublicKey
      ? Uint8ToEncoding(this.SubjectPublicKey, this.encoding)
      : undefined) as string | Uint8Array | null;
  }

  set staticSubject(publicKey: string | Uint8Array | null) {
    if (publicKey) {
      let Uint8PublicKey: Uint8Array;
      if (typeof publicKey == 'string') {
        Uint8PublicKey = EncodingToUint8(publicKey, this.encoding);
      } else {
        Uint8PublicKey = publicKey;
      }

      if (Uint8PublicKey.length !== box.publicKeyLength) {
        throw new Error('Invalid Subject Public Key');
      } else {
        this.SubjectPublicKey = Uint8PublicKey;
      }
    } else {
      this.SubjectPublicKey = undefined;
    }
  }

  static from(
    keys: IFastyCryptKeys,
    encoding: IFastyCryptEncoding = 'base64',
  ): FastyCryptAsymmetric {
    return new FastyCryptAsymmetric(encoding, keys);
  }

  get keys() {
    return this.SignerEncodedKeys as IFastyCryptPairKeys;
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

  static createKeys(
    encoding: IFastyCryptEncoding = 'base64',
  ): IFastyCryptPairKeys {
    const { secretKey, publicKey } = box.keyPair() as IFastyCryptUint8PairKeys;
    return {
      secretKey: Uint8ToEncoding(secretKey, encoding),
      publicKey: Uint8ToEncoding(publicKey, encoding),
    };
  }

  createKeys(): IFastyCryptPairKeys {
    const keys = box.keyPair();
    this.keys = keys;
    return this.SignerEncodedKeys;
  }

  set keys(keys: IFastyCryptKeys) {
    this.useKeys(keys);
  }

  useKeys(keys: IFastyCryptKeys | string): void {
    if (typeof keys == 'string') {
      this.staticSubject = keys;
    } else if (typeof keys.publicKey === 'string') {
      const Uint8Keys = {
        secretKey: EncodingToUint8(keys.secretKey as string, this.encoding),
        publicKey: EncodingToUint8(keys.publicKey, this.encoding),
      };

      if (
        Uint8Keys.publicKey.length == box.publicKeyLength &&
        Uint8Keys.secretKey.length === box.secretKeyLength
      ) {
        this.SignerEncodedKeys = keys as IFastyCryptPairKeys;
        this.SignerKeys = Uint8Keys;
        return;
      }
    } else if (
      keys.secretKey.length == box.secretKeyLength &&
      keys.publicKey.length == box.publicKeyLength
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

  protected encryptToUint8(
    document: any,
    publicKey: Uint8Array,
    secretKey: Uint8Array,
  ): Uint8Array {
    const nonce = randomBytes(box.nonceLength);
    const {padding, lengthCode: paddingLength} = this.createPadding();    
    let EncryptedDoc: Uint8Array;
    const DocToEncrypt = Uint8Array.from([
      ...padding,
      ...ObjectToUint8(document),
    ]);
    const encrypted = box(DocToEncrypt, nonce, publicKey, secretKey);
    EncryptedDoc = Uint8Array.from([...paddingLength, ...nonce, ...encrypted]);
    return EncryptedDoc;
  }

  protected decryptFromUint8(
    encryptedDocument: Uint8Array,
    publicKey: Uint8Array,
    secretKey: Uint8Array,
  ): any {
    const paddingLengthUint8 = encryptedDocument.subarray(0, 2);
    const paddingLength = parseInt(Uint8ToString(paddingLengthUint8));
    if (
      !Number.isNaN(paddingLength) &&
      encryptedDocument.length > 2 + paddingLength + box.nonceLength
    ) {
      const nonce = encryptedDocument.subarray(2, box.nonceLength + 2);
      const EncryptedDoc = encryptedDocument.subarray(box.nonceLength + 2);
      const document = box.open(EncryptedDoc, nonce, publicKey, secretKey);
      return document ? Uint8ToObject(document.subarray(paddingLength)) : null;
    } else {
      throw new Error('Invalid document.');
    }
  }

  encrypt(document: any, receiverPublicKey?: string): string {
    if (receiverPublicKey || this.SubjectPublicKey) {
      const ReceiverPublicKey = receiverPublicKey
        ? EncodingToUint8(receiverPublicKey, this.encoding)
        : (this.SubjectPublicKey as Uint8Array);
      const EncryptedDoc = this.encryptToUint8(
        document,
        ReceiverPublicKey,
        this.Uint8SecretKey,
      );
      
      return Uint8ToEncoding(EncryptedDoc, this.encoding);;
    } else {
      throw new Error(
        "You must specify an receiver public key to encrypt an document. If you don't want to use it, you can use ephemeral method.",
      );
    }
  }

  decrypt(encryptedDocument: string, senderPublicKey?: string): any {
    if (senderPublicKey || this.SubjectPublicKey) {
      const publicKey = senderPublicKey
        ? EncodingToUint8(senderPublicKey, this.encoding)
        : (this.SubjectPublicKey as Uint8Array);
      return this.decryptFromUint8(
        EncodingToUint8(encryptedDocument, this.encoding),
        publicKey,
        this.Uint8SecretKey,
      );
    } else {
      throw new Error("You must specify an document's sender public key.");
    }
  }

  ephemeralEncrypt(document: any, receiverPublicKey?: string): string {
    if (receiverPublicKey || this.SubjectPublicKey) {
      const ephemeral = box.keyPair();
      const publicKey = receiverPublicKey
        ? EncodingToUint8(receiverPublicKey, this.encoding)
        : (this.SubjectPublicKey as Uint8Array);
      const EncryptedDoc = this.encryptToUint8(
        document,
        publicKey,
        ephemeral.secretKey,
      );
      const EphemeralEncryptedDoc = Uint8Array.from([
        ...ephemeral.publicKey,
        ...EncryptedDoc,
      ]);

      return Uint8ToEncoding(EphemeralEncryptedDoc, this.encoding);
    } else {
      throw new Error('You must specify the public key of the receiver.');
    }
  }

  ephemeralDecrypt(ephemeralDocument: string): any {
    const Uint8Doc = EncodingToUint8(ephemeralDocument, this.encoding);

    if (Uint8Doc.length > box.publicKeyLength + 2 + box.nonceLength) {
      const publicKey = Uint8Doc.subarray(0, box.publicKeyLength);
      const EncryptedDoc = Uint8Doc.subarray(box.publicKeyLength);
      const document = this.decryptFromUint8(
        EncryptedDoc,
        publicKey,
        this.Uint8SecretKey,
      );
      return document;
    } else {
      throw new Error('Invalid document.');
    }
  }
}
