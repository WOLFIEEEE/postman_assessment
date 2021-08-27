
var axios = require('axios');
var subpagenumber=1;
var token="";
var insert = require("./Modules/db");

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
  generatepages();
}
catch(error)
{
  console.log(error);
}
}


async function nexttoken()
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

var pagesize=1;
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
    return;
    }
  } catch(error) {
    console.log("******************************************************************")
    console.log("catch block runned generate pages runned changing the token")
    console.log("******************************************************************")
    console.log("Previous token "+token)
    const main = await nexttoken();
    console.log("New token "+ token)
    await sleep(6000);
    generatepages()
  }
}

async function generatesubcategory(array)
{
  for(var i =0;i<array.length;i++)
  {
    subpagenumber=1;
    const data2 = await generatesubpages(array[i]);
  }
  return;
}

function storearrayindatabase(array)
{
  insert.run(array);
  console.log("stored in database of array length"+array.length);
}

async function generatesubpages(category)
{ 
  category=encodeURIComponent(category);
  try {
    var config = {
      method: 'get',
      url: 'https://public-apis-api.herokuapp.com/api/v1/apis/entry?page='+subpagenumber+'&category='+category,
      headers: {Authorization: 'Bearer '+token}
    };
    console.log(config.url);
    const data = await axios(config);
    const array= data.data.categories;
    console.log(array[1])
    console.log(array.length)
    await sleep(6000);

    if(array.length!=0)
    {
      storearrayindatabase(array);
      subpagenumber++;
      return generatesubpages(category);
    }
    else
    {
      return;
    }

  } catch(error) {
    console.log("******************************************************************")
    console.log("catch block runned generate subpages runned")
    console.log("******************************************************************")
    console.log("Previous token "+token)
    const main = await nexttoken();
    console.log("New token "+ token)
    await sleep(6000);
    generatesubpages();
  }
}



generatetoken();




