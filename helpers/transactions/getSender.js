const axios = require('axios');

function getSender(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.API_URL}/transactions/${id}/sender`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data))
    .catch(error => reject(error));
  });
}

module.exports = getSender;