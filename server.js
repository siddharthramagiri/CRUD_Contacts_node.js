const express = require('express');
const http = require('http');
const connectDb = require('./config/dbConnection');
const dotenv = require("dotenv").config();
const errorhandler = require('./middleware/errorhandler');

const app = express();

connectDb();
app.use(express.json());

// app.get("/api/contacts",(req,res) => {
//     res.status(200).json({message : `Contacts Getting `});
// });

app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorhandler);


const port = process.env.port || 8000;
app.listen(port, () => console.log(`Listening to server ${port}`));