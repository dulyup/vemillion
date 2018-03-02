const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 2666;
const service = require('./service.js');
const idService = require('./mockIDService.js');

app.use( bodyParser.json({ extended: true, type: '*/*' }) );
app.use(express.static(__dirname + '/../public') );

app.post('/users',(req, res) => { 
    const info = idService.getID();
    service.newUser(info.userId);
    res.send( JSON.stringify( info ));
});

app.get('/:userId/fav', (req, res) => { 
    const userId=req.get('userId');
    if ( userId !== req.params.userId){
        res.send('you have no such permission on this list');
    }
    else{
        res.send( JSON.stringify( service.getFavIdsOf(userId).map(cardId => service.getCardById(cardId) ) ));
    }
});

app.post('/:userId/fav', (req, res) => {
    const userId=req.get('userId');
    if ( userId !== req.params.userId){
        res.send('you have no such permission on this list');
    }
    else{ 
        service.addToFavOf(req.body.id, userId);
        res.send('OK');
    }
});

app.delete('/:userId/fav/:cardId', (req, res) => { 
    const userId=req.get('userId');
    if ( userId !== req.params.userId){
        res.send('you have no such permission on this list');
    }
    else {
        service.removeFromFavOf(req.params.cardId, userId);
        res.send('OK');
        // res.send(service.getAllFavCards());
    }    
    
});

app.get('/prestored', (req, res) => { 
    res.send( JSON.stringify( service.getAllPrestoredCards() ));
});


/*
app.delete('/prestored/:cardId', (req, res) => { 
    service.deleteCard(req.params.cardId);
    res.send('OK');
});
*/

app.get('/:userId/custom', (req, res) => { 
    res.send( JSON.stringify( service.getAllCustomCardsOf(req.params.userId) ));
});

app.post('/:userId/custom', (req, res) => {  
    const userId=req.get('userId');  
    if ( userId !== req.params.userId){
        res.send('you have no such permission on this list');
    }
    else{ 
        let i= req.body.side0;
        let j= req.body.side1;
        service.addCustomCardOf(i,j, userId);
        res.send('OK');
    }
});

app.delete('/:userId/custom/:cardId', (req, res) => { 
    const userId=req.get('userId');
    if (!service.ownsCard(userId, req.params.cardId)){
        res.send('you have no such permission on this card');
    }
    else{
        service.deleteCard(req.params.cardId, userId);
        res.send('OK');
    }    
});


app.get('/cards', (req, res) => { 
    res.send( JSON.stringify( service.allCards ));
}); 

app.get('/cards/:cardId', (req, res) => { 
    res.send( JSON.stringify( service.getCardById(req.params.cardId) ));
});

app.put('/cards/:cardId', (req, res) => { 
    const userId=req.get('userId');
    if (!service.ownsCard(userId, req.params.cardId)){
        res.send('you have no such permission on this card');
    }
    else{
        let i= req.body.side0;
        let j= req.body.side1;
        service.updateCard(req.params.cardId, i, j );
        res.send('OK');
    }
});

app.listen(PORT, () => {  
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});