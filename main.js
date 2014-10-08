var mongoose = require('mongoose');
var mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
mongoose.connect(mongodbUri);
var Geonames = require('./app/models/geonames');
var gstream = require('geonames-stream');
var through = require('through2');
var fs = require('fs');

fs.createReadStream( 'FR.txt' )
    .pipe( gstream.parser )
    .pipe( through.obj( function( data, enc, next ){
        var geonames = new Geonames({
            geonameid: data._id,
            name: data.name,
            asciiname: data.asciiname,
            alternatenames: data.alternatenames,
            //loc: [fields[4], fields[5]],
            feature_class: data.feature_class,
            feature_code: data.feature_code,
            country_code: data.country_code,
            alternatenames: data.alternatenames,
            cc2: data.cc2,
            admin1: data.admin1_code,
            admin2: data.admin2_code,
            admin3: data.admin3_code,
            admin4: data.admin4_code,
            population: data.population,
            elevation: data.elevation,
            dem: data.dem,
            timezone: data.timezone,
            modification_date: data.modification_date
        });
        geonames.save(function (err) {
            if (err)
                console.log('Error save geonames:', err);
        });
        //console.log(geonames);
        next();
    }));
