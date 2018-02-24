// const server = require('./connectServer');

//Homepage
const homepage = document.querySelector('.homepage');
const favoritePage = document.querySelector('.favorite-page');
const myCardsPage = document.querySelector('.my-cards-page');
//Favorite Page
const favoriteTable = document.getElementById('favorite-list');
//My Cards Page
const myCardsTable = document.getElementById('my-cards-list');


//======================================================================
//==add listener for "study","favorite","my cards" buttons in Homepage==
//======================================================================
function addStudyListenerHomepage() {
    const studyBtnHomepage = document.getElementById('homepage-study');
    studyBtnHomepage.addEventListener('click', hideHomepage);
    studyBtnHomepage.addEventListener('click', displayStudyPage);
}

function addFavListenerHomepage() {
    const favBtnHomepage = document.getElementById('homepage-fav');
    favBtnHomepage.addEventListener('click', hideHomepage);
    favBtnHomepage.addEventListener('click', displayFavoritePage);
    favBtnHomepage.addEventListener('click', createFavoriteTable);
    //need to add getting data from server
    // favBtnHomepage.addEventListener('click', json = JSON.parse(callGetJsonService('fav')));
}

function addMyCardListenerHomepage() {
    const myCaBtnsHomepage = document.getElementById('homepage-my-cards');
    myCaBtnsHomepage.addEventListener('click', hideHomepage);
    myCaBtnsHomepage.addEventListener('click', displayMyCardsPage);
    myCaBtnsHomepage.addEventListener('click', createMyCardsTable);
    //need to add getting data from server
}

//==================================================================
//==add listener for "back","edit","study" buttons in FavoritePage==
//==================================================================
function addBackListenerFavPage() {
    document.querySelector('.favorite-page-back').addEventListener('click', start); //jump to homepage
}

function addEditListenerFavPage() {
    document.querySelector('.favorite-page-edit').addEventListener('click', displayEditPage);
}

function addStudyListenerFavPage() {
    document.querySelector('.favorite-page-study').addEventListener('click', displayStudyPage);
}

//=========================================================================
//==add listener for "back", "add", "edit","study" buttons in MyCardsPage==
//=========================================================================
function addBackListenerMyCaPage() {
    document.querySelector('.my-cards-page-back').addEventListener('click', start); //jump to homepage
}

function addAddListenerMyCaPage() {
    document.querySelector('.my-cards-page-add').addEventListener('click', displayAddPage);
}

function addEditListenerMyCaPage() {
    document.querySelector('.my-cards-page-edit').addEventListener('click', displayEditPage);
}

function addStudyListenerMyCaPage() {
    document.querySelector('.my-cards-page-study').addEventListener('click', displayStudyPage);
}

//=============================================
//==Create list for Favorite and MyCards page==
//=============================================
//create list for favorite page
function createFavoriteTable() {
    let table = document.createElement("table");
    //create header
    createThead(table);
    //create tbody
    createTBody(table);
    favoriteTable.appendChild(table);
}

//create list for my cards page
function createMyCardsTable() {
    let table = document.createElement("table");
    //create header
    createThead(table);
    //create tbody
    createTBody(table);
    myCardsTable.appendChild(table);
}

//create table header
function createThead(table) {
    const header = ["Word", "Explanation"];
    let thead = document.createElement("thead");
    table.appendChild(thead);
    let tr = document.createElement("tr");
    thead.appendChild(tr);
    for (let key of header) {
        let th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    }
}

//create a map to store: key - rowIndex, value - id of word in each row
let map = {};
//create table body
function createTBody(table) {
    let tbody = document.createElement("tbody");
    //add tbody into table
    table.appendChild(tbody);
    //traverse all words in json
    for (let i = 0; i < json.length; i++) {
        const keyOfJson = ["word", "correctAnswer"]; //keep it the same as key in json
        map[i] = json[i]["id"];
        //create tr
        let tr = document.createElement("tr");
        //traverse every attribute of current word
        for (let index of keyOfJson) {
            //create td
            let td = document.createElement("td");
            //set current attribute as content of td
            td.innerHTML = json[i][index];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

//=======================================
//==Get id of selected word in the list==
//=======================================
let curRow = null;
function selectRow(obj) {
    if(event.srcElement.tagName === "TD"){
        if (curRow !== null) {
            curRow.style.background='';
        }
        curRow = event.srcElement.parentElement;
        curRow.style.background="#4CAF50";
        return curRow;
    }
}

//Return the id of the selected word and pass it to edit page
function getIdOfSelectedWord() {
    if (curRow !== null) {
        return map[curRow.rowIndex - 1];
    }
    return "Please select a word to edit";
}

//===========================
//==Display different pages==
//===========================
function displayHomepage() {
    homepage.style.display = "";
}

function displayFavoritePage() {
    favoritePage.style = "";
    addBackListenerFavPage();
    addEditListenerFavPage();
    addStudyListenerFavPage();
}

function displayMyCardsPage() {
    myCardsPage.style = "";
    addAddListenerMyCaPage();
    addBackListenerMyCaPage();
    addEditListenerMyCaPage();
    addStudyListenerMyCaPage();
}

//from lulu tong
function displayStudyPage() {

}

//from lu niu
function displayAddPage() {

}

//from lu niu
function displayEditPage() {
    let idOfSelectedWord = getIdOfSelectedWord();
    console.log(idOfSelectedWord); //when click edit, print id in console
    curRow = null; //show edit page, hide list, reset curRow(global variable) to null
}

//==============================
//==Hide pages and clear lists==
//==============================
function hideHomepage() {
    homepage.style.display = "none";
}

function hideFavoritePage() {
    favoritePage.style.display = "none";
}

function hideMyCardsPage() {
    myCardsPage.style.display = "none";
}

function deleteFavoriteTable() {
    favoriteTable.innerHTML = '';
}

function deleteMyCardsTable() {
    myCardsTable.innerHTML = '';
}



function start() {
    addStudyListenerHomepage();
    addFavListenerHomepage();
    addMyCardListenerHomepage();
    displayHomepage();
    hideFavoritePage();
    hideMyCardsPage();
    //clear data of favorite list
    deleteFavoriteTable();
    //clear data of my cards list
    deleteMyCardsTable();
}

start();

let json = [
    {
        "id": "0",
        "word": "black",
        "a": "adj.黑色的；黑人的",
        "b":"白色",
        "c":"橘色",
        "correctAnswer": "adj.黑色的；黑人的"
    },
    {
        "id": "1",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },
    {
        "id": "2",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },
    {
        "id": "3",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "4",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "5",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "6",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "7",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "8",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "9",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "10",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "11",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "12",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "13",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "14",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "15",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "16",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "17",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "18",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "19",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "20",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "21",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "22",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "23",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "24",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    },{
        "id": "25",
        "word": "white",
        "a": "adj.黑色的；黑人的",
        "b":"adj.白色的，纯洁的",
        "c":"橘色",
        "correctAnswer": "adj.白色的，纯洁的"
    }
];