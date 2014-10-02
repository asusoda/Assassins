/**
 * Send emails with Mandrill
 */

'use strict';

var config = require('./../environment');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill);

exports.emailRegistration = function(email) {

}