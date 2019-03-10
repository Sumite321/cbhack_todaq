const axios = require('axios');

function createFile(data) {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.API_URL}/files`, data, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data))
    .catch(error => reject(error));
  });
}

module.exports = createFile;
