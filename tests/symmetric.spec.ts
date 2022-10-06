import { expect } from 'chai';
import secretbox from '../src/symmetric';
const document = {
  test: true
};
let Bob: secretbox;
let Alice: secretbox;
describe('Symmetric [secretbox]', () => {
  before(()=>{
    Bob = new secretbox();
    Alice = new secretbox();
  })

  it('secretbox.encrypt and secretbox.decrypt', () => {
    const encryptedDoc = Bob.encrypt(document);
    let obj = Bob.decrypt(encryptedDoc);
    expect(obj, 'The secret must be decrypted by the owner.')
      .to.be.deep.equals(document);

    obj = Alice.decrypt(encryptedDoc);
    expect(obj, 'The secret must not be decrypted by third parties.')
      .to.be.null;
  });

  it('secretbox: Occasional Bug Test', () => {
    for (let i = 0; i < 70; i++) {
      const Safe = new secretbox();
      const MySecret = {
        email: 'bob@mail.com',
        password: 'bob&aliceloveforever'
      };
      const MyEncryptedSecret = Safe.encrypt(MySecret);
      const MyDecryptedSecret = Safe.decrypt(MyEncryptedSecret);
      expect(MyDecryptedSecret, 'The decrypted secret always must be equal to the real secret.')
        .to.be.deep.equals(MySecret);
    }
  });
});
