/**
 * Send emails with Mandrill
 */

'use strict';

var config = require('./../environment');
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(config.mandrill);

exports.emailRegistration = function(email) {
  var template_name = 'registration-welcome';
  var template_content = [{}];
  var message = {
    'to': [{
      'email': email
    }]
  };
  mandrill_client.messages.sendTemplate({'template_name': template_name, 'template_content': template_content, 'message': message}, function(response) {

  }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
  });
}