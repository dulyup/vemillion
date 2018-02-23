const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;  

app.use( express.static('../public') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

