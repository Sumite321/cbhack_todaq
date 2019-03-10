

const verify = require('./verify');
const create = require('./create');

const createIndividualAccount = require('./helpers/accounts/createIndividualAccount');
const createFile = require('./helpers/files/createFile');
const getProof = require('./helpers/files/getProofs');

const fs = require('fs');

function saveFileToDisk(filename, dataString) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, dataString, function(err) {
      if(err)
          reject(err);
      else
          resolve(null);
    })
  });
}

function loadFileFromDisk(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function(err, data) {
      if(err)
          reject(err);
      else
          resolve(data);
    });
  });
}

async function initIdentity(email, firstname, lastname) {
  const keys = verify.createRSAKeys();
  const privKey = keys.prvKeyObj;
  const pubKey = keys.pubKeyObj;

  const accountId = await createIndividualAccount(email, firstname, lastname);

  const pubKeyFile = await createFile(accountId, pubKey);
  const pubKeyFileProof = await getProof(pubKeyFile)

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);

  await Promise.all([
    saveFileToDisk(accountId + '.key', JSON.stringify(privKey)),
    saveFileToDisk(accountId + '.pub_file', pubKeyFile),
    saveFileToDisk(accountId + '.pub_proof', pubKeyFileProof)
  ]);

  return identity;
}



async function retrieveIdentity(accountId) {
  const privKey = JSON.parse(await loadFileFromDisk(accountId + '.key'));
  const pubKeyFile = await loadFileFromDisk(accountId + '.pub_file');
  const pubKeyFileProof = await loadFileFromDisk(accountId + '.pub_proof');

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);
  return identity;
}

 



//initIdentity('haael-6@mailinator.com', "Bartek", "T").then(identity => console.log(identity));

retrieveIdentity("0e24b09f-4ea2-4853-8815-93f1ce73454d").then(identity => console.log(identity));




