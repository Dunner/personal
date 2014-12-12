// lib/controllers/posts.js

var mongoose = require('mongoose'),
    Post = mongoose.model('Post');

// Find post by id and store it in the request
exports.post = function(req, res, next, id) {
  Post.findById(id, function(err, post) {
    if (err) return next(err);
    if (!post) return next();
    req.post = post;
    next();
  });
};

// List of posts
exports.query = function(req, res) {
  Post.find().sort('-createdAt').select('-content').limit(10).exec(function(err, posts) {
    if (err) return res.json(500, err);
    res.json(posts);
  });
};

// Show a post
exports.show = function(req, res) {
  Post.findById(req.params.postId, function (err, post) {
    if(err) { return res.send(err); }
    if(!post) { return res.send(404); }
    return res.json(200, {'content':post.content});
  });
};

// Create a post
exports.create = function(req, res) {
  var post = new Post(req.body);

  post.save(function(err) {
    if (err) return res.json(500, err);
    res.json(post);
  });
};


// Update a post

exports.update = function(req, res) {
  Post.update({ _id: req.post._id }, req.body, { }, function(err, updatedPost) {
    if (err) return res.json(500, err);
    res.json(updatedPost);
  });
};


// Remove a post

exports.remove = function(req, res) {
  var post = req.post;

  post.remove(function(err) {
    if (err) return res.json(500, err);
    res.json(post);
  });
};