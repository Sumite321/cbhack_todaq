const sampleAccount = {
  type: 'account',
  data: {
    attributes: {
      'account-type': 'individual',
      'admin-email': 'test.app@example.com',
      contact: {
        email: 'test.app@example.com',
        phone: '555-555-5323',
        'last-name': 'App',
        'first-name': 'Test',
        address: {
          city: 'Toronto',
          'postal-code': 'N4N2L1',
          'province-region': 'Ontario',
          'street-address-1': '925 Madison Avenue',
          country: 'CA',
        },
      },
    },
  },
};

const sampleCupcake = {
  flavour: 'chocolate',
  icing: 'chocolate',
  sprinkles: {
    quantity: 41,
    type: 'rainbow',
  },
  candle: {
    colour: 'blue',
    ignited: false,
  },
};

const filedata =  {
    "data": {
    	"type":"file",
    	"attributes":{
    		"payload":{ 
    			"id": "1a3c1e04-ab62-4c44-b4a3-873f5d50c07d",
				 "type": "loyalty-token",
				 "member-type": "gold"
    		}
    	},
    	"relationships":{
    		"initial-account":{
    			"data":{
	    			"type":"account",
    				"id":"cb760530-7304-44df-8966-e2cfff597212"
    			}
    		},
    		"file-type": {
    			"data": {
    				"id": "ddbb8d2fa80f5eeb2c9071026038557571d65db62ba1d32a974c7932dc4a5fa2"
    			}
    		}
    	}
    }
}


module.exports = {
  sampleAccount,
  sampleCupcake,
filedata,
};
