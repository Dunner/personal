'use strict';

var mongoose = require('mongoose'),
  Settings = mongoose.model('Settings');


// Clear old Settings, then add a default Settings
Settings.find({}).remove(function() {
   
   // create the Settings
   var password               = 'test';
   var newSettings            = new Settings();
   
   // set the Settings's local credentials
   newSettings.password = newSettings.generateHash(password);
   
   // save the Settings
   newSettings.save(function(err) {
      if (err)
         console.log(err);
      console.log('dummy settings with password: test');
   });

});