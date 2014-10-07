// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://192.168.59.103:27017/'); // connect to our database
var Item     = require('./app/models/item');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to our Item API!' });
});

// on routes that end in /items
// ----------------------------------------------------
router.route('/items')

	// create a item (accessed at POST http://localhost:8080/items)
	.post(function(req, res) {
		
		var item = new Item();		// create a new instance of the Item model
		item.name = req.body.name;  // set the items name (comes from the request)

		item.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Item created!'});
		});

		
	})

	// get all the items (accessed at GET http://localhost:8080/api/items)
	.get(function(req, res) {
		Item.find(function(err, items) {
			if (err)
				res.send(err);

			res.json(items);
		});
	});

// on routes that end in /items/:item_id
// ----------------------------------------------------
router.route('/items/:item_id')

	// get the item with that id
	.get(function(req, res) {
		Item.findById(req.params.item_id, function(err, item) {
			if (err)
				res.send(err);
			res.json(item);
		});
	})

	// update the item with this id
	.put(function(req, res) {
		Item.findById(req.params.item_id, function(err, item) {

			if (err)
				res.send(err);

			item.name = req.body.name;
			item.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Item updated!' });
			});

		});
	})

	// delete the item with this id
	.delete(function(req, res) {
		Item.remove({
			_id: req.params.item_id
		}, function(err, item) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Listening on port %d in %s mode', port, app.settings.env);
