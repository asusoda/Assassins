'use strict';

var express = require('express');
var controller = require('./game.controller');
var updateCtrl = require('./update.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/:id/join/:join_key', controller.resetJoinKey);
router.get('/:id/users/:user_id', controller.checkUser);
router.get('/:id/admins', controller.getAdmins);
router.get('/:id/admins/:user_id', controller.checkAdmin);
router.put('/:id/admins/:user_id', controller.addAdmin);
router.delete('/:id/admins/:user_id', controller.removeAdmin);
router.post('/:id/players', controller.addPlayer);
router.get('/:id/players', controller.getPlayers);
router.get('/:id/players/:player_id', controller.getPlayer);
router.delete('/:id/players/:player_id', controller.removePlayer);

// Game targets
router.put('/:id/players/:player_id/targets/:target_id', controller.assignTarget);
router.get('/:id/players/:player_id/targets', controller.getTargets);
router.get('/:id/players/:player_id/targets/:target_id', controller.getTarget);
router.put('/:id/players/:player_id/targets/:target_id', controller.updateTarget);
router.delete('/:id/players/:player_id/targets/:target_id', controller.removeTarget);

// Game updates
router.post('/:id/updates', updateCtrl.create);
router.get('/:id/updates', updateCtrl.index);
router.get('/:id/updates/:update_id', updateCtrl.show);
router.put('/:id/updates/:update_id', updateCtrl.update);
router.delete('/:id/updates/:update_id', updateCtrl.destroy);


router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;