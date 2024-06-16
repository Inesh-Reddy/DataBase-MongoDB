/** ASSIGNMENT
 * Create a backend logi that connect with DB.
 * three route /signup. /signin, /users
 *  . /signup --> takes the username, password and firstname and store in BD
 *  . /signin --> checks if the user exist --> if,yes return the jwt else sorry
 *  . /users  --> gets the jwt --->need to verify it and if it passes return all users else sorry.
 */
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtpassword = '123456';
const app = express();

const port = 3000;
app.use(express.json());
mongoose.connect('url');
const User = mongoose.model('Users', {name:String, email: String, password: String});

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({email: username});
    if(existingUser){
        return res.status(400).json({
            msg: 'user already exist'
        })
    }
    const user = new User({
        name : name,
        email: username,
        password : password,
    })
    user.save();
    res.json({
        msg: 'User created succesfully'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`)
})