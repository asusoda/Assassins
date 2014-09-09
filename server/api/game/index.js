'use strict';

var express = require('express');
var controller = require('./game.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/:id/admins/:user_id', controller.checkAdmin);
router.put('/:id/admins/:user_id', controller.addAdmin);
router.delete('/:id/admins/:user_id', controller.removeAdmin);
router.put('/:id/players/:user_id', controller.addPlayer);
router.get('/:id/players/:user_id', controller.checkPlayer);
router.delete('/:id/players/:user_id', controller.removePlayer);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;