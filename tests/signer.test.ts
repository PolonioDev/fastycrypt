import signer from '../src/signer';
const document = {
  test: true
};
let Bob: signer;
let Alice: signer;
describe('Signer [sign]', () => {
  beforeAll(()=>{
    Bob = new signer();
    Alice = new signer();
  })

  it('signer.staticSubject should be works', ()=> {
    expect(()=> {
      Bob.staticSubject = Alice.publicKey;
      Alice.staticSubject = Bob.publicKey;
    }).not.toThrow()
  })

  it('signer.sign and signer.read should not throw', () => {
    expect(() => {
      const signed = Bob.sign(document);
      const obj = Alice.read(signed, Bob.publicKey);
      expect(obj).toMatchObject(document);
    }).not.toThrow();
  });

  it('signer.sign and signer.read: signer.read should be throw', () => {
    expect(() => {
      const signed = Bob.sign(document);
      const obj = Alice.read(signed, Alice.publicKey);
      expect(obj).not.toMatchObject(document);
    }).toThrow();
  });

  it('signer.getSignFor', () => {
    expect(() => {
      const encryptedDoc = Bob.sign(document);
      const signature = Alice.getSignFor(encryptedDoc);
      expect(Alice.verify(document, signature as string, Bob.publicKey)).toBe(true);
    }).not.toThrow();
  });

  it('signer.verifyDocument', () => {
    expect(() => {
      const encryptedDoc = Bob.sign(document);
      expect(Alice.verifyDocument(encryptedDoc, Bob.publicKey)).toBe(true);
    }).not.toThrow();
  });

});
