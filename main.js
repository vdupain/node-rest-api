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
            cc2: fields[9],
            admin1: fields[10],
            admin2: fields[11],
            admin3: fields[12],
            admin4: fields[13],
            population: fields[14],
            elevation: fields[15],
            dem: fields[16],
            timezone: fields[17],
            modification_date: fields[18]
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
