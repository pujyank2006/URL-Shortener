const { nanoid } = require('nanoid');
const URL = require("../Models/url");

async function handleGenerateNewUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required !!" });
    }
    const shortID = nanoid(8);

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitedHistory: [],
    });
    return res.json({ id: shortID });
}

async function handleGet(req, res) {
    const sId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        sId,
    }, {
        $push: {
            visitHistory: { timestamp: Date.now(), }
        }
    });
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewUrl,
    handleGet,
};