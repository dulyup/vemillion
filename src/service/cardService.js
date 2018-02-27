( () => {

  
let count=0;
const cards=require('./prestoredCards.js').lines.map(line => newCard(line.split("|")[0],line.split("|")[1]));
const prestored=new Set(cards.map((x,i)=>i));
const fav = new Set();
const custom = new Set();

addCustomCard('xxx','yyy');
//console.log(getAllCardsIn(prestored));
console.log(cards[372]);
console.log(getCardById(372));
//deleteCardFrom(372, custom);
//let i=(id=>deleteCardFrom(id, custom));
//i(372);
console.log(cards[372]);


function getAllCardsIn(set){
    return Array.from(set, id=>getCardById(id)); 
}

function getCardById(id){
    return Object.assign({inFav:fav.has(id)},cards[id]);
}

function deleteCard(id){
    cards.splice(id, 1);
    if (fav.has(id)) fav.delete(id);
    if (prestored.has(id)) prestored.delete(id);
    if (custom.has(id)) custom.delete(id);
}

function addCustomCard(side0, side1){
    custom.add(count);
    cards.push(newCard(side0, side1));
}

function addToFav(id){
    if (!fav.has(id)) fav.add(id);
}

function removeFromFav(id){
    if (fav.has(id)) fav.delete(id);
}

function updateCard(id, side0, side1){
    if (side0) cards[id].side0=side0;
    if (side1) cards[id].side1=side1;
}

function newCard(side0, side1){
    const card={};
    card.id=count++;
    card.side0=side0;
    card.side1=side1;    
    return card;
}

module.exports={
    getAllCards : cards,
    getAllPrestoredCards :(()=> getAllCardsIn(prestored)),
    getAllFavCards : (()=>getAllCardsIn(fav)),
    getAllCustomCards : (()=>getAllCardsIn(custom)),
    getCardById : getCardById,
    addToFav : addToFav,    
    removeFromFav : removeFromFav,    
    addCustomCard :addCustomCard,
    updateCard : updateCard,
    deleteCard : (id=>deleteCard(id))
};

})();