const express = require('express');
const core = require('./js/core.js');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongourl = 'mongodb://localhost:27017/robots';
const mustacheExpress = require('mustache-express');
const port = 3000;

var app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

let DB;
let userCollection;

MongoClient.connect(mongourl, (err, db)=>{
    if(err){
        console.log(err);
    }
    else {
        DB=db;
        userCollection = db.collection("users");
    }
});


app.use(express.static("./public"));
app.use(express.static("./js"));





app.get("/", (req,res) => {
    userCollection.find({}).toArray((err, foundStuff)=>{
        console.log(foundStuff);
        res.render("main", {users: foundStuff});
    });
});

app.get("/employed", (req, res) => {
    userCollection.find({ job: { $ne: null }}).toArray((err, foundStuff) => {
        res.render("employed", {users: foundStuff}); 
    });
});

app.get("/unemployed", (req, res) => {
    userCollection.find({ job: null }).toArray((err, foundStuff) => {
        res.render("unemployed", {users: foundStuff}); 
    });
});


app.get("/user/:id", (req, res)  => {

    userCollection.findOne({_id: ObjectId(req.params.id)}, (err, foundUser) =>{
    
        res.render("user", foundUser);
    });
});

app.listen(port, ()=> console.log("Server running at: ", port));
