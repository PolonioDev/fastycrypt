import { nanoid as NonSecureNanoid } from 'nanoid/non-secure';
import { nanoid as SecureNanoid} from 'nanoid';

export type IFastyCryptEncoding = 'base64' | 'binary' | 'hex';
export type IFastyCryptUint8PairKeys = {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
};
export type IFastyCryptPairKeys = { secretKey: string; publicKey: string };
export type IFastyCryptKeys = IFastyCryptPairKeys | IFastyCryptUint8PairKeys;
export type IPaddingSettings = {
  stronger?: boolean,
  minLength?: number,
  maxLength?: number,
  dictionary?: string
};
export type IPadding = {
  padding: Uint8Array,
  length: number,
  lengthCode: Uint8Array
}

export type INanoid = typeof SecureNanoid|typeof NonSecureNanoid;

export type IDocumentSegments = {
  nonce: Uint8Array,
  paddingLength: number,
  encryptedDoc: Uint8Array
};

export type IPaddingSetUp = {
  minLength: number,
  maxLength: number,
  nanoid: INanoid
};