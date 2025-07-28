const express = require('express');

const router = express.Router();
const { handleAnalytics } = require("../Controllers/url_analytics");

router.get("/", handleAnalytics);

module.exports = router;