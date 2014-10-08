var geonames = require('geonames-stream'),
    fs = require('fs');

fs.createReadStream( 'FR.txt' )
  .pipe( geonames.parser )
  .pipe( geonames.stringify )
  .pipe( process.stdout );
