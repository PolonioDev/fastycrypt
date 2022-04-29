import box from '../src/asymmetric';
const document = {
  test: true
};
let Bob: box;
let Alice: box;
describe('Asymmetric [box]', () => {
  beforeAll(()=>{
    Bob = new box();
    Alice = new box();
  })
  it('box.staticSubject should be works', ()=> {
    expect(()=> {
      Bob.staticSubject = Alice.publicKey;
      Alice.staticSubject = Bob.publicKey;
    }).not.toThrow()
  })

  it('box.encrypt and box.decrypt', () => {
    expect(() => {
      const encryptedDoc = Bob.encrypt(document);
      const obj = Alice.decrypt(encryptedDoc);
      expect(obj).toMatchObject(document);
    }).not.toThrow();
  });

  it('box.ephemeralEncrypt and box.ephemeralDecrypt', () => {
    expect(() => {
      const encryptedDoc = Bob.ephemeralEncrypt(document);
      const obj = Alice.ephemeralDecrypt(encryptedDoc);
      expect(obj).toMatchObject(document);
    }).not.toThrow();
  });

  it('box: Occasional Bug Test', () => {
    expect(() => {
      for (let i = 0; i < 70; i++) {
        const CIA = new box();
        const USAPresident = new box();
        CIA.staticSubject = USAPresident.publicKey;
        USAPresident.staticSubject = CIA.publicKey;
        const CIA_TopSecretMessage = {author: 'CIA', msg: '[S.O.S]: The Aliens are coming!'};
        const CIAEncryptedMessage = CIA.encrypt(CIA_TopSecretMessage);
        const TopSecretMessage = USAPresident.decrypt(CIAEncryptedMessage);
        expect(TopSecretMessage).toMatchObject(CIA_TopSecretMessage);
      }
    }).not.toThrow();
  });
});
