const express = require('express'); // declare dependencies
const path = require('path');

const app = express();   //create an instance of express
const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + '/public')); //allows .css files to be loaded in the Express server

//**** Connects to PostgreSQL Database ****/
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './index.html'));    
});

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}!`);
});