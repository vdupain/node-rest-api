var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GeonamesSchema   = new Schema({
    geonameid :  Number,
    name  :  String,
    asciiname   :  String,
    alternatenames  :  String,
    loc  :       [Number],
    feature_class   :  String,
    feature_code :  String,
    country_code   :  String,
    alternatenames  :  String,
    cc2  :  String,
    admin1         :  String,
    admin2  :  String,
    admin3  :  String,
    admin4  :  String,
    population :  String,
    elevation :  Number,
    dem         :  String,
    timezone :  String,
    modification_date :  String
});

GeonamesSchema.index ({
    loc : "2d",
    asciiname : 1,
    name : 1
});

module.exports = mongoose.model('Geonames', GeonamesSchema);
