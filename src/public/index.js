module.exports = {
    start: start,
    hideFavoritePage: (()=>hideElementQuerySelector('.favorite-page')),
    hideMyCardsPage: (()=>hideElementQuerySelector('.my-cards-page')),
    addStudyListenerFavPage: addStudyListenerFavPage,
    addStudyListenerMyCaPage: addStudyListenerMyCaPage,
};

const studyPage = require('./studyPage');
const listPage = require('./listPage');
let currentId = null;

boot();

//======================================================
//==================Initialize the game=================
//======================================================

async function boot(){
    while(!currentId){
        currentId = await requestUserId();
    }    
    start();
}

function start() {
    displayHomepage(currentId);
    initializeOption(currentId);
    const list=['homepage-study','homepage-fav','homepage-my-cards'];
    for (let i of list){
        addHideHomepageListener(i);
    }    
    addOtherListeners(currentId)
    hideOnInitialization();
   
    //clear data of favorite list
    listPage.deleteFavoriteTable();
    //clear data of my cards list
    listPage.deleteMyCardsTable();
    
}

function hideOnInitialization(){
    const temp=['.favorite-page','.my-cards-page','.study-page','.alert'];
    for (let i of temp){
        hideElementQuerySelector(i);
    }
}

async function initializeOption(){
    const drop = document.getElementById('homepage-dropbtn');
    drop.options.length = 0;
    const placeholder = document.createElement('option');
    placeholder.text = "Shared Lists"; 
    placeholder. selected = "selected";
    drop.add(placeholder); 
    let list = await getUserList();
    for (let id of list.activeUsers){
        if (id === currentId) continue;
        let option = document.createElement('option');
        option.text = +id;        
        drop.add(option);
    }
    
}

function getUserList() {
    return fetch('http://localhost:2666/users')
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('error-response-not-okay');
    }).then(fromJson => { 
        return fromJson;
    }).catch( ( error ) => {
        if(error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

//===========================================================
//===============fetch user id from the server===============
//===========================================================

function requestUserId() {
    return fetch('http://localhost:2666/users', { method: 'POST',
    }).then( response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('error-response-not-okay');
    }).then(fromJson => { //currentId: id
        return fromJson.currentId;
    }).catch( ( error ) => {
        if(error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}


//================================================================================
//==add listener for "study","favorite","my cards", "others" buttons in Homepage==
//=================================================================================

function addHideHomepageListener( elementId ){    
    document.getElementById(elementId).addEventListener('click', ()=>{hideElementQuerySelector('.homepage')});    
}

function addOtherListeners(currentUserId){
    document.getElementById('homepage-study').addEventListener('click', ()=>{studyPage.loadJSON(currentUserId)});
    document.getElementById('homepage-fav').addEventListener('click', ()=>{listPage.displayFavoritePage(currentUserId)});
    document.getElementById('homepage-my-cards').addEventListener('click', ()=>{listPage.displayMyCardsPage(currentUserId, currentUserId)});
    addSelectListenerHomepage();
}

function addSelectListenerHomepage() {
    document.getElementById('homepage-dropbtn').addEventListener('change', ()=>{hideElementQuerySelector('.homepage')});
    document.getElementById('homepage-dropbtn').addEventListener('change', ()=>{onchange(currentId);});
}

function onchange(currentUserId) {
    let select = document.getElementById('homepage-dropbtn');
    let index = select.selectedIndex;
    let selectedUserId = select.options[index].text;
    listPage.displayMyCardsPage(currentUserId, selectedUserId);
}


//Interact with study page
function addStudyListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-study').addEventListener('click', ()=>{studyPage.loadJSONFav(currentUserId)});
}

function addStudyListenerMyCaPage(currentUserId, chooseId) {
    document.getElementById('my-cards-page-study').addEventListener('click', ()=>{studyPage.loadJSONMyCard(currentUserId, chooseId)});
}


function displayHomepage(currentUserId) {
    document.getElementById('page-header').innerHTML="Welcome to Flash Card, User " + currentUserId;
    document.querySelector('.homepage').style.display = "";
}

function hideElementQuerySelector( queryString ){
    document.querySelector( queryString ).style.display = "none";
}
