// models/post.js

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Todo Schema

var PostSchema = new Schema({
  title: String,
  excerpt: String,
  content: String,
  completed: Boolean,
  inFeed: String,
  createdAt: Date,
  updatedAt: Date,
});

// keep track of when posts are updated and created
PostSchema.pre('save', function(next, done){
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('Post', PostSchema);