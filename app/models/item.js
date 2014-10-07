var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ItemSchema   = new Schema({
	name: String,
    date: Date
});

module.exports = mongoose.model('Item', ItemSchema);