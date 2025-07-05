import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js"; // mandatory to put the extension
import {db} from "./config/db.js"
import { favoritesTable } from "./db/schema.js"; // since {db} not working, this is to import single table

const app = express();
const PORT = ENV.PORT || 8082;

app.use(express.json());

app.use(cors());


app.get("/api/health", (req, res) => {
    res.status(200).json({success:true});
})

app.post("/api/favorites", async(req,res) => {
    try {
        const {userId, recipeId, title, image, cookTime, servings} = req.body;

        if(!userId || !recipeId || !title){
            return res.status(400).json({error: "Missing required fields"});
        }
        
        const newFavorite = await db.insert(favoritesTable)
        .values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings,
        })
        .returning();

        res.status(201).json(newFavorite[0])

    } catch (error)
     {
        console.log("Error adding favorite", error);
        res.status(500).json({error: "Something went wrong"});
    }
})

app.post("/api/favorites/:userId/:recipeId", async (req, res) => {
    try {
        const {userId, recipeId} = req.params
    } catch (error) {
        console.log("Error removing favorite", error);
        res.status(500).json({error: "Something went wrong"});
    }
})


app.listen(PORT, () =>{
    console.log("Server is running on PORT: ", PORT);
});