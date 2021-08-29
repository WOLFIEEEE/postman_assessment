const { MongoClient } = require("mongodb");
let client = {};
class MongoWrapper {
  constructor(uri,database_name) {
    this.uri = uri;
    this.database_name=database_name;
  }
  MongoClient() {
    client = new MongoClient(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  async storedata(array,category) {
    try {
      await client.connect();
      const collection = await client
        .db(this.database_name)
        .collection(category);
      await collection.insertMany(array);
      client.close();
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
    MongoWrapper
  };
