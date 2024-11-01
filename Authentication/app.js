//jshint esversion:6

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs")
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption")
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.render("home");
})


app.get("/login", (req, res) => {
    res.render("login");
})


app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    console.log(req.body);

    const newUser = new users({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
    .then((data,err)=>{
        if (data) {
            res.render("secrets");
        } else {
            res.status(500).send("Error");
        }
    });

});

app.post("/login",(req,res)=>{
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;

    users.find({email:email})
    .then((data,err)=>{
        console.log(data)
        if(password===data[0].password){
            res.render("secrets");
        }
        else{
            res.status(500).send("Error");
        }
    })
})
mongoose.connect("mongodb+srv://harsha:harsha@cluster.f46oor5.mongodb.net/Auth");

const userSchema =new mongoose.Schema({
    email: String,
    password: String
});
const secret = "Thisisourlittlesecret."
userSchema.plugin(encrypt ,{secret:secret,encryptedFields :['password'] });


const users = new mongoose.model("User", userSchema)
app.listen(3000, () => {
    console.log("Server started at port 3000 ");
})