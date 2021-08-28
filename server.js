
var axios = require('axios');
global.token="";
var insert = require("./Modules/db");
var auth = require("./Modules/token");
var api= require("./Modules/apisubpages");
var pagesize=1;

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function generatepages() {
  try {
    
    var config = {
      method: 'get',
      url: 'https://public-apis-api.herokuapp.com/api/v1/apis/categories?page='+pagesize,
      headers: {Authorization: 'Bearer '+token}
    };
    const data = await axios(config);
    const array= data.data.categories;
    console.log(array.length)
    await sleep(6000);
    pagesize++;
    const var1=await generatesubcategory(array);
    if(array.length !=0)
    {
      console.log("if conndtion runned")
      return generatepages();
    }
    else
    {
    return 0;
    }
  } catch(error) {
    if (error.response) {
    if(error.response.status== 429)
    {
        console.log("to may request we will be waiting here for few second that resume the program")
        await sleep(6000);
        return generatepages();

    }
    else if (error.response.status== 403)
    {
        console.log("token expired generate the new token and run the program again")
        const token1= await auth.generatetoken();
        await sleep(6000);
        return  generatepages();
    }
  }
    else
    {
        console.log("some other error ocurred")
        console.log(error);
    }
  }
}

async function generatesubcategory(array)
{
  for(var i =0;i<array.length;i++)
  {
    const data2 = await api.generatesubpages(array[i],1);
  }
  return;
}

auth.generatetoken().then(generatepages);




