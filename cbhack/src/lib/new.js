const { sampleAccount } = require('./data');
const {sampleCupcake } = require('./data');
const { filedata } = require('./data');
const createIndividualAccount = require('./helpers/accounts/createIndividualAccount');
const createFiles = require('./helpers/files/CreateFiles');
const getFilesByAccount = require('./helpers/accounts/getFilesByAccount');

// const getAccountById = require('./helpers/accounts/getAccountById');

require('dotenv').config();

// Simple, repeatable pattern for hitting up the TaaS API
// Code can be run with ```npm run new```
// All TaaS endpoints can be called from a function in src/lib/helpers

//createIndividualAccount(sampleAccount).then(data => console.log(data));
//createFiles(filedata).then(data => console.log(data));
//console.log(filedata);




// gets all the files in array form
getFilesByAccount(process.env.ACCOUNT_1).then(data => console.log(data.length));

console.log
// getAccountById(id).then(data => console.log(data));
