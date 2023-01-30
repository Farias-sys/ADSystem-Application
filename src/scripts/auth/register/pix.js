const Gerencianet = require('gn-api-sdk-node');

require('dotenv').config()

async function getPix(){

const clientID = process.env.GN_CLIENT_ID
const clientSecret = process.env.GN_CLIENT_SECRET

let options = {
    client_id:clientID,
    client_secret: clientSecret,
    certificate:'./certs/producao-430310-ADSystem.p12',
    sandbox:true,
}

var body = {

    payment: {
      banking_billet: {
        expire_at: '2022-01-09', 
        customer: {
          name: 'Carlos Alberto',
          email: 'cafsalgadojr@gmail.com',
          cpf: '14084942723', 
          birth: '2005-01-13', 
          phone_number: '21971205402' ,
        }
      }
    },
  
    items: [{
      name: 'Produto',
      value: 1,
      amount: 1
    }],

  }
  
  var gerencianet = new Gerencianet(options);
  
  await gerencianet
	.createCharge({}, body)
	.then((resposta) => {
		console.log(resposta)
	})
    .catch((error) => {
		console.log(error)
	})
}

module.exports = getPix