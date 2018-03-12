// const index = require('./index-dom');
const index = require('./index');
const helper = require('./showStudyPageHelperFunction.js');
const showStudypage = require('./showStudypage.js');

let xobj;
function loadJSON(currentUserId) {
    xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function() {callback(currentUserId);};
    xobj.open('GET', 'http://localhost:2666/prestored', true);
    xobj.setRequestHeader('currentId', currentUserId);
    xobj.send(null);
}

function callback(currentUserId) {
    if ( xobj.readyState == 4 && xobj.status == "200") {
        displayStudyPage(xobj.responseText, currentUserId);
    }
}

let xfav;
function loadJSONFav(currentUserId) {
    xfav = new XMLHttpRequest();
    xfav.overrideMimeType("application/json");
    xfav.onreadystatechange = function() {callbackFav(currentUserId);};
    xfav.open('GET', 'http://localhost:2666/users/'+ currentUserId + '/fav', true);
    xfav.setRequestHeader('currentId', currentUserId);
    xfav.send(null);
}

function callbackFav(currentUserId) {
    if ( xfav.readyState == 4 && xfav.status == "200") {
        displayStudyFavPage(xfav.responseText, currentUserId);
    }
}

let xcustom;
function loadJSONMyCard(currentUserId, chooseId) {
    xcustom = new XMLHttpRequest();
    xcustom.overrideMimeType("application/json");
    xcustom.onreadystatechange = function() {callbackMyCard(currentUserId, chooseId);};
    xcustom.open('GET', 'http://localhost:2666/users/'+ chooseId + '/custom', true);
    xcustom.setRequestHeader('currentId', currentUserId);
    xcustom.send(null);
}

function callbackMyCard(currentUserId, chooseId) {
    if ( xcustom.readyState == 4 && xcustom.status == "200") {
        displayStudyMyCardPage(xcustom.responseText, currentUserId, chooseId);
    }
}

// supplement for the choice， when the number of question is less than 3.
let choiceJSON = [{id: 284, side0: "fart", side1: "屁(vi.)放屁"}, {id: 192, side0: "resist", side1: "(vt.)(vi.)抵抗,耐得住,抵制,反抗防染劑"}
    ,{id: 169, side0: "destination", side1: "目的地目的文件,目的單元"},{id: 214, side0: "specialize", side1: "(vt.)使特殊化,列舉,特別指明,限定...的範圍(vi.)成為專家,專攻"},{id: 248, side0: "react", side1: "re-act (vt.)重作,重演"}
    ,{id: 317, side0: "chronologically", side1: "(ad.)按年代地"}
    ,{id: 145, side0: "intellectual", side1: "有知識者,知識分子,憑理智做事者(a.)智力的,知性的,聰明的"}
    ,{id: 131, side0: "content", side1: "內容,滿足,意義,要旨(a.)滿足的,滿意的,意義的(vt.)使...滿足"}
    ,{id: 350, side0: "unwillingness", side1: "不願意;不情願"},{id: 243, side0: "definition", side1: "u定義;限定,確定;清晰度"}];

function displayStudyPage(response, currentUserId) {
    document.querySelector('.study-page').style.display = 'block';
    index.hideMyCardsPage();
    index.hideFavoritePage();
    helper.showStudypage();

    let actual_JSON = JSON.parse(response);
    let length = actual_JSON.length;

    showStudypage.studyPage(actual_JSON, length, currentUserId, currentUserId);
}

function displayStudyFavPage(response, currentUserId) {
    document.querySelector('.study-page').style.display = 'block';
    helper.showStudypage();
    index.hideFavoritePage();
    index.hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    showStudypage.studyPage(actual_JSON.concat(choiceJSON), length, currentUserId, currentUserId);
}

function displayStudyMyCardPage(response, currentUserId, chooseId) {
    document.querySelector('.study-page').style.display = 'block';
    helper.showStudypage();
    index.hideFavoritePage();
    index.hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    showStudypage.studyPage(actual_JSON.concat(choiceJSON), length, currentUserId, chooseId);
}

module.exports = {
    loadJSONFav: loadJSONFav,
    loadJSONMyCard: loadJSONMyCard,
    loadJSON: loadJSON,
};
