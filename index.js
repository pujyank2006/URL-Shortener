const urlRoute = require("./Routes/url");
const url_analytics = require("./Routes/url_analytics");
const { connectToMongoDb } = require("./connect");
const URL = require("./Models/url");
const staticRoute = require("./Routes/staticRouter");
const userRoute = require("./Routes/user");

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const restrictToLoggedInUserOnly = require("./Middleware/auth");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected!!"))

app.set('view engine', "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server has stated on ${PORT} !!`);
});

// Routes
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/analytics/:shortId", url_analytics);
app.use("/", staticRoute);
app.use("/user", userRoute);