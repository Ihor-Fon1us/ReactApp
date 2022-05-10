const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());

let links = [];

const getList = () => {
    return (req, res, next) => {
      try {
        res.status(200).send({links});
      } catch (error) {
        res.status(400).json({ message: error})
      } 
    }
}

const postList = () => {
    return (req, res, next) => {
      try {
        links.push(req.body.link);
        res.status(200).send({links});
      } catch (error) {
        res.status(400).json({ message: error})
      } 
    }
}


router.route('/lists')
    .post(getList())

router.route('/list')
    .post(postList())




module.exports = router;