env = require('../env.json')

const { MongoClient } = require('mongodb');
const uri = env.database_uri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(apidata)
{
    console.log("stored in db of length"+ apidata.length);
    await client.connect();
    const collection = await client.db(env.database_name).collection(env.collectionn_name);
    const insertone = await collection.insertMany(apidata)
    client.close()
}

module.exports = {
    run
}