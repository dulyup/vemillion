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

app.put('/all/:id', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    service.updateCard(req.params.id, i, j );
});

app.get('/fav', (req, res) => { 
    res.send( JSON.stringify( service.getAllFavCards ));
});

app.post('/fav', (req, res) => { 
    service.addToFav(req.body.id);
    res.send('OK');
});

app.delete('/fav/:id', (req, res) => { 
    service.removeFromFav(req.params.id);
});

app.get('/custom', (req, res) => { 
    res.send( JSON.stringify( service.getAllCustomCards ));
});

app.post('/custom', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    service.addCustomCard(i,j);
});

app.delete('/custom/:id', (req, res) => { 
    service.deleteCardFrom(req.params.id, custom);
});

console.log(service.getAllCustomCards);
service.deleteFromCustom(372);
console.log(service.getAllCustomCards);
console.log(service.getAllCustomCards);

app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
});