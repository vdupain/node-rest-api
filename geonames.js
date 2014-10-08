// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
var mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
mongoose.connect(mongodbUri); // connect to our database
var Geonames = require('./app/models/geonames');


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'Welcome to our API!' });
});

router.route('/geonames/count')

    .get(function (req, res) {
            Geonames.count({}, function (err, count) {
            if (err)
                res.send(err);
            res.json(count);
        });
    });

router.route('/geonames')

    // get all the geonames (accessed at GET http://localhost:8080/api/geonames)
    .get(function (req, res) {
        var page = req.param('page') || 1
        var limit = req.param('limit') || 10
            Geonames.paginate({}, page, limit, function(err, pageCount, paginatedResults, itemCount)   {
                Geonames
            if (err)
                res.send(err);
                console.log('Pages:', pageCount);
                console.log('itemCount:', itemCount);
            res.json(paginatedResults);
        });
    });

// on routes that end in /geonames/:geonames_id
// ----------------------------------------------------
router.route('/geonames/:geonames_id')

    // get the geonames with that id
    .get(function (req, res) {
        Geonames.findById(req.params.geonames_id, function (err, geonames) {
            if (err)
                res.send(err);
            res.json(geonames);
        });
    })


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port %d in %s mode, mongodb:', port, app.settings.env, mongodbUri);
