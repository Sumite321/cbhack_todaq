const axios = require('axios');

function createIndividualAccount(email, firstname, lastname) {
  return new Promise((resolve, reject) => {

  var accountData = {
  type: 'account',
  data: {
    attributes: {
      'account-type': 'individual',
      'admin-email': email,
      contact: {
        email: email,
        phone: '',
        'last-name': lastname,
        'first-name': firstname,
        address: {
          city: 'x',
          'postal-code': 'x',
          'province-region': 'x',
          'street-address-1': 'x',
          country: 'PL',
        },
      },
    },
  },
  };

    axios.post(`${process.env.API_URL}/accounts`, accountData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data[0].id))
    .catch(error => reject(error));
  });
}

module.exports = createIndividualAccount;
