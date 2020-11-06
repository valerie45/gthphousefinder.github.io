const fs = require('fs');

//@param minimum total price.
//@param maximum total price.
//@param array of zipCodes to include. Default value is all 57 Fulton County GA zipcodes
function search(totalPriceMin=0, totalPriceMax=10000000, zipCodes=["31106", "31193", "30213", "30268", "30272", "30291", "30296", "30301", "30303", "30305", "30304", "30307", "30306", "30309", "30308", "30311", "30310", "30313", "30312", "30315", "30314", "30316", "30319", "30318", "30321", "30324", "30326", "30325", "30328", "30004", "30327", "30005", "30332", "30331", "30334", "30009", "30337", "30336", "30339", "30342", "30344", "30022", "30349", "30350", "30354", "30358", "30363", "30375", "30384", "30380", "30388", "30398", "30396", "30076", "30075", "30097", "30098"],
					imprvMax=10000000) {
  
	//If no input is passed in, fill in values
	if (totalPriceMin == "" || totalPriceMin == null) {totalPriceMin = 0;}
	if (totalPriceMax == "" || totalPriceMax == null) {totalPriceMax = 10000000;}
	if (zipCodes == "" || zipCodes == null) {zipCodes = ["31106", "31193", "30213", "30268", "30272", "30291", "30296", "30301", "30303", "30305", "30304", "30307", "30306", "30309", "30308", "30311", "30310", "30313", "30312", "30315", "30314", "30316", "30319", "30318", "30321", "30324", "30326", "30325", "30328", "30004", "30327", "30005", "30332", "30331", "30334", "30009", "30337", "30336", "30339", "30342", "30344", "30022", "30349", "30350", "30354", "30358", "30363", "30375", "30384", "30380", "30388", "30398", "30396", "30076", "30075", "30097", "30098"];}
	if (imprvMax == "" || imprvMax == null) {imprvMax = 10000000;}

	var params = {
		priceMin: totalPriceMin,
		priceMax: totalPriceMin,
		zip: zipCodes,
		imprvMax: imprvMax
	};

	console.log(`Search request after cleaning: \nmin:${totalPriceMin} max:${totalPriceMax} zip:${zipCodes}`);


	var output = [] //this will be our output

    data = fs.readFileSync('./data/Tax_Parcel_TestData.json', 'utf-8');    //Reads in the file
	const histData = JSON.parse(data.toString());	// converts the file into a local object

	//prints info about the file
	console.log("Created JSON object:\n  Rows: ", histData.length, "\n  ZIP: ", zipCodes);

	//iterate through each entry
	for (i=0; i<histData.length; i++) {
		item = histData[i];

		//check conditions given in the parameters
		if (zipCodes.includes(item.SITEZIP) &&									//check zipcode
			item.TOT_APPR >= totalPriceMin && 
			item.TOT_APPR <= totalPriceMax &&
			item.IMPR_APPR <= imprvMax)	//check price
		{
			output.push(item)	//if yes, add the object to the output
			console.log("Address: ", item.SITEADDRESS, "   ZIP: ", item.SITEZIP, "   Total Price: ", item.TOT_APPR);
		}
	};
	return([output, params]); //return the data
}

//exports the function search to be used in server.js 
 module.exports = { search };