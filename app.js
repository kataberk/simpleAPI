const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://UserAtaberkKizlier:<Password123>@cluster0.9kjzg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express();
app.use(express.json());

 
app.get('/', (req, res) => {
    res.send("I hear ya");
});

app.get('/api/users', (req, res) => {
   

client.connect(err => {
  const collection = client.db("test").collection("users");
 
  collection.find().toArray((error, documents) => {
    if(error){
        throw error;
    }
    res.send(documents)

    });
client.close();
 });
});

app.post('/api/users', (req, res) => {


    client.connect(err => {
        const collection = client.db("test").collection("users");
collection.insertOne(req.body, (error, result) => { 
if(error){
    throw error;
}
 res.send(result.insertedId);
    });
    client.close();

    });


});

app.listen(3000, () => {
    console.log("started");
});


