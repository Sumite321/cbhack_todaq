const axios = require('axios');

function initiateTransaction(data) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.API_URL}/transactions`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data))
    .catch(error => reject(error));
  });
}

module.exports = initiateTransaction;