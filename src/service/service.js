( () => {
  
let count=0;
const cards=require('./prestoredCards.js').lines.map(line => newCard( line.split("|")[0], line.split("|")[1]));
const prestored=new Set(cards.map((x,i)=>i));
const fav = {}; //new Set();
const custom = {}; //new Set();
const users = new Set();

//addToFav(58);

function newUser(userId){
    if (!users.has(userId)){
        users.add(userId);
        fav[userId] = new Set();
        custom[userId] = new Set();
    }
}

function getAllCardsIn(set){
    return Array.from(set, cardId=>cards[cardId]); //getCardById(cardId)); 
}

/*
function getCardById(cardId){
    cardId=+cardId;
    return cards[cardId]; //Object.assign({inFav:fav.has(cardId)},cards[cardId]);
}
*/

function ownsCard (userId, cardId) {
    if (custom[userId].has(cardId)) return true;
    else return false;
}

function deleteCard(cardId, ownerId){
    cardId=+cardId;
    cards.splice(cardId, 1);
    custom[ownerId].delete(cardId);

    /*
    for (let userId in fav){
        fav[userId].delete(cardId);
    }
    */
    // if (fav.has(cardId)) fav.delete(cardId);    
    // if (custom.has(cardId)) custom.delete(cardId);
    // if (prestored.has(cardId)) prestored.delete(cardId);
}

function addCustomCardOf(side0, side1, ownerId){
    const card = newCard(side0,side1);
    custom[ownerId].add(card.cardId);
    cards.push(card);
}

function getFavIdsOf(userId){
    for (let cardId of fav[userId]){
        if (!cards[cardId]) fav[userId].delete(cardId);
    }
    return fav[userId];
}

function addToFavOf(cardId, userId){
    cardId=+cardId;
    fav[userId].add(cardId);
}

function removeFromFavOf(cardId, userId){
    cardId=+cardId;
    fav[userId].delete(cardId); 
}

function updateCard(cardId, side0, side1){
    cardId=+cardId;
    if (side0) {cards[cardId].side0=side0;}
    if (side1) {cards[cardId].side1=side1;}
}

function newCard(side0, side1){
    const card={};
    card.cardId=count++;
    card.side0=side0;
    card.side1=side1;
    return card;
}

module.exports={
    newUser : newUser,
    allCards : cards,
    getAllPrestoredCards :(()=> getAllCardsIn(prestored)),
    getAllFavCardsOf : ( (userId)=>getAllCardsIn(fav[userId]) ),
    getAllCustomCardsOf : ( (userId)=>getAllCardsIn(custom[userId]) ),
    getCardById : (cardId => cards[cardId]), 
    ownsCard : ownsCard,
    getFavIdsOf : getFavIdsOf,
    addToFavOf : addToFavOf,    
    removeFromFavOf : removeFromFavOf,    
    addCustomCardOf :addCustomCardOf,
    updateCard : updateCard,
    deleteCard : deleteCard
};

})();