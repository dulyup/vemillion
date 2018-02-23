const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;  
const service=require('./cardService.js');


app.use( express.static('../public') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );


app.get('/all', (req, resp) => { 
    resp.send( JSON.stringify(service.getAllPrestoredCards() ));
});

app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
});