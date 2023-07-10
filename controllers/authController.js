const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


exports.signUp = async (req, res, next) => {
    const { username, password } = req.body; 
    try{
        const hashedpassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username: username,
            password: hashedpassword
        });
        req.session.user = user;
        res.status(201).json({
            status: "Success",
            data: {
                user
            }
        });
    }catch(e){
        console.log(e);
        res.status(400).json({
            status: "Failure"
        })
    }
}

exports.logIn = async (req, res, next) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username});

        if (!user){
            res.status(404).json({
                status: "Failure",
                message: "user not found"
            });
            return
        }

        const isCorrect = await bcrypt.compare(password, user.password);
        
        if (isCorrect){
            req.session.user = user;
            res.status(200).json({
                status: 'success',
            });
        } else {
            res.status(400).json({
                status: "failure",
                message: "Incorrect password or username"
            });
        }
        
    }catch (e) {
        console.log(e);
        res.status(400).json({
            status: "Failure"
        })
    }
}