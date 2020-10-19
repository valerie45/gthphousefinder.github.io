const express = require('express'); // declare dependencies
const path = require('path');

const app = express();   //create an instance of express

const port = 3000;  //Express servers conventionally listen on port 3000

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './index.html'));    
});

app.listen(port, () => {
    console.log(`Express server listening on port ${port}!`);
});