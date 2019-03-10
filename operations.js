

const verify = require('./verify');
const create = require('./create');


const createIndividualAccount = require('./helpers/accounts/createIndividualAccount');
const createFile = require('./helpers/files/createFile');
const getProof = require('./helpers/files/getProofs');


async function initIdentity(email, firstname, lastname) {
  const keys = verify.createRSAKeys();
  const privKey = keys.prvKeyObj;
  const pubKey = keys.pubKeyObj;


  // accountData = /* ... */;

  const accountId = await createIndividualAccount(accountData);

  const pubKeyFile = await createFile(accountId, JSON.stringify(pubKey));
  const pubKeyFileProof = await getProof(pubKeyFile)

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);

  //await Promise.all([
  //  saveFileToDisk(accountId + '.key', JSON.stringify(privKey));
  //  saveFileToDisk(accountId + '.pub_file', pubKeyFile);
  //  saveFileToDisk(accountId + '.pub_proof', pubKeyFileProof);
  //]);

  return identity;
}



async function retrieveIdentity(accountId) {
  const privKey = JSON.parse(loadFileFromDisk(accountId + '.key');
  const pubKeyFile = await loadFileFromDisk(accountId + '.pub_file');
  const pubKeyFileProof = await loadFileFromDisk(accountId + '.pub_proof');

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);
  return identity;
}







//initIdentity().then(identity => console.log(identity));

retrieveIdentity("dab9c5f2-0a78-4231-8495-eafe1409f53c").then(identity => console.log(identity));




