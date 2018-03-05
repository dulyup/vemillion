const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 2666;
const cardService = require('./cardService.js');
const idService = require('./mockIDService.js');

app.use( bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(__dirname + '/../public') );

app.post('/userid',(req, res) => { 
    res.send( JSON.stringify( idService.getID() ));
});

app.get('/cards', (req, res) => { 
    res.send( JSON.stringify( cardService.allCards ));
}); 

app.get('/cards/:id', (req, res) => { 
    res.send( JSON.stringify( cardService.getCardById(req.params.id) ));
});

app.put('/cards/:id', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    cardService.updateCard(req.params.id, i, j );
    res.send('OK');
});

app.get('/fav', (req, res) => { 
    res.send( JSON.stringify( cardService.getAllFavCards() ));
});

app.post('/fav', (req, res) => { 
    cardService.addToFav(req.body.id);
    res.send('OK');
});

app.delete('/fav/:id', (req, res) => {     
    cardService.removeFromFav(req.params.id);
    res.send('OK');
    // res.send(service.getAllFavCards());
});

app.get('/prestored', (req, res) => { 
    res.send( JSON.stringify( cardService.getAllPrestoredCards() ));
});

app.delete('/prestored/:id', (req, res) => { 
    cardService.deleteCard(req.params.id);
    res.send('OK');
});

app.get('/custom', (req, res) => { 
    res.send( JSON.stringify( cardService.getAllCustomCards() ));
});

app.post('/custom', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    if (!i || !j) res.status(400).send("neither side can be null");
    cardService.addCustomCard(i,j);
    res.send('OK');
});

app.delete('/custom/:id', (req, res) => { 
    cardService.deleteCard(req.params.id);
    res.send('OK');
});

app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});