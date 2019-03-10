const axios = require('axios');

function createFile(accountId, data) {
  return new Promise((resolve, reject) => {

    var body = {
    'data': {
    	'type':'file',
    	'attributes':{
    		'payload': data 
        },
    	'relationships':{
    		'initial-account':{
    			'data':{
	    			'type':'account',
    				'id':accountId
    			}
    		},
    		'file-type': {
    			'data': {
    				'id': 'ddbb8d2fa80f5eeb2c9071026038557571d65db62ba1d32a974c7932dc4a5fa2'
    			}
    		}
    	}
    }
    };

    axios.post(`${process.env.API_URL}/files`, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY,
      },
    })
    .then(res => resolve(res.data.data[0].id))
    .catch(error => reject(error));
  });
}

module.exports = createFile;
