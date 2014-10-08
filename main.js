var mongoose = require('mongoose');
var mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
mongoose.connect(mongodbUri);
var carrier = require('carrier');
var Geonames = require('./app/models/geonames');
var fs = require('fs');
var inStream = fs.createReadStream('FR.txt', {flags: 'r'});

carrier.carry(inStream)
    .on('line', function (line) {

        var fields = line.split('\t');
        var geonames = new Geonames({
            geonameid: fields[0],
            name: fields[1],
            asciiname: fields[2],
            alternatenames: fields[3],
            loc: [fields[4], fields[5]],
            feature_class: fields[6],
            feature_code: fields[7],
            country_code: fields[8],
            alternatenames: fields[9],
            cc2: fields[10],
            admin1: fields[11],
            admin2: fields[12],
            admin3: fields[13],
            admin4: fields[14],
            population: fields[15],
            elevation: fields[16],
            dem: fields[17],
            timezone: fields[18],
            modification_date: fields[19]
        });
        console.log(geonames);
        geonames.save(function (err) {
            if (err)
                console.log('Error save geonames');
        });
    }
)
    .on('end', function () {
        console.log('end');
        process.exit(1);
    }
);