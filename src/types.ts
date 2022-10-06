export type IFastyCryptEncoding = 'base64' | 'binary' | 'hex';
export type IFastyCryptUint8PairKeys = {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
};
export type IFastyCryptPairKeys = { secretKey: string; publicKey: string };
export type IFastyCryptKeys = IFastyCryptPairKeys | IFastyCryptUint8PairKeys;
export type IPaddingSettings = {
  stronger?: boolean,
  minPaddingLength?: number,
  maxPaddingLength?: number
};
export type IPadding = {
  padding: Uint8Array,
  length: number,
  lengthCode: Uint8Array
}