const urlRoute = require("./Routes/url");
const url_analytics = require("./Routes/url_analytics");
const { connectToMongoDb } = require("./connect");
const URL = require("./Models/url");
const staticRoute = require("./Routes/staticRouter");

const express = require('express');
const path = require('path');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected!!"))

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server has stated on ${PORT} !!`);
});

// Routes
app.use("/url", urlRoute);
app.use("/analytics/:shortId", url_analytics);
app.use("/", staticRoute);