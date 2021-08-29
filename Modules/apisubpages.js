var axios = require("axios");
const MongoClass = require("./db");
var auth = require("./token");
const env = require("../env.json");

let Mongo = new MongoClass.MongoWrapper(
  env.database_uri,
  env.database_name,
  env.collectionn_name
);
Mongo.MongoClient();

async function generatesubpages(category, subpagenumber) {
  category = encodeURIComponent(category);
  try {
    var config = {
      method: "get",
      url: `https://public-apis-api.herokuapp.com/api/v1/apis/entry?page=${subpagenumber}&category=${category}`,
      headers: { Authorization: "Bearer " + token },
    };
    const data = await axios(config);
    const array1 = data.data.categories;

    if (array1.length != 0) {
      console.log(
        `Storing api's of category ${category} of page ${subpagenumber} in database`
      );
      await Mongo.storedata(array1);
      subpagenumber++;
      return generatesubpages(category, subpagenumber);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status == 429) {
        return generatesubpages(category, subpagenumber);
      } else if (error.response.status == 403) {
        await auth.generatetoken();
        return generatesubpages(category, subpagenumber);
      }
    } else {
      console.error(error);
    }
  }
}

module.exports = {
  generatesubpages,
};
