var axios = require("axios");
const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

async function generatetoken() {
  var config = {
    method: "get",
    url: "https://public-apis-api.herokuapp.com/api/v1/auth/token",
    headers: {},
  };

  
  try {
    const data2 = await axios(config);
    token = data2.data.token;
    //   console.log(token);
  } catch (error) {
    if (error.response) {
      if (error.response.status == 429) {
        return generatetoken();
      }
    } else {
      console.log(error);
    }
  }
}

module.exports = {
  generatetoken,
};
