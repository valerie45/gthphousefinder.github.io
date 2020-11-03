const express = require('express'); // import dependencies
const path = require('path');
const searchFile = require('./searchFile.js')

const app = express();   //create an instance of express
const PORT = process.env.PORT || 5000  //Specify the port to lsiten on

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))

app.use(express.static(__dirname + '/public')); //allows files in /public to be loaded in the Express server
app.use(express.static(__dirname + '/')); //allows all files to be loaded in the Express server (I think?)


//******* ROUTES ************//

//The landing page of the website.
app.get('/', (request, response) => {
	// response.render("./index.html");
	response.render('pages/index', { results });
});

//Runs when the user navigates to <some_url>/search. 
//Currently runs a search, logs the results to console, and then displays the main page.
app.get('/search', (request, response) => {

	//Calls function search() in searchFile.js
	//needs to be reconfigured to take in form data from index.html instead our written values here.
	results = searchFile.search(0, 500000, ["30324"]);

	//console.log("Search Results: ", results);
	// response.sendFile(path.join(__dirname, './index.html'));
	response.render('pages/index', { results });
});



//Server listens for URL addresses here.
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});