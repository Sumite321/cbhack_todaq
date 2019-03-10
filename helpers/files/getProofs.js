const axios = require('axios');

function getProofs(id) {
  return new Promise((resolve, reject) => {
    axios.get(`${process.env.API_URL}/files/${id}/files?page=1&limit=100`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data))
    .catch(error => reject(error));
  });
}

module.exports = getFilesById;
