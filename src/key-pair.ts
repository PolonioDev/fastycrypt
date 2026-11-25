import type { IFastyCryptEncoding, IFastyCryptKeys, IFastyCryptPairKeys, IFastyCryptUint8PairKeys } from './types';
import { EncodingToUint8, Uint8ToEncoding } from './utils';

export function encodeKeyPair(
  { publicKey, secretKey }: IFastyCryptUint8PairKeys,
  encoding: IFastyCryptEncoding,
  { publicKeyLength, secretKeyLength }: { publicKeyLength: number; secretKeyLength: number }
): IFastyCryptPairKeys {
  const encodedKeys = {
    secretKey: Uint8ToEncoding(secretKey, encoding),
    publicKey: Uint8ToEncoding(publicKey, encoding)
  };

  if (publicKey.length !== publicKeyLength || secretKey.length !== secretKeyLength)
    throw new Error(
      'Your keys are invalid, please, use an valid keys or execute "createKeys" method to create a new keys.'
    );

  return encodedKeys;
}

export function decodeKeyPair(
  keys: IFastyCryptKeys,
  encoding: IFastyCryptEncoding
): IFastyCryptUint8PairKeys | undefined {
  const { publicKey, secretKey } = keys;

  if (typeof publicKey === 'string' && typeof secretKey === 'string') {
    return {
      secretKey: EncodingToUint8(secretKey, encoding),
      publicKey: EncodingToUint8(publicKey, encoding)
    };
  }
  if (typeof publicKey === 'object' && typeof secretKey === 'object') {
    return keys as IFastyCryptUint8PairKeys;
  }
}
