import "mocha";
import { expect } from 'chai';
import box from '../src/asymmetric';

const document = {
  test: true
};
let Bob: box;
let Alice: box;

describe('Asymmetric [box]', () => {
  before(()=>{
    Bob = new box();
    Alice = new box();
  })
  it('box.staticSubject should be works', ()=> {
    Bob.staticSubject = Alice.publicKey;
    Alice.staticSubject = Bob.publicKey;
  })

  it('box.encrypt and box.decrypt', () => {
    const encryptedDoc = Bob.encrypt(document);
    const obj = Alice.decrypt(encryptedDoc);
    expect(obj, 'The decrypted secret must be equal to the real secret.')
      .to.be.deep.equals(document);
  });

  it('box.ephemeralEncrypt and box.ephemeralDecrypt', () => {
    const encryptedDoc = Bob.ephemeralEncrypt(document);
    const obj = Alice.ephemeralDecrypt(encryptedDoc);
    expect(obj, 'The decrypted secret must be equal to the real secret.')
      .to.be.deep.equals(document);
  });

  it('box: Occasional Bug Test', () => {
    for (let i = 0; i < 70; i++) {
      const CIA = new box();
      const USAPresident = new box();
      CIA.staticSubject = USAPresident.publicKey;
      USAPresident.staticSubject = CIA.publicKey;
      const CIA_TopSecretMessage = {author: 'CIA', msg: '[S.O.S]: The Aliens are coming!'};
      const CIAEncryptedMessage = CIA.encrypt(CIA_TopSecretMessage);
      const TopSecretMessage = USAPresident.decrypt(CIAEncryptedMessage);
      expect(TopSecretMessage, 'The decrypted secret always must be equal to the real secret.')
        .to.be.deep.equals(CIA_TopSecretMessage);
    }
  });
});
