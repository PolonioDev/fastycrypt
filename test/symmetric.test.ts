import secretbox from '../src/symmetric';
const document = {
  test: true
};
let Bob: secretbox;
let Alice: secretbox;
describe('Symmetric [secretbox]', () => {
  beforeAll(()=>{
    Bob = new secretbox();
    Alice = new secretbox();
  })

  it('secretbox.encrypt and secretbox.decrypt', () => {
    expect(() => {
      const encryptedDoc = Bob.encrypt(document);
      const obj = Bob.decrypt(encryptedDoc);
      expect(obj).toMatchObject(document);
    }).not.toThrow();

    expect(() => {
      const encryptedDoc = Bob.encrypt(document);
      const obj = Alice.decrypt(encryptedDoc);
      expect(obj).not.toMatchObject(document);
    }).toThrow();
  });

  it('secretbox: Occasional Bug Test', () => {
    expect(() => {
      for (let i = 0; i < 70; i++) {
        const Safe = new secretbox();
        const MySecret = {
          email: 'bob@mail.com',
          password: 'bob&aliceloveforever'
        };
        const MyEncryptedSecret = Safe.encrypt(MySecret);
        const MyDecryptedSecret = Safe.decrypt(MyEncryptedSecret);
        expect(MyDecryptedSecret).toMatchObject(MySecret);
      }
    }).not.toThrow();
  });
});
