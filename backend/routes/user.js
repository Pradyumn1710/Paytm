// backend/routes/user.js
const express = require('express');
const {authMiddleware} = require("../middleware")
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { log } = require('console');
const mongoose = require('mongoose');

router.use(express.json());

const signupBody = zod.object({
    username: zod.string().email(),
	firstname: zod.string(),
	lastname: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
        return res.status(411).json({
            message: "Incorrect inputs",
            errors: result.error.errors // Include detailed error information
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000
    })
    const token = jwt.sign({
        userId
    }, JWT_SECRET);
    console.log("Yes users account is created");
    
    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateBody = zod.object({
    firstname : zod.string(),
    lastname : zod.string(),
    password :zod.string().min(6)
})
router.put("/update",authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            msg:"Password is too small"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(!existingUser){
        return res.status(404).json({
            msg:'No User found'
        })
    }
    existingUser.firstname = req.body.firstname;
    existingUser.lastname = req.body.lastname;
    existingUser.password = req.body.password;
    await existingUser.save();
    res.status(200).json({ msg: "User details updated successfully" });

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                "$regex": filter
            }
        }, {
            lastname: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})
module.exports = router;