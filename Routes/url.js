const express = require('express');

const router = express.Router();
const { handleGenerateNewUrl, handleGet} = require("../Controllers/url");

router.post("/", handleGenerateNewUrl);
router.get("/:shortId", handleGet);

module.exports = router;