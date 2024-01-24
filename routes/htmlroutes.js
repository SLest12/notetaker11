const path = require("path")
const router = require("express").Router();

//setting up route for notes page
router.get("/notes", (req,res)=>{

    res.sendFile(path.join(__dirname,"../public/notes.html"))
})