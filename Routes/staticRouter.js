const express = require('express');
const router = express.Router();

const URL = require('../Models/url');
const { restrictUser } = require('../Middleware/auth');

router.get('/admin/urls', restrictUser(['ADMIN']), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    });
});

router.get('/', restrictUser(['NORMAL', 'ADMIN']), async (req, res) => {
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) =>{
    return res.render("login");
});

module.exports = router;