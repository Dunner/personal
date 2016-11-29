'use strict';

var mongoose = require('mongoose'),
    Feed = mongoose.model('Feed');
    
/**
 * Start
 */
exports.start = function (req, res, next) {
  if(req.session.authenticatedFeed) {
    return res.json(200, {'feedId': req.session.authenticatedFeed});
  } else {
    return res.json({'feedId': false});
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
  var where = req.body.feed;
  var password = req.body.password;
  if (password){
    Feed.findOne({ 'slug': req.body.feed }).exec(function (err, feed) {
      if (!feed.validPassword(password)) {
        console.log('failed login with password: '+password);
        return res.send(401, {'message':'Wrong Password'});
      } else {
        // req.session.password = feed.generateHash(password);
        req.session.authenticatedFeed = feed._id;
        return res.send(200, {'message':'You\'ve logged in!', feedId: feed._id});
      }
    });
  }
};