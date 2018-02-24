const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;  
const service=require('./cardService.js');


app.use( express.static('../public') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );


app.get('/all', (req, res) => { 
    res.send( JSON.stringify( service.getAllCards ));
});

app.get('/all/:id', (req, res) => { 
    res.send( JSON.stringify(service.getCardById(req.params.id) ));
});

app.get('/fav', (req, res) => { 
    res.send( JSON.stringify( service.getAllFavCards ));
});

app.post('/fav', (req, res) => { 
    service.addToFav(req.body.id);
    res.send('OK');
});

app.delete('/fav/:id', (req, res) => { 
    service.deleteFromFav(req.params.id);
    res.redirect('..');
});

app.get('/custom', (req, res) => { 
    res.send( JSON.stringify( service.getAllCustomCards ));
});

app.post('/custom', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    service.addCustomCard(i,j);
    res.redirect('.');
});

app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
});