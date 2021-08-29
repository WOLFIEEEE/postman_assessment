var axios = require("axios");
global.token = "";
var auth = require("./Modules/token");
var subapi = require("./Modules/apisubpages");

class Api {
  constructor(pagenumber) {
    this.pagenumber = pagenumber;
  }

  async generatepages() {
    try {
      var config = {
        method: "get",
        url: `https://public-apis-api.herokuapp.com/api/v1/apis/categories?page=${this.pagenumber}`,
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = await axios(config);
      const array = data.data.categories;
      this.pagenumber++;
      await this.generatesubcategory(array);
      if (array.length != 0) {
        return this.generatepages();
      }
      console.log("All api's detials has been uploaded to database");
    } catch (error) {
      if (error.response) {
        if (error.response.status == 429) {
          return this.generatepages();
        } else if (error.response.status == 403) {
          const token1 = await auth.generatetoken();
          return this.generatepages();
        }
      } else {
        console.error(error);
      }
    }
  }

  async generatesubcategory(array) {
    for (var i = 0; i < array.length; i++) {
      const data2 = await subapi.generatesubpages(array[i], 1);
    }
  }
}

let start = new Api(1);
auth.generatetoken().then(start.generatepages());
