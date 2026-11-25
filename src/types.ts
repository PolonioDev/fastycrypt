export type IFastyCryptEncoding = 'base64' | 'binary' | 'hex';
export type IFastyCryptUint8PairKeys = {
  secretKey: Uint8Array;
  publicKey: Uint8Array;
};
export type IFastyCryptPairKeys = { secretKey: string; publicKey: string };
export type IFastyCryptKeys = IFastyCryptPairKeys | IFastyCryptUint8PairKeys;
export type IPaddingSettings = {
  stronger?: boolean;
  minLength?: number;
  maxLength?: number;
  dictionary?: string;
};
export type IPadding = {
  padding: Uint8Array;
  length: number;
  lengthCode: Uint8Array;
};

export type INanoid = <Type extends string>(size?: number) => Type;

export type IDocumentSegments = {
  nonce: Uint8Array;
  paddingLength: number;
  encryptedDoc: Uint8Array;
};

export type IPaddingSetUp = {
  minLength: number;
  maxLength: number;
  nanoid: INanoid;
};

export type IAsymmetricSettings = {
  encoding?: IFastyCryptEncoding;
  keys?: IFastyCryptKeys;
  paddingSettings?: IPaddingSettings;
};

export type ISymmetricSettings = {
  encoding?: IFastyCryptEncoding;
  key?: string | Uint8Array;
  paddingSettings?: IPaddingSettings;
};
