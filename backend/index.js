const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors')

//middleware
app.use(cors())
app.use(express.json())

//mongodb password: pRBB2km5r7BKPur7


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Connect to MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:pRBB2km5r7BKPur7@hackru.v2fpn.mongodb.net/?retryWrites=true&w=majority&appName=HackRU";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})