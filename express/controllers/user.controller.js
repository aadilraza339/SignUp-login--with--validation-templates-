
const bcrypt = require("bcrypt");
require('dotenv').config()
const knex = require("../Models/registration");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');


const userRegister = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body.date,'dgfgg')

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err,
                });
            } else {
                req.body['password'] = hash
                knex.register(req.body)
                    .then(() => {
                        res.status(201).json({
                            "Your Account is Created": req.body.email
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(500).json({
                            message: err.toString()
                        })
                    });
            }
        });
    }
}

const userLogin = (req, res, next) => {
    if( req.body.password && req.body.email){
        knex.IsUser('email', req.body.email)
        .then((user) => {
            console.log(user,'fff')
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed: Email not found probably",
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed",
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user[0].user_id,
                            email: user[0].email,
                        },
                        process.env.jwtSecret,
                        {
                            expiresIn: "1d",
                        }
                    );

                    res.clearCookie('token');
                    res.cookie('token',token);
                    res.status(200).json({
                        message: "Auth successful",
                        userDetails: {
                            userId: user[0].user_id,
                            email: user[0].email,
                        }
                    });
                }
                else {
                    res.status(401).json({
                        message: "Auth failed1",
                    });
                }
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
    }
    else {
        res.json({message:'Please fill email, password'})
    } 
}

const getUid = (req,res) => {
	var token = req.cookies.token
	if (!token) return res.status(400).send("Access Denied!, no token entered");

	try { 
	const verified = jwt.verify(token, process.env.jwtSecret);
	return(verified);
	} catch (err) {
	res.status(400).send({ error: "auth failed, check auth-token222" });
	}
}
const newpost = (req, res) => {
	var {userId} = getUid(req, res);
    var  imageUrl = req.body.imageUrl;
	var caption = req.body.caption;  
    if (imageUrl && caption) {
        knex.newpost(userId,caption,imageUrl)
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    }
	else {
        res.json({message:'Please fill imageUrl, caption'})
    }   
	
}

const get_post = (req, res) => {
	try {
        knex.get_post()
        .then((allPost) => {
            res.status(200).send({
                posts: allPost
            });
        })
        .catch((err)=>{
            res.status(400).json(err)
        })	
	  }
	  catch (e) {
		
	  }	
}

module.exports = {
    userRegister,
    userLogin,
    get_post,
    newpost
};
  