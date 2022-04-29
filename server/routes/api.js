const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
const isAuthorization = require('../controller/isAuth');

router.use(bodyParser.json());

let user = [];

const login = () => {
    return async (req, res, next) => {
      try {
        const finduser = await user.find((el) => el == req.params.name)
        if(!finduser) {
            user.push(req.params.name);
        const token = jsonwebtoken.sign({name: req.params.name}, "12");
        return res.status(200).cookie('accessToken', token, {maxAge: 3600000, secure: false, httpOnly: true}).json({message: "success"});
        } else {
            return res.status(200).json({massage: "User already exists"});
        }
      } catch (error) {
        res.status(400).json({ message: error})
      } 
    }
}

router.route('/login/:name')
    .post(login());

router.route('/login')
    .post(isAuthorization.isAuthorization(),async (req, res) => {
        const lUser = await user.find((el) => el == req.user.name);
        if(lUser) {
            return res.status(200).json({message: "Authorized", user: req.user.name});
        }
    });



module.exports = router;