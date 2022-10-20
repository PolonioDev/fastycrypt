import NaCl from 'tweetnacl';
import {IPaddingSetUp } from './types';
const { box, randomBytes } = NaCl;

import type {
  IFastyCryptEncoding,
  IFastyCryptKeys,
  IFastyCryptPairKeys,
  IFastyCryptUint8PairKeys,
  IPaddingSettings
} from './types';
import {
  createPadding,
  EncodingToUint8,
  ObjectToUint8,
  segmentDocument,
  setupNanoid,
  Uint8From,
  Uint8ToEncoding,
  Uint8ToObject,
} from './utils';

export default class FastyCryptAsymmetric {
  // @ts-ignore 2564
  protected SignerKeys: IFastyCryptUint8PairKeys;
  // @ts-ignore 2564
  protected SignerEncodedKeys: IFastyCryptPairKeys;
  protected encoding: IFastyCryptEncoding;
  protected SubjectPublicKey?: Uint8Array;
  protected paddingSetup: IPaddingSetUp;

  constructor(
    encoding: IFastyCryptEncoding = 'base64',
    keys?: IFastyCryptKeys,
    paddingSettings?: IPaddingSettings
  ) {
    this.encoding = encoding;
    if (keys) {
      this.useKeys(keys);
    } else {
      this.createKeys();
    }
    this.paddingSetup = setupNanoid(paddingSettings);
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
      let Uint8PublicKey: Uint8Array = typeof publicKey == 'string' 
        ? EncodingToUint8(publicKey, this.encoding)
        : publicKey;

      if (Uint8PublicKey.length !== box.publicKeyLength)
        throw new Error('Invalid Subject Public Key');
      this.SubjectPublicKey = Uint8PublicKey;
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

  protected set Uint8PairKeys(keys: IFastyCryptUint8PairKeys) {
    const {publicKey, secretKey} = keys;
    const {publicKeyLength, secretKeyLength} = box;

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
    }else{
      this.keys = keys;
    }
  }


  protected encryptToUint8(
    document: any,
    publicKey: Uint8Array,
    secretKey: Uint8Array,
  ): Uint8Array {
    const nonce = randomBytes(box.nonceLength);
    const {padding, lengthCode: paddingLength} = createPadding(this.paddingSetup);    
    let EncryptedDoc: Uint8Array;
    const DocToEncrypt = Uint8Array.from([
      ...padding,
      ...ObjectToUint8(document),
    ]);
    const encrypted = box(DocToEncrypt, nonce, publicKey, secretKey);
    EncryptedDoc = Uint8Array.from([...paddingLength, ...nonce, ...encrypted]);
    return EncryptedDoc;
  }

  protected decryptFromUint8(document: Uint8Array, publicKey: Uint8Array, secretKey: Uint8Array): any {
    const {encryptedDoc, nonce, paddingLength} = segmentDocument(document, box.nonceLength);
    const decryptedDoc = box.open(encryptedDoc, nonce, publicKey, secretKey);
    return decryptedDoc ? Uint8ToObject(decryptedDoc.subarray(paddingLength)) : null;
  }

  encrypt(document: any, receiverPublicKey?: string): string { 
    const error_msg = 'You must specify an receiver public key to encrypt an document. If you don\'t want to use it, you can use ephemeral method.';
    const receiver = Uint8From(receiverPublicKey??this.SubjectPublicKey, this.encoding, error_msg)   
    const EncryptedDoc = this.encryptToUint8(
      document,
      receiver,
      this.Uint8SecretKey,
    );
    return Uint8ToEncoding(EncryptedDoc, this.encoding);
  }

  decrypt(encryptedDocument: string, senderPublicKey?: string): any {
    const error_msg = "You must specify an document's sender public key.";
    let sender = Uint8From(senderPublicKey??this.SubjectPublicKey, this.encoding, error_msg);
    return this.decryptFromUint8(
      EncodingToUint8(encryptedDocument, this.encoding),
      sender,
      this.Uint8SecretKey,
    );
  }

  ephemeralEncrypt(document: any, receiverPublicKey?: string): string {
    const error_msg = 'You must specify the public key of the receiver.';
    const publicKey = Uint8From(receiverPublicKey??this.SubjectPublicKey, this.encoding, error_msg);
    const ephemeral = box.keyPair();
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
  }

  ephemeralDecrypt(ephemeralDocument: string): any {
    const Uint8Doc = EncodingToUint8(ephemeralDocument, this.encoding);
    const minDocumentLength = box.publicKeyLength + 2 + box.nonceLength;

    if (Uint8Doc.length <= minDocumentLength) 
      throw new Error('Invalid document.');

    const publicKey = Uint8Doc.subarray(0, box.publicKeyLength);
    const EncryptedDoc = Uint8Doc.subarray(box.publicKeyLength);
    const document = this.decryptFromUint8(
      EncryptedDoc,
      publicKey,
      this.Uint8SecretKey,
    );
    return document;
  }
}
