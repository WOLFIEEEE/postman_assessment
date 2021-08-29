var axios = require("axios");
const MongoClass = require("./db");
var auth = require("./token");
const env = require("../env.json");

let Mongo = new MongoClass.MongoWrapper(env.database_uri,env.database_name,env.collectionn_name);
Mongo.MongoClient();

async function generatesubpages(category, subpagenumber) {
  category = encodeURIComponent(category);
  try {
    var config = {
      method: "get",
      url:
        "https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=" +
        subpagenumber +
        "&category=" +
        category,
      headers: { Authorization: "Bearer " + token },
    };
    // console.log(config.url);
    const data = await axios(config);
    const array1 = data.data.categories;
    // console.log(array[1])
    // console.log("length of subpagearray"+array1.length)

    if (array1.length != 0) {
      await Mongo.storedata(array1);
      subpagenumber++;
      return generatesubpages(category, subpagenumber);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status == 429) {
        // console.log("to may request we will be waiting here for few second that resume the program")
        return generatesubpages(category, subpagenumber);
      } else if (error.response.status == 403) {
        // console.log("token expired generate the new token and run the program again")
        await auth.generatetoken();
        return generatesubpages(category, subpagenumber);
      }
    } else {
      console.log("some other error ocurred");
      console.error(error);
    }
  }
}

module.exports = {
  generatesubpages,
};
