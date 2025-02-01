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

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    tls: true, // Enable TLS/SSL
    serverSelectionTimeoutMS: 50000, // Increase server selection timeout
    connectTimeoutMS: 40000, // Increase connection timeout
  });

async function run() {
  try {
    await client.connect();

    //creating collection
    const userCollection = client.db("UserInventory").collection("users");
    const recipeCollection = client.db("recipeInventory").collection("recipes");
    

    app.post("/register", async (req, res) => {
        // check if email already exists
        const data = req.body;
        const existing = await userCollection.findOne({ email: data.email });
        if (existing) {
          res.status(400).send("Email already exists");
          return;
        }
        const result = await userCollection.insertOne(data);
        console.log(result)
        res.send(result)
      })

      app.post("/login", async (req, res) => {
        const { email, password } = req.body;
        const user = await userCollection.findOne({ email, password });
  
        if (user) {
          // User exists and credentials are correct
          res.status(200).json({ success: true, message: "Login successful", user });
        } else {
          // User does not exist or credentials are incorrect
          res.status(401).json({ success: false, message: "Incorrect email or password" });
        }
      });

      app.get("/all-users", async (req, res) => {
        const users = userCollection.find();
        const result = await users.toArray();
        res.send(result);
      })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})