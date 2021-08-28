const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://wolfie:wolfie@cluster0.2g3ae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(apidata)
{
    await client.connect();
    const collection = await client.db("Postman").collection("final1");
    const insertone = await collection.insertMany(apidata)
    client.close()
}

module.exports = {
    run
}