'use strict';

var mongoose = require('mongoose'),
  Feed = mongoose.model('Feed');


// Clear old Settings, then add a default Feed
Feed.find({}).remove(function() {
   
   // create the Feed
   var password = 'test',
       name = 'Jonathan\'s Feed',
       slug = 'Jonathan\'s-Feed',
       newFeed  = new Feed();
   
   // set the Feed's local credentials
   newFeed.password = newFeed.generateHash(password);
   newFeed.name = name;
   newFeed.slug = slug;
   
   // save the Feed
   newFeed.save(function(err) {
      if (err)
         console.log(err);
      console.log('dummy feed with password: test');
   });

});