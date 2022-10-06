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
