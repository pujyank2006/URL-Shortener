const urlRoute = require("./Routes/url");
const url_analytics = require("./Routes/url_analytics");
const { connectToMongoDb } = require("./connect");

const express = require('express');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected!!"))

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server has stated on ${PORT} !!`);
});

// Routes
app.use("/url", urlRoute);
app.use("/:shortId", urlRoute);
app.use("/analytics/:shortId", url_analytics);