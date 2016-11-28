'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  auth: function auth(req, res, next) {
    var feedId = req.params.feedId;
    if (req.session.authenticatedFeed == feedId) return next();
    res.redirect('/');
  }

};