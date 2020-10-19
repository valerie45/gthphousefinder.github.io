const express = require('express'); // declare dependencies
const path = require('path');

const app = express();   //create an instance of express
const PORT = process.env.PORT || 5000

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './index.html'));    
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});