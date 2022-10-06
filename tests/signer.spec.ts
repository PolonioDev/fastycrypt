import { expect } from 'chai';
import signer from '../src/signer';
const document = {
  test: true
};
let Bob: signer;
let Alice: signer;
describe('Signer [sign]', () => {
  before(()=>{
    Bob = new signer();
    Alice = new signer();
  })

  it('signer.staticSubject should be works', ()=> {
    Bob.staticSubject = Alice.publicKey;
    Alice.staticSubject = Bob.publicKey;
  })

  it('signer.sign and signer.read should not throw', () => {
    const signed = Bob.sign(document);
    const obj = Alice.read(signed, Bob.publicKey);
    expect(obj, 'The signed document must be equal to initial document.')
      .to.be.deep.equals(document);
  });

  it('signer.sign and signer.read: signer.read should be throw', () => {
    const signed = Bob.sign(document);
    const obj = Alice.read(signed, Alice.publicKey);
    expect(obj, 'The signed document must not be read using the public key of third parties.')
      .to.be.null;
  });

  it('signer.getSignFor', () => {
    const encryptedDoc = Bob.sign(document);
    const signature = Alice.getSignFor(encryptedDoc);
    const isDocumentSignedByBob = Alice.verify(document, signature as string, Bob.publicKey);
    expect(isDocumentSignedByBob, 'Everyone should be able to obtain a document\'s signature.')
      .to.be.true;
  });

  it('signer.verifyDocument', () => {
    const encryptedDoc = Bob.sign(document);
    const isSignedByBob = Alice.verifyDocument(encryptedDoc, Bob.publicKey);
      expect(isSignedByBob, 'Everyone should be able to validate a signature using the owner\'s public key.')
        .to.be.true;
  });

});
