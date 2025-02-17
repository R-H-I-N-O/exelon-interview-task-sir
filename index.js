const express = require('express');
require('dotenv').config()
const cors = require("cors");
const db = require("./config/mongoose");
const scrapeProducts = require('./services/scraper');
const routes = require("./routes/routes");

const app = express();

scrapeProducts();

// middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// routes
app.use('/api', routes);

app.listen(process.env.PORT, ()=>{
    console.log("server started");
});