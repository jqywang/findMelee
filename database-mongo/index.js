var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var listingSchema = mongoose.Schema({
  quantity: Number,
  description: String
});

var Listing = mongoose.model('Listing', listingSchema);

var selectAll = function(location, callback) {
  Listing.find({}, function(err, listings) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, listings);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.listing = Listing;