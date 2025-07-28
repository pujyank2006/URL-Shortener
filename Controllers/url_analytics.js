const URL = require("../Models/url");

async function handleAnalytics (req, res) {
    const sId = req.params.shortId;
    const site = await URL.findOne({
        sId,
    });
    return res.json({
        totalclicks: site.visitHistory.length,
        analytics: site.visitHistory,
    });
}

module.exports = {
    handleAnalytics,
};