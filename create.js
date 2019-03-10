
const {
  getNonce,
  getTimestamp,
  getHash,
  getPatientHash,
  getFactoryHash,
  verifyPatient,
  verifyFactory,
  getSignature,
  verifySignature
} = require('./verify');


function createIdentity(accountId, privKey, pubKeyFile, pubKeyFileProof) {
  return { accountId, privKey, pubKeyFile, pubKeyFileProof };
}

function createPatient(firstname, middlenames, surname, birthdate, address) {
  const nonce = getNonce();
  return { 'id':nonce, 'firstname':firstname, 'middlenames':middlenames, 'surname':surname, 'address':address, 'birthdate':birthdate, 'diseases':[], 'dosages':[], 'prescriptions':[], 'doctors':{}, 'factories':{} };
}

function addPrescription(patient, medicine, amount, doctor) {
  const { accountId, privKey, pubKeyFile, pubKeyFileProof } = doctor;
  const timestamp = getTimestamp();
  const prevHash = getPatientHash(patient);
  const doctorSignature = getSignature(privKey, { timestamp, prevHash, accountId, medicine, amount });
  patient.prescriptions.push({ timestamp, prevHash, doctorSignature, accountId, medicine, amount, prevHash });
  patient.doctors[accountId] = { pubKeyFile, pubKeyFileProof };
  return patient;
}

function addDisease(patient, disease, severity, doctor) {
  const { accountId, privKey, pubKeyFile, pubKeyFileProof } = doctor;
  const timestamp = getTimestamp();
  const prevHash = getPatientHash(patient);
  const doctorSignature = getSignature(privKey, { timestamp, prevHash, accountId, disease, severity });
  patient.diseases.push({ timestamp, prevHash, doctorSignature, accountId, disease, severity });
  patient.doctors[accountId] = { pubKeyFile, pubKeyFileProof };
  return patient;
}

function addDosage(patient, medicine, amount, factoryId, productionSeries, factoryPubKeyFile, factoryPubKeyFileProof, doctor) {
  const { accountId, privKey, pubKeyFile, pubKeyFileProof } = doctor;
  const timestamp = getTimestamp();
  const prevHash = getPatientHash(patient);
  const doctorSignature = getSignature(privKey, { timestamp, prevHash, accountId, medicine, amount, factoryId, productionSeries });
  patient.dosages.push({ timestamp, prevHash, doctorSignature, accountId, medicine, amount, factoryId, productionSeries });
  patient.doctors[accountId] = { pubKeyFile, pubKeyFileProof };
  patient.factories[factoryId] = { factoryPubKeyFile, factoryPubKeyFileProof };
  return patient;
}

function createMedicine(medicine, productionSeries, factory) {
  const timestamp = getTimestamp();
  const prevHash = getHash(factory);
  const factorySignature = getSignature(factory.privKey, { timestamp, prevHash, medicine, productionSeries });
  return { timestamp, prevHash, factorySignature, medicine, productionSeries };
}


module.exports = {
  createIdentity,
  createPatient,
  addPrescription,
  addDisease,
  addDosage,
  createMedicine,
};

