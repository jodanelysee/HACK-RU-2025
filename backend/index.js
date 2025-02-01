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
    const recipeCollection = client.db("RecipeInventory").collection("recipes")
    const savedRecipiesCollection = client.db("SavedRecipeInventory").collection("SavedRecipes");
    

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

      app.post("/recipes", async (req, res) => {
        const data = req.body;
        const existing = await recipeCollection.findOne({ name: data.name });
        if (existing) {
            res.status(400).send("Recipe already exists");
            return;
        }
        const result = await recipeCollection.insertOne(data);
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

      app.post("/saved", async (req, res) => {
        const data = req.body;
        const userId = data.userId;
        const recipeId = data.recipeId;
        try {
          // Check if the saved rec exists for the user
          const existingSavedRecipes = await savedRecipiesCollection.findOne({ user: new ObjectId(userId) });
          if (!existingSavedRecipes) {
            console.log("User's cart not found.");
            return res.status(404).send("User's saved recipes not found.");
          }
          // Update the existing cart with the new book ID
          const updatedSavedRecipes = await existingSavedRecipes.updateOne(
            { user: new ObjectId(userId) },
            { $push: { recipies: new ObjectId(recipeId) } }
          );
          console.log("Cart updated:", updatedSavedRecipes.modifiedCount);
          return res.send(updatedSavedRecipes);
        } catch (error) {
          console.error("Error:", error.message);
          return res.status(500).send("Failed to update cart.");
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