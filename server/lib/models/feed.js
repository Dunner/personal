// models/settings.js

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Schema   = mongoose.Schema;

var feedSchema = new Schema({
    name : String,
    slug : String,
    password : String,
    createdAt: Date,
});

// methods ======================
// generating a hash
feedSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
feedSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Feed', feedSchema);

