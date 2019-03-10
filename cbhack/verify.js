
const JSR = require('jsrsasign');

var nonce = 0;
function getNonce() {
  return nonce++;
}

var timestamp = 0;
function getTimestamp() {
  return timestamp++;
}


function getHash(data) {
  const text = JSON.stringify(data);
  const sha256 = JSR.crypto.Util.sha256;
  const digest = sha256(text);
  return digest;
}


function getPatientHash(patient, n) {
  const nonce = patient.nonce;
  var records = [].concat(patient.diseases, patient.dosages, patient.prescriptions);
  records.sort(function(a, b) { return a.timestamp - b.timestamp; });
  return getHash([ nonce, (n > -1) ? records.slice(0, n) : records ]);
}


function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}


function verifyPatient(patient, pubKeys) {
  const nonce = patient.nonce;
  var records = [].concat(patient.diseases, patient.dosages, patient.prescriptions);
  records.sort(function(a, b) { return a.timestamp - b.timestamp; });
  for(var n = 0; n < records.length; n++)
  {
    const row = records[n];
    const pubKey = pubKeys[row.accountId].pubKey;
    var rowSansKey = deepcopy(row);
    delete rowSansKey.doctorSignature;
    if(! verifySignature(pubKey, row.doctorSignature, rowSansKey)) return false;
    const h = getPatientHash(patient, n);
    if(h != records[n].prevHash) return false;
  }
  return true;
}

function getFactoryHash(factory, n) {
  const nonce = factory.nonce;
  var records = factory.medicines;
  records.sort(function(a, b) { return a.timestamp - b.timestamp; });
  return getHash([ nonce, (n > -1) ? records.slice(0, n) : records ]);
}

function verifyFactory(factory, pubKey) {
  const nonce = factory.nonce;
  var records = Array.concat(factory.medicines);
  records.sort(function(a, b) { return a.timestamp - b.timestamp});
  for(var n = 0; n < records.length; n++)
  {
    if(! verifySignature(records[n][2], Array.concat(records[n].slice(0, 2). records[n].slice(3, records[n].length)))) return false;
    const h = getFactoryHash(factory, n);
    if(h != records[n].prevHash) return false;
  }
  return true;
}

function getSignature(privKey, data) {
  const text = JSON.stringify(data);
  var rsa = new JSR.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
  rsa.init(privKey);
  rsa.updateString(text);
  const signature = rsa.sign();
  return signature;
}

function verifySignature(pubKey, signature, data) {
  const text = JSON.stringify(data);
  var rsa = new JSR.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
  rsa.init(pubKey);
  rsa.updateString(text);
  return rsa.verify(signature);
}

function createRSAKeys() {
  return JSR.KEYUTIL.generateKeypair("RSA", 1024);
}


module.exports = {
  getNonce,
  getTimestamp,
  getHash,
  getPatientHash,
  getFactoryHash,
  verifyPatient,
  verifyFactory,
  getSignature,
  verifySignature,
  createRSAKeys
};


