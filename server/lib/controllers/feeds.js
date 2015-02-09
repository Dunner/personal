// lib/controllers/feeds.js

var mongoose = require('mongoose'),
    Feed = mongoose.model('Feed');

// List of feed
exports.query = function(req, res) {
  Feed.find().sort('-createdAt').select('-password').limit(10).exec(function(err, feeds) {
    if (err) return res.json(500, err);
    res.json(feeds);
  });
};

// Show a feed
exports.show = function(req, res) {
  Feed.findOne({ 'slug': req.params.slug }).select('-password').exec(function(err, feed) {
    if (err) return res.json(500, err);
    res.json(feed);
  });
};

// Create a feed
exports.create = function(req, res) {
  var feed = new Feed(req.body);
  feed.password = feed.generateHash(feed.password);
  feed.save(function(err) {
    if (err) return res.json(500, err);
    res.json(feed);
  });
};
