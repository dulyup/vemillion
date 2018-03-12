module.exports.start = start;
module.exports.hideFavoritePage = hideFavoritePage;
module.exports.hideMyCardsPage = hideMyCardsPage;
module.exports.addStudyListenerFavPage = addStudyListenerFavPage;
module.exports.addStudyListenerMyCaPage = addStudyListenerMyCaPage;

const studyPage = require('./studyPage');
const listPage = require('./listPage');

//===========================================================
//===============fetch user id from the server===============
//===========================================================
requestUserId();

function requestUserId() {
    return fetch('http://localhost:2666/users', { method: 'POST',
    }).then( response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('error-response-not-okay');
    }).then(fromJson => { //currentId: id
        start(fromJson.currentId);
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
function start(currentUserId) {
    displayHomepage(currentUserId);
    initializeOption(currentUserId);
    addStudyListenerHomepage(currentUserId);
    addFavListenerHomepage(currentUserId);
    addMyCardListenerHomepage(currentUserId);
    addSelectListenerHomepage(currentUserId);
    hideFavoritePage();
    hideMyCardsPage();
    hideStudyPage();
    hideAlert();
    //clear data of favorite list
    listPage.deleteFavoriteTable();
    //clear data of my cards list
    listPage.deleteMyCardsTable();
}

function initializeOption(currentUserId) {
    let idArray = [];
    for (let id = 1; id < 4; id++) {
        if (currentUserId !== id) {
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
function addStudyListenerHomepage(currentUserId) {
    document.getElementById('homepage-study').addEventListener('click', function(){studyPage.loadJSON(currentUserId);});
    document.getElementById('homepage-study').addEventListener('click', hideHomepage);
}

function addFavListenerHomepage(currentUserId) {
    document.getElementById('homepage-fav').addEventListener('click', function() {listPage.displayFavoritePage(currentUserId);});
    document.getElementById('homepage-fav').addEventListener('click', hideHomepage);
}

function addMyCardListenerHomepage(currentUserId) {
    document.getElementById('homepage-my-cards').addEventListener('click', hideHomepage);
    document.getElementById('homepage-my-cards').addEventListener('click', function() {listPage.displayMyCardsPage(currentUserId, currentUserId);});
}

function addSelectListenerHomepage(currentUserId) {
  document.getElementById('homepage-dropbtn').addEventListener('change', hideHomepage);
  document.getElementById('homepage-dropbtn').addEventListener('change', function() {onchange(currentUserId);});
}

function onchange(currentUserId) {
    let select = document.getElementById('homepage-dropbtn');
    let index = select.selectedIndex;
    let selectedUserId = select.options[index].text;
    listPage.displayMyCardsPage(currentUserId, selectedUserId);
}


//Interact with study page
function addStudyListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-study').addEventListener('click', function() {studyPage.loadJSONFav(currentUserId);});
}

function addStudyListenerMyCaPage(currentUserId, chooseId) {
    document.getElementById('my-cards-page-study').addEventListener('click', function() {studyPage.loadJSONMyCard(currentUserId, chooseId);});
}


function displayHomepage(currentUserId) {
    document.getElementById('page-header').innerHTML="Welcome User " + currentUserId + " to Flash Card";
    document.querySelector('.homepage').style.display = "";
}

function hideHomepage() {
    document.querySelector('.homepage').style.display = "none";
}

function hideFavoritePage() {
    document.querySelector('.favorite-page').style.display = "none";
}

function hideMyCardsPage() {
    document.querySelector('.my-cards-page').style.display = "none";
}

function hideStudyPage() {
    document.querySelector('.study-page').style.display = "none";
}

function hideAlert() {
    document.querySelector('.alert').style.display = "none";
}


module.exports = {
    start: start,
    hideFavoritePage: hideFavoritePage,
    hideMyCardsPage: hideMyCardsPage,
    addStudyListenerFavPage: addStudyListenerFavPage,
    addStudyListenerMyCaPage: addStudyListenerMyCaPage,
};