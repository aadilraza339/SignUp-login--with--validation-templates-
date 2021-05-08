const express = require('express');
const checkAuth = require('../Middleware/checkAuth.middleware');
const userControllers = require('../controllers/user.controller');
const router = express.Router();
const {body, checkSchema, validationResult, Joi} = require('express-validator');
const knex = require("../Models/registration");

const registrationSchema = {
    username: {
        custom: {
            options: value => {
                if (value) {
                    return knex.IsUser('username', value)
                        .then(user => {
                            if (user.length > 0) {
                                return Promise.reject('Username already in use')
                            }
                        })
                }

            }
        },
        errorMessage: "username field cannot be empty"
    },
    gender: {
        notEmpty: true,
        isInt: true
    },
    password: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    phone: {
        notEmpty: true,
        errorMessage: "Phone number cannot be empty"
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                if (value) {
                    return knex.IsUser('email', value)
                        .then(user => {
                            if (user.length > 0) {
                                return Promise.reject('email already in use')
                            }
                        })
                }
            }
        }
    },
    age: {
        notEmpty: true,
        custom: {
            options: date => {
                const regEx = /^\d{4}-\d{2}-\d{2}$/;
                return date.match(regEx) != null;

            }
        }
    }
}


router.post('/sign_up',checkSchema(registrationSchema), userControllers.userRegister);
router.post('/login', userControllers.userLogin);
router.post('/newpost', checkAuth, userControllers.newpost);
router.get('/home', checkAuth, userControllers.get_post);


module.exports = router