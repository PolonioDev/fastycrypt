import NaCl from 'tweetnacl';
import { ISymmetricSettings } from './types';
const { secretbox, randomBytes } = NaCl;

import type { 
  IFastyCryptEncoding, 
  IPaddingSettings, 
  IPaddingSetUp
} from './types';

import {
  createPadding,
  EncodingToUint8,
  ObjectToUint8,
  segmentDocument,
  setupNanoid,
  Uint8ToEncoding,
  Uint8ToObject,
} from './utils';

export default class FastyCryptSymmetric {
  // @ts-ignore 2564
  protected SignerKey: Uint8Array;
  // @ts-ignore 2564
  protected SignerEncodedKey: string;
  protected encoding: IFastyCryptEncoding;
  protected paddingSetup: IPaddingSetUp;

  constructor(settings: ISymmetricSettings={}) {
    const {encoding='base64', key, paddingSettings} = settings;
    this.encoding = encoding;
    if (key) {
      this.useKey(key);
    } else {
      this.createKey();
    }
    this.paddingSetup = setupNanoid(paddingSettings);
  }

  static from(key: string, settings?: ISymmetricSettings): FastyCryptSymmetric {
    return new FastyCryptSymmetric({key, ...(settings??{})});
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
    const {keyLength} = secretbox;
    let Uint8Key: Uint8Array;
    let EncodedKey: string;

    if(typeof key == 'string'){
      Uint8Key = EncodingToUint8(key, this.encoding)
      EncodedKey = key;
    }else{
      EncodedKey = Uint8ToEncoding(key, this.encoding)
      Uint8Key = key;
    }

    if(Uint8Key.length !== keyLength)
      throw new Error(
        'Your Secret Key is invalid, please, use an valid Secret Key or execute "createKey" method to create a new key.',
      );
    
    this.SignerKey = Uint8Key;
    this.SignerEncodedKey = EncodedKey;
  }

  encrypt(document: any): string {
    const nonce = randomBytes(secretbox.nonceLength);
    const {padding, lengthCode: paddingLength} = createPadding(this.paddingSetup);
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
    const document = EncodingToUint8(encryptedDocument, this.encoding);
    const {encryptedDoc, nonce, paddingLength} = segmentDocument(document, secretbox.nonceLength);
    const decryptedDoc = secretbox.open(encryptedDoc, nonce, this.Uint8SecretKey);
    return decryptedDoc ? Uint8ToObject(decryptedDoc.subarray(paddingLength)) : null;
  }
}
