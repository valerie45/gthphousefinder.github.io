const fs = require('fs');

//@param minimum total price.
//@param maximum total price.
//@param array of zipCodes to include. Default value is all 57 Fulton County GA zipcodes
function search(totalPriceMin=0, totalPriceMax=9999999, zipCodes=["31106", "31193", "30213", "30268", "30272", "30291", "30296", "30301", "30303", "30305", "30304", "30307", "30306", "30309", "30308", "30311", "30310", "30313", "30312", "30315", "30314", "30316", "30319", "30318", "30321", "30324", "30326", "30325", "30328", "30004", "30327", "30005", "30332", "30331", "30334", "30009", "30337", "30336", "30339", "30342", "30344", "30022", "30349", "30350", "30354", "30358", "30363", "30375", "30384", "30380", "30388", "30398", "30396", "30076", "30075", "30097", "30098"]) {
    console.log("Initiated search.");

	var output = [] //this will be our output

    //Reads in the file
    data = fs.readFileSync('./data/Tax_Parcel_TestData.json', 'utf-8');
  
	// converts the file into a local object
	const histData = JSON.parse(data.toString());

	//prints info about the file
	console.log("Created JSON object:\n  Rows: ", histData.length, "\n  ZIP: ", zipCodes);

	//iterate through each entry
	for (i=0; i<histData.length; i++) {
		item = histData[i];

		//check conditions given in the parameters
		if (zipCodes.includes(item.SITEZIP) &&									//check zipcode
			item.TOT_APPR >= totalPriceMin && item.TOT_APPR <= totalPriceMax)	//check price
		{
			output.push(item)	//if yes, add the object to the output
			console.log("Address: ", item.SITEADDRESS, "   ZIP: ", item.SITEZIP, "   Total Price: ", item.TOT_APPR);
		}
	};
	return(output); //return the data
}

//exports the function search to be used in server.js 
 module.exports = { search };