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

async function boot(){
    while(!currentId){
        currentId = await requestUserId();
    }    
    start();
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

//======================================================
//==================Initialize the game=================
//======================================================
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

function getUserList(){
    return fetch('http://localhost:2666/users').then(response => {
        if (response.ok) {
            console.log(response);
            resolve(response);
        }
        return Promise.reject('error-response-not-okay');
    }).catch((error) => {
        if (error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });

}

function initializeOption() {
    let idArray = [];
    for (let id = 1; id < 4; id++) {
        if (currentId !== id) {
            idArray.push(id);
        }
    }
    document.getElementById("option0").selected = "selected";
    document.getElementById("option1").innerText = idArray[0];
    document.getElementById("option2").innerHTML = idArray[1];
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
    document.getElementById('page-header').innerHTML="Welcome User " + currentUserId + " to Flash Card";
    document.querySelector('.homepage').style.display = "";
}

function hideElementQuerySelector( queryString ){
    document.querySelector( queryString ).style.display = "none";
}
