var axios = require("axios");
var insert = require("./db");
var auth = require("./token");

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
      await insert.run(array1);
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
      console.log(error);
    }
  }
}

module.exports = {
  generatesubpages,
};
