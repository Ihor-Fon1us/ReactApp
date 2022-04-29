const express = require('express');
const router1 = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser');
const isAuthorization = require('../controller/isAuth');
const Game = require('../model/game');

const games = new Game();
router1.use(bodyParser.json());




router1.route('/create')
    .post(isAuthorization.isAuthorization(),(req, res) => {
        games.start(req.body.user, (status, id, opponent, x, y) => {
            res.status(200).json({status, id, opponent, x, y});
        });
    })

router1.route('/freegames')
    .get(isAuthorization.isAuthorization(), (req, res) => {
        res.send(games.free);
    })

router1.route('/:id/condition')
    .get(isAuthorization.isAuthorization(), async (req, res) => {
        const condition = await games[req.params.id].getCondition();
        res.status(200).json(condition);
    })

router1.route('/:id/step/:x/:y')
    .post(isAuthorization.isAuthorization(), (req, res) => {
        games[req.params.id].step(req.params.x, req.params.y, req.body.user, (status, winner) => {
            res.status(200).json({status, winner});
        });
    })

module.exports = router1;