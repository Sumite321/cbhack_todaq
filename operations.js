

const verify = require('./verify');
const create = require('./create');


const { createIndividualAccount } = require('./helpers/accounts/createIndividualAccount');

async function initIdentity() {
  const keys = verify.createRSAKeys();
  const privKey = keys.prvKeyObj;
  const pubKey = keys.pubKeyObj;

  var accountData = {
  type: 'account',
  data: {
    attributes: {
      'account-type': 'individual',
      'admin-email': '',
      contact: {
        email: '',
        phone: '',
        'last-name': '',
        'first-name': '',
        address: {
          city: '',
          'postal-code': '',
          'province-region': '',
          'street-address-1': '',
          country: '',
        },
      },
    },
  },
  };

  // accountData = /* ... */;

  const accountId = await createIndividualAccount(accountData);

  //const pubKeyFile = await createFile(accountId, JSON.stringify(pubKey));
  //const pubKeyFileProof = await getProof(accountId, pubKeyFile);

  const pubKeyFile = "";
  const pubKeyFileProof = "";

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);

  //await Promise.all([
  //  saveFileToDisk(accountId + '.key', JSON.stringify(privKey));
  //  saveFileToDisk(accountId + '.pub_file', pubKeyFile);
  //  saveFileToDisk(accountId + '.pub_proof', pubKeyFileProof);
  //]);

  return identity;
}


initIdentity().then(identity => console.log(identity));





