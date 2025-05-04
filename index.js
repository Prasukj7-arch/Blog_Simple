import express from "express";
import  bodyParser from "body-parser";
import ejs from "ejs"
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.static("public"));
console.log(__dirname) 
app.use(bodyParser.urlencoded({ extended: true }));
const allBlogsTitle = [];
const allBlogsPara = [];

app.get("/",(req,res)=>{
    res.render(__dirname + "/views/index.ejs")
})

app.get("/create",(req,res)=>{
    const ran = Math.floor(Math.random()*blogMotivationMessages.length);
    const title = blogMotivationMessages[ran];
    res.render(__dirname + "/views/create.ejs", {
        title:title
    } )
})

app.post("/submit", (req, res) => {
    if(req.body["Title"] && req.body["Paragraph"] ){
        allBlogsPara.push(req.body["Paragraph"]);
        allBlogsTitle.push(req.body["Title"]);
        res.redirect("/display");  // ✅ Redirect after storing the blog
    }
    else{
        const ran = Math.floor(Math.random()*blogMotivationMessages.length);
        const title = blogMotivationMessages[ran];
        res.render(__dirname + "/views/create.ejs", {
            title:title
        })    
    }
});

app.get("/display",(req,res)=>{
    const len = allBlogsPara.length;
    const id = len;
    res.render(__dirname + "/views/display.ejs", {
        len:len,
        allBlogsTitle:allBlogsTitle,
        allBlogsPara:allBlogsPara,
        id:id
    })
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

const blogMotivationMessages = [
    "You're just a few steps away from publishing your story — your voice matters.",
    "Write with confidence — your ideas have the power to inspire.",
    "The world is waiting for your perspective. Start writing today!",
    "Don’t hold back — your story deserves to be heard.",
    "Every great blog starts with a single word. Let yours begin now.",
    "You have something valuable to say — share it boldly.",
    "This is your space. Be authentic, be brave, be heard.",
    "Let your words flow. Someone out there needs to read them.",
    "Start writing — perfection can wait, your creativity can’t.",
    "Express yourself. Your blog could be someone’s spark today."
  ];