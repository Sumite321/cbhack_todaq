const axios = require('axios');

async function createIndividualAccount(data) {
  return Promise((resolve, reject) => {
    axios.post(`${process.env.API_URL}/accounts`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data))
    .catch(error => reject(error));
  });
}

module.exports = createIndividualAccount;
