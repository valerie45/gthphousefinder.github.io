const express = require('express'); // declare dependencies

const app = express();   //create an instance of express

const port = 3000;  //Express servers conventionally listen on port 3000

app.get('/', (request, response) => {
    response.send('Hi things are working :)');    
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}!`);
});