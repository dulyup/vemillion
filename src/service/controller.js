const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 2666;  
const service=require('./cardService.js');


app.use( express.static('src') ); 
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

app.get('/cards', (req, res) => { 
    res.send( JSON.stringify( service.getAllCards ));
}); 

app.get('/cards/:id', (req, res) => { 
    res.send( JSON.stringify(service.getCardById(req.params.id) ));
});

app.put('/cards/:id', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    service.updateCard(req.params.id, i, j );
    res.send('OK');
});

app.get('/fav', (req, res) => { 
    res.send( JSON.stringify( service.getAllFavCards() ));
});

app.post('/fav', (req, res) => { 
    service.addToFav(req.body.id);
    res.send('OK');
});

app.delete('/fav/:id', (req, res) => { 
    service.removeFromFav(req.params.id);
    res.send('OK');
});

app.get('/prestored', (req, res) => { 
    res.send( JSON.stringify( service.getAllPrestoredCards() ));
});

app.delete('/prestored/:id', (req, res) => { 
    service.deleteFromPrestored(req.params.id);
    res.send('OK');
});

app.get('/custom', (req, res) => { 
    res.send( JSON.stringify( service.getAllCustomCards() ));
});

app.post('/custom', (req, res) => { 
    let i= req.body.side0;
    let j= req.body.side1;
    service.addCustomCard(i,j);
    res.send('OK');
});

app.delete('/custom/:id', (req, res) => { 
    service.deleteFromCustom(req.params.id);
    res.send('OK');
});


app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});