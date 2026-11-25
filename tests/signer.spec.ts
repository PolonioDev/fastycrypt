import { beforeAll, describe, expect, it } from 'vitest';
import signer from '../src/signer';
const document = {
  test: true
};
let Bob: signer;
let Alice: signer;
describe('Signer [sign]', () => {
  beforeAll(() => {
    Bob = new signer();
    Alice = new signer();
  });

  it('signer.staticSubject should be works', () => {
    Bob.staticSubject = Alice.publicKey;
    Alice.staticSubject = Bob.publicKey;
  });

  it('signer.sign and signer.read should not throw', () => {
    const signed = Bob.sign(document);
    const obj = Alice.read(signed, Bob.publicKey);
    expect(obj, 'The signed document must be equal to initial document.').toEqual(document);
  });

  it('signer.sign and signer.read: signer.read should be throw', () => {
    const signed = Bob.sign(document);
    const obj = Alice.read(signed, Alice.publicKey);
    expect(obj, 'The signed document must not be read using the public key of third parties.').toBeNull();
  });

  it('signer.getSignFor', () => {
    const encryptedDoc = Bob.sign(document);
    const signature = Alice.getSignFor(encryptedDoc);
    const isDocumentSignedByBob = Alice.verify(document, signature, Bob.publicKey);
    expect(isDocumentSignedByBob, "Everyone should be able to obtain a document's signature.").toBe(true);
  });

  it('signer.create vs signer.verify', () => {
    const signature = Bob.create(document);
    const isDocumentSignedByBob = Alice.verify(document, signature, Bob.publicKey);
    expect(isDocumentSignedByBob, "Everyone should be able to obtain a document's signature.").toBe(true);
  });

  it('signer.verifyDocument', () => {
    const encryptedDoc = Bob.sign(document);
    const isSignedByBob = Alice.verifyDocument(encryptedDoc, Bob.publicKey);
    expect(isSignedByBob, "Everyone should be able to validate a signature using the owner's public key.").toBe(true);
  });

  it('reads unverified content through both method names', () => {
    const signed = Bob.sign(document);
    const reader = new signer();
    expect(reader.read(signed)).toBeNull();
    expect(reader.readUnverified(signed)).toEqual(document);
    expect(reader.readAnyway(signed)).toEqual(document);
  });

  it('rejects a malformed document through both method names', () => {
    expect(() => Alice.readUnverified('')).toThrow('Invalid Signed Document');
    expect(() => Alice.readAnyway('')).toThrow('Invalid Signed Document');
  });
});
