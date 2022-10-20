import { IPaddingSettings, IPaddingSetUp, IPadding, IDocumentSegments } from './types';
import { nanoid as NonSecureNanoid, customAlphabet as NonSecureNanoidFromDictionary } from 'nanoid/non-secure';
import { nanoid as SecureNanoid, customAlphabet as SecureNanoidFromDictionary } from 'nanoid';

export function Uint8ToObject(input: Uint8Array): any {
  try {
    const JSONInput = Buffer.from(input).toString();
    return JSON.parse(JSONInput);
  } catch (e) {
    throw new Error('Your input could not be decoded!');
  }
}

export function ObjectToUint8(input: any): Uint8Array {
  try {
    const JSONInput = JSON.stringify(input);
    const Uint8Input = Uint8Array.from(Buffer.from(JSONInput));
    return Uint8Input;
  } catch (e) {
    throw new Error('Your input could not be encoded!');
  }
}

export function EncodingToUint8(
  input: string,
  encoding: BufferEncoding = 'base64',
): Uint8Array {
  try {
    const decodedInput = Buffer.from(input, encoding);
    const Uint8Input = Uint8Array.from(decodedInput);
    return Uint8Input;
  } catch (e) {
    throw new Error('Your input could not be encoded!');
  }
}
export function Uint8ToEncoding(
  input: Uint8Array,
  encoding: BufferEncoding = 'base64',
): string {
  try {
    const decodedInput = Buffer.from(input).toString(encoding);
    return decodedInput;
  } catch {
    throw new Error('Your input could not be decoded!');
  }
}

export function StringToUint8(input: string): Uint8Array {
  try {
    const decodedInput = Buffer.from(input);
    const Uint8Input = Uint8Array.from(decodedInput);
    return Uint8Input;
  } catch (e) {
    throw new Error('Your input could not be converted to Uint8Array!');
  }
}

export function Uint8ToString(input: Uint8Array): string {
  try {
    const decodedInput = Buffer.from(input).toString();
    return decodedInput;
  } catch {
    throw new Error('Your input could not be converted to String!');
  }
}

export function random_int(min: number, max: number): number {
  return Math.round(Math.random() * (max - min + 1)) + min;
}

export function setupNanoid(settings?: IPaddingSettings): IPaddingSetUp {
  const {minLength=0, maxLength=22, dictionary=undefined, stronger=false} = settings??{};
  let setup = {
    minLength,
    maxLength,
    nanoid: stronger ? SecureNanoid : NonSecureNanoid
  };
  if(dictionary)
    setup.nanoid = stronger
      ? SecureNanoidFromDictionary(dictionary)
      : SecureNanoidFromDictionary(dictionary);

  return setup;
}

export function createPadding(paddingSetup: IPaddingSetUp): IPadding {
  const {minLength, maxLength, nanoid} = paddingSetup;
  const length: number = random_int(minLength, maxLength);
  const lengthCode: string = length >= 10 ? length.toString() : '0' + length;
  const padding: Uint8Array = StringToUint8(nanoid(length));
  
  return {
    padding,
    length,
    lengthCode: StringToUint8(lengthCode)
  };
}

export function Uint8From(something: string|Uint8Array|undefined|null, encoding: BufferEncoding, error_msg: string): Uint8Array {
  if(!something)
    throw new Error(error_msg);
  return typeof something == 'string' ? EncodingToUint8(something, encoding): something;
}

export function segmentDocument(document: Uint8Array, nonceLength: number): IDocumentSegments {
  const paddingLengthCode = Uint8ToString(document.subarray(0,2)); 
  const paddingLength = parseInt(paddingLengthCode);
  const minDocumentLength = 2 + paddingLength + nonceLength;

  if(!Number.isNaN(paddingLength) && document.length > minDocumentLength){
    return {
      paddingLength,
      nonce: document.subarray(2, nonceLength + 2),
      encryptedDoc: document.subarray(nonceLength + 2)
    };
  }

  throw new Error('Invalid document.');
}