const express = require("express")
const mongoose = require("mongoose")
const multer = require("multer")
const app = express()

require("dotenv").config()

const Recipes = require("./models/Recipies")
const Recipies = require("./models/Recipies")

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        return cb(null, "./public/uploads")
    },
    filename : function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage : storage})

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser : true, useUnifiedTopology : true
})

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended : true}))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})

app.get("/", async (req, res)=>{
    const recipes = await Recipes.find().sort({_id: -1}).limit(12)
    res.render("index", {recipes : recipes})
})

app.get("/recipe/:id", async (req, res) =>{
    const recipe = await Recipes.findById(req.params.id)
    res.render("recipe_details", {recipe : recipe})
})

app.get("/submit", async(req, res)=>{
    res.render("submit_recipe")
})

app.post("/submit-recipe", upload.single("image-file"),async (req, res) =>{

    const imgName = req.file.filename;
    
     const recipie = await Recipies.create({
        title : req.body.title,
        description : req.body.description,
        procedure : req.body.procedure,
        ingredients : req.body.ingredients,
        img : imgName
    })

    console.log(recipie);

    res.redirect(`/recipe/${recipie.id}`)
})