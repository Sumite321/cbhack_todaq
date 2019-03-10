

const verify = require('./verify');
const create = require('./create');


const createIndividualAccount = require('./helpers/accounts/createIndividualAccount');

async function initIdentity() {
  const keys = verify.createRSAKeys();
  const privKey = keys.prvKeyObj;
  const pubKey = keys.pubKeyObj;

  var accountData = {
  type: 'account',
  data: {
    attributes: {
      'account-type': 'individual',
      'admin-email': 'haael-4@mailinator.com',
      contact: {
        email: 'haael-4@mailinator.com',
        phone: '239482',
        'last-name': 'Adf',
        'first-name': 'Feprio',
        address: {
          city: 'x<vc',
          'postal-code': 'sidhf',
          'province-region': 'wef',
          'street-address-1': 'sdv',
          country: 'PL',
        },
      },
    },
  },
  };

  // accountData = /* ... */;

  const accountId = await createIndividualAccount(accountData);
  console.log(accountId);

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


/*
async function retrieveIdentity(accountId) {
  const privKey = JSON.parse(loadFileFromDisk(accountId + '.key');
  const pubKeyFile = await loadFileFromDisk(accountId + '.pub_file');
  const pubKeyFileProof = await loadFileFromDisk(accountId + '.pub_proof');

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);
  return identity;
}
*/






initIdentity().then(identity => console.log(identity));





