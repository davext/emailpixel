const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = process.env.mongoURI

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

    const collection = client.db("emailTracker").collection("emails");


    collection.deleteMany({}).then(() => {
        console.log("Gone")

        return;
    })

});


