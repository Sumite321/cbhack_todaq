

const verify = require('./verify');
const create = require('./create');



// createAccount() => accountId
// uploadFile(accountId, content) => fileId
// downloadFile(accountId) => content
// getProof(accountId, pubKeyFile) => proofId



function initIdentity() {
  const keys = verify.createRSAKeys();
  const privKey = keys.prvKeyObj;
  const pubKey = keys.pubKeyObj;

  const accountId = createAccount(); // wait
  const pubKeyFile = uploadFile(accountId, JSON.stringify(pubKey)); // wait
  const pubKeyFileProof = getProof(accountId, pubKeyFile); // wait
  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);

  saveFileToDisk(accountId + '.key', JSON.stringify(privKey));
  saveFileToDisk(accountId + '.pub_file', pubKeyFile);
  saveFileToDisk(accountId + '.pub_proof', pubKeyFileProof);

  return identity;
}


function retrieveIdentity(accountId) {
  const privKey = JSON.parse(loadFileFromDisk(accountId + '.key');
  const pubKeyFile = loadFileFromDisk(accountId + '.pub_file');
  const pubKeyFileProof = loadFileFromDisk(accountId + '.pub_proof');

  const identity = create.createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof);
  return identity;
}


var doctorsDB = {};
var factoriesDB = {};
function fetchPublicKeys(patient) {
  for(var doctorId in patient.doctors)
  {
    if(doctorId in doctorsDB) continue;
    const { pubKeyFile, pubKeyFileProof } = patient.doctors[doctorId];
    const pubKey = JSON.parse(downloadFile(doctorId, pubKeyFile)); // wait
    doctorsDB[doctorId] = { pubKey, pubKeyFileProof };
  }

  for(var factoryId in patient.factories)
  {
    if(factoryId in factoriesDB) continue;
    const { pubKeyFile, pubKeyFileProof } = patient.factories[facoryId];
    const pubKey = JSON.parse(downloadFile(factoryId, pubKeyFile)); // wait
    factoriesDB[factoriesId] = { pubKey, pubKeyFileProof };
  }
}


function fetchFactory(factoryId, pubKeyFile) {
  factoriesDB[factoryId] = JSON.parse(downloadFile(factoryId, pubKeyFile));
}


function loadPatientFile(doctorId, patientFileId) {
  const patient = JSON.parse(downloadFile(doctorId, patientFileId));
  fetchPublicKeys(patient);
  verify.verifyPatient(patient, doctorsDB, factoriesDB);
  // display
}


function editPatientFile(patient, doctor)
{
  create.addPrescription(patient, "Viagra", 99, doctor);
  create.addPrescription(patient, "Euthanazol", 2, doctor);
  create.addDosage(patient, "Euthanazol", 1, "factory-id-20398", "XXX666", "factory-id-X", factoriesDB["factory-id-X"].pubKeyFileProof, doctor);
  create.addDisease(patient, "Headache", "Terminal", doctor);
  //...
}


function initPatientCard(accountId) {
  const patient = create.createPatient("John", "William", "Doe", "1976-03-12", "Elm Street 66");
  uploadFile(accountId, JSON.stringify(patient)); // wait
}


function listFiles(accountId) {
  // display
}

function sendFile(fileId, sourceAccount, destinationAccount) {

}



