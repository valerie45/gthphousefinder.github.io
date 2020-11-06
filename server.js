const express = require('express'); // import dependencies
var bodyParser = require('body-parser');
const path = require('path');
const searchFile = require('./searchFile.js')

const app = express();   //create an instance of express
const PORT = process.env.PORT || 5000  //Specify the port to lsiten on

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.static(__dirname + '/public')); //allows files in /public to be loaded in the Express server
app.use(express.static(__dirname + '/')); //allows all files to be loaded in the Express server (I think?)


//******* ROUTES ************//

//The landing page of the website.
app.get('/', (request, response) => {
	results = null;
	response.render('pages/index', { results });
});

//Runs when the user navigates to <some_url>/search. 
//Currently runs a search, logs the results to console, and then displays the main page.
app.post('/search', urlencodedParser, function(req, res) {

	//Calls function search() in searchFile.js

	// searchParameters = `zip:${req.body.zip} price min:${req.body.priceMin} price max:${req.body.priceMax} Improvement Max:${req.body.imprvMax}`;
	out = searchFile.search(req.body.priceMin, req.body.priceMax, [String(req.body.zip)], req.body.imprvMax);
	results = out[0]; 
	params = out[1];
	console.log(params.priceMin);

	res.render('pages/index', { results, params });//Load the HTML page and pass the results
});



//Server listens for URL addresses here.
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});