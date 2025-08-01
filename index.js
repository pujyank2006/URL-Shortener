const urlRoute = require("./Routes/url");
const url_analytics = require("./Routes/url_analytics");
const { connectToMongoDb } = require("./connect");
const URL = require("./Models/url");

const express = require('express');

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected!!"))

app.use(express.json());

app.get('/test', async (req, res) => {
    const allURLs = await URL.find({});
    return res.end(
        `
        <html>
            <head></head>
            <body>
                <ol>
                    ${allURLs.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
                </ol>
            </body>
        </html>
        `
    )
});
app.listen(PORT, () => {
    console.log(`Server has stated on ${PORT} !!`);
});

// Routes
app.use("/url", urlRoute);
app.use("/analytics/:shortId", url_analytics);