'use strict';

var mongoose = require('mongoose'),
    Settings = mongoose.model('Settings');
    
/**
 * Start
 */
exports.start = function (req, res, next) {
  if(req.session.authenticated) {
    return res.json(200, {'status': true});
  } else {
    return res.json({'status': false});
  }
};

/**
 * Logout
 */
exports.logout = function (req, res, next) {
  req.session.destroy();
  res.send(201);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  var password = req.body.password;
  if (password){
    Settings.findOne().exec(function (err, settings) {
      if (!settings.validPassword(password)) {
        console.log('failed login with password: '+password);
        return res.send(401, {'status':'Wrong Password'});
      } else {
        // req.session.password = settings.generateHash(password);
        req.session.authenticated = true;
        return res.send(200);
      }
    });
  }
};