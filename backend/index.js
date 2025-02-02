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
      strict: false,
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
    const savedrecipesCollection = client.db("SavedInventory").collection("saved");
    const ObjectId = require('mongodb').ObjectId;
    

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
        const { userId, recipeId } = req.body;
        try {
          const updatedSavedRecipes = await savedrecipesCollection.updateOne(
            { user: new ObjectId(userId) },
            { $addToSet: { recipes: new ObjectId(recipeId) } }, // Use `$addToSet` to prevent duplicates
            { upsert: true } // Create the document if it doesn't exist
          );
      
          res.send(updatedSavedRecipes);
        } catch (error) {
          console.error("Error:", error.message);
          res.status(500).send("Failed to update saved recipes.");
        }
      });
      

      app.get("/saved/:id", async (req, res) => {
        try {
          const { id } = req.params;
          const savedRecipes = await savedrecipesCollection.findOne({ user: new ObjectId(id) });
      
          if (!savedRecipes) {
            return res.status(404).json({ message: "Saved Recipes not found for the user ID." });
          }
      
          // Fetch full recipe details
          const recipes = await recipeCollection.find({
            _id: { $in: savedRecipes.recipes } // Use `$in` to find all matching recipe IDs
          }).toArray();
      
          res.json({ recipes });
        } catch (error) {
          console.error("Error fetching saved recipes:", error);
          res.status(500).json({ message: "Server error." });
        }
      });
      

      app.get("/all-recipes", async (req, res) => {
        let query = {};
        if (req.query?.userID) {
          query.user = new ObjectId(req.query.userID);
        }
        if (req.query?.ingredients) {
          query.ingredients = req.query.ingredients;
        }
        const result = await recipeCollection.find(query).toArray();
        res.send(result);
      })

      app.delete("/saved/:userId/:recipeId", async (req, res) => {
        const { userId, recipeId } = req.params;
        try {
          // Find the user's saved recipes
          const savedRecipes = await savedrecipesCollection.findOne({ user: new ObjectId(userId) });
          if (!savedRecipes) {
            return res.status(404).send("User's saved recipes not found.");
          }
      
          // Remove the recipe from the saved recipes array
          const updatedSavedRecipes = await savedrecipesCollection.updateOne(
            { user: new ObjectId(userId) },
            { $pull: { recipes: new ObjectId(recipeId) } }
          );
      
          if (updatedSavedRecipes.modifiedCount === 0) {
            return res.status(404).send("Recipe not found in saved recipes.");
          }
      
          res.send({ success: true, message: "Recipe removed from saved recipes." });
        } catch (error) {
          console.error("Error:", error.message);
          res.status(500).send("Failed to delete recipe.");
        }
      });

    app.get("/recipe/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await recipeCollection.findOne(filter);
        res.send(result);
      })

      app.get("/all-users", async (req, res) => {
        const users = userCollection.find();
        const result = await users.toArray();
        res.send(result);
      })

      app.get("/user/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await userCollection.findOne(filter);
        res.send(result);
      })

      app.get("/recipe-search", async (req, res) => {
        const query = req.query.search;
        const result = await recipeCollection.aggregate([
            {
                $search: {
                    "index": "searchByIngredient", // Use your index name here
                    "phrase": {
                        "query": query,
                        "path": "ingredients", // Field to search in
                        "slop": 2 // Optional: allows for proximity matching
                    }
                }
            }
        ]).toArray();
    
        res.send(result);
    });
    


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