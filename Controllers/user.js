const { v4: uuidv4 } = require("uuid");

const User = require("../Models/user");
const { setUser } = require("../Service/auth");

async function handleUserSignup (req, res) {
    const {  name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });

    return res.redirect("/login");
}

async function handleUserLogin (req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if(!user){
        return res.render("login", {
            error: "Invalid email or password",
        });
    }

    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}