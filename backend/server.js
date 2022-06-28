const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoose = require('mongoose');
const cors = require('cors')

const corsOptions ={
  origin: "*"
}

app.use(cors(corsOptions));

const connectDB = async () =>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect("mongodb+srv://marwan:marwen1999@cluster0.ls9byjq.mongodb.net/collecti?retryWrites=true&w=majority", connectionParams);
        console.log('connected to dabase successfully')
    } catch (error) {
        console.log(error)
        console.log-('could not connect to database')
    }
}
connectDB()

// parse requests of content-type - application/json
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

dotenv.config({path:'.env'})

app.use(morgan("tiny"))

app.get('/', (req,res) =>{
     res.send("Crud application")
})
// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/material.routes")(app);

const port = process.env.PORT || 8080

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`)
 })

function initial() {
     Role.estimatedDocumentCount((err, count) => {
       if (!err && count === 0) {
         new Role({
           name: "user"
         }).save(err => {
           if (err) {
             console.log("error", err);
           }

           console.log("added 'user' to roles collection");
         });

         new Role({
           name: "moderator"
         }).save(err => {
           if (err) {
             console.log("error", err);
           }

           console.log("added 'moderator' to roles collection");
         });

         new Role({
           name: "admin"
         }).save(err => {
           if (err) {
             console.log("error", err);
           }

           console.log("added 'admin' to roles collection");
         });
       }
     });
   }