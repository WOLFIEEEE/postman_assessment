var axios = require('axios');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
async function generatetoken()
{
var config = {
  method: 'get',
  url: 'https://public-apis-api.herokuapp.com/api/v1/auth/token',
  headers: { }
};
await sleep(6000);

try{
  const data2 = await axios(config);
  token=data2.data.token;
  console.log(token);
}
catch(error)
{
  console.log(error);
}
}


module.exports = {
    generatetoken
}