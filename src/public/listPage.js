//Includes: Favorite page, My Cards page, Shared Cards Page
const index = require('./index');

function requestJson(currentUserId, chooseId, url) {
    return fetch(url,
        {headers: {'currentId': currentUserId}
        }).then( response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
    }).catch( (error) => {
        if(error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

function updateFavList(currentUserId){
    const url = 'http://localhost:2666/users/'+ currentUserId +'/fav';
    requestJson(currentUserId, currentUserId, url)
        .then(fromJson => {
        deleteFavoriteTable();
        createFavoriteTable(fromJson);
        enableButton(fromJson !== null && curRow !== null, document.getElementById('favorite-page-edit'));
        enableButton(fromJson !== null, document.getElementById('favorite-page-study'));
    }).catch(e => {
        console.log(e);
        throw e;
    });
}

function updateMyCardsList(currentUserId, chooseId){
    const url = 'http://localhost:2666/users/'+chooseId+'/custom';
    requestJson(currentUserId, chooseId, url)
        .then(fromJson => {
            deleteMyCardsTable();
            createMyCardsTable(fromJson);
            enableButton(fromJson !== null && curRow !== null, document.getElementById('my-cards-page-edit'));
            enableButton(fromJson !== null, document.getElementById('my-cards-page-study'));
        }).catch(e => {
            console.log(e);
            throw e;
    });
}

//======================================================================
//====add listener for "back","edit","study" buttons in FavoritePage====
//======================================================================
function addBackListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-back').addEventListener('click', function() {index.start(currentUserId);}); //jump to homepage
}

function addEditListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-edit').addEventListener('click', function() {displayEditPageFromFavPage(currentUserId);});
}


//=========================================================================
//==add listener for "back", "add", "edit","study" buttons in MyCardsPage==
//=========================================================================
function addBackListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-back').addEventListener('click', function(){index.start(currentUserId);}); //jump to homepage
}

function addAddListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-add').addEventListener('click', function(){displayAddPageFromMyCardPage(currentUserId);});
}

function addEditListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-edit').addEventListener('click', function() {displayEditPageFromMyCardPage(currentUserId);});
}


//=============================================================
//==========Create list for Favorite and MyCards page==========
//=============================================================
//create list for favorite page
function createFavoriteTable(json) {
    let table = document.createElement("table");
    //create header
    if (json !== null) {
        document.getElementById('favorite-page-notification').innerHTML = "";
        createThead(table);
        //create tbody
        createTBody(table, json);
        document.getElementById('favorite-list').appendChild(table);
    } else {
        document.getElementById('favorite-page-notification').innerHTML = "You do not have favorite words yet.";
    }
}

//create list for my cards page
function createMyCardsTable(json) {
    let table = document.createElement("table");
    if (json !== null) {
        //create header
        createThead(table);
        //create tbody
        createTBody(table, json);
        document.getElementById('my-cards-list').appendChild(table);
        document.getElementById('my-cards-page-notification').innerHTML = "";
    } else {
        document.getElementById('my-cards-page-notification').innerHTML = "No Cards";
    }
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

//create a rowWordIdMap to store: key - rowIndex, value - id of word in each row
let rowWordIdMap = [];
//create table body
function createTBody(table, json) {
    let tbody = document.createElement("tbody");
    //add tbody into table
    table.appendChild(tbody);
    //traverse all words in json
    for (let i = 0; i < Object.keys(json).length; i++) {
        const keyOfJson = ["side0", "side1"]; //keep it the same as key in json
        rowWordIdMap[i] = json[i]["cardId"];
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


//=============================================================
//=============Get id of selected word in the list=============
//=============================================================
let curRow = null;
document.getElementById('favorite-list').addEventListener('click', selectRow(this));
document.getElementById('my-cards-list').addEventListener('click', selectRow(this));
function selectRow(obj) {
    return () => {
        if(event.srcElement.tagName === "TD"){
            if (curRow !== null) {
                curRow.style.background='';
                curRow.style.color='black';
            }
            curRow = event.srcElement.parentElement;
            curRow.style.background="#4CAF50";
            curRow.style.color="white";
            enableButton(curRow.rowIndex !== null, document.getElementById('favorite-page-edit'));
            enableButton(curRow.rowIndex !== null, document.getElementById('my-cards-page-edit'));
            return curRow;
        }
    };
}

//Return the id of the selected word and pass it to edit page
function getIdOfSelectedWord() {
    if (curRow !== null) {
        return rowWordIdMap[curRow.rowIndex - 1];
    }
    return null;
}

function displayFavoritePage(currentUserId) {
    document.querySelector('.favorite-page').style = "";
    document.getElementById('page-header').innerHTML="Favorites";
    updateFavList(currentUserId);
    addBackListenerFavPage(currentUserId);
    addEditListenerFavPage(currentUserId);
    index.addStudyListenerFavPage(currentUserId);
}

function displayMyCardsPage(currentUserId, chooseId) {
    document.querySelector('.my-cards-page').style = "";
    if (currentUserId === chooseId) {
        updateMyCardsList(currentUserId, chooseId);
        document.getElementById('page-header').innerHTML="My Cards";
        document.getElementById('my-cards-page-add').style.display = "";
        document.getElementById('my-cards-page-edit').style.display = "";
        addAddListenerMyCaPage(currentUserId);
        addEditListenerMyCaPage(currentUserId);
        index.addStudyListenerMyCaPage(currentUserId, chooseId);
        addBackListenerMyCaPage(currentUserId);
    } else {
        updateMyCardsList(currentUserId, chooseId);
        document.getElementById('page-header').innerHTML= "User " +chooseId + " 's Cards";
        index.addStudyListenerMyCaPage(currentUserId, chooseId);
        document.getElementById('my-cards-page-add').style.display = "none";
        document.getElementById('my-cards-page-edit').style.display = "none";
        addBackListenerMyCaPage(currentUserId);
    }
}


//====================================================
//============Interact with edit, add pages===========
//====================================================
function displayAddPageFromMyCardPage(currentUserId) {
    let editPage = new EditPage();
    editPage.showAddOrEditPage(null, currentUserId, curRow, (obj) => {
        // 'Save' clicked.
        editPage.saveCtmCard(obj, currentUserId).then(() => {
            // Places your code here if you want to do anything after save completed.
            displayMyCardsPage(currentUserId, currentUserId);
        }).then(() => {
            curRow = null;
        })
    }, () => {
        // 'Cancel' clicked.
        if (curRow !== null) {
            curRow.style.background = '';
        }
    })
}

function displayEditPageFromFavPage(currentUserId) {
    let editPage = new EditPage(currentUserId);
    let idOfSelectedWord = getIdOfSelectedWord();
    //console.log(idOfSelectedWord); //when click edit, print id in console
    if (idOfSelectedWord !== null) {
        editPage.showAddOrEditPage(idOfSelectedWord, currentUserId, curRow, (obj) => {
            // 'Save' clicked.
            editPage.updateCard(idOfSelectedWord, obj, currentUserId).then(() => {
                // Places your code here if you want to do anything after save completed.
                displayFavoritePage(currentUserId);
            }).then(() => {
                curRow = null;
            })
        }, () => {
            // 'Cancel' clicked.
            // reset the state of current row
            resetTableElement();
            enableButton(curRow !== null, document.getElementById('favorite-page-edit'));
        });
    }
}

function displayEditPageFromMyCardPage(currentUserId) {
    let editPage = new EditPage(currentUserId);
    let idOfSelectedWord = getIdOfSelectedWord();
    // console.log(idOfSelectedWord); //when click edit, print id in console
    if (idOfSelectedWord !== null) {
        editPage.showAddOrEditPage(idOfSelectedWord, currentUserId, curRow, (obj) => {
            // 'Save' clicked.
            editPage.updateCard(idOfSelectedWord, obj, currentUserId).then(() => {
                // Places your code here if you want to do anything after save completed.
                displayMyCardsPage(currentUserId, currentUserId);
            }).then(() => {
                // Reset curRow
                curRow = null;
            })
        }, () => {
            // 'Cancel' clicked.
            // reset the state of current row
            resetTableElement();
            enableButton(curRow !== null, document.getElementById('my-cards-page-edit'));
        })
    }
}

function resetTableElement() {
    if (curRow !== null) {
        curRow.style.background='';
        curRow.style.color='black';
        curRow = null;
    }
}

function deleteFavoriteTable() {
    document.getElementById('favorite-list').innerHTML = '';
}

function deleteMyCardsTable() {
    document.getElementById('my-cards-list').innerHTML = '';
}

function enableButton (condition, button) {
    button.disabled = !condition;
}

module.exports = {
    enableButton: enableButton,
    deleteFavoriteTable: deleteFavoriteTable,
    deleteMyCardsTable: deleteMyCardsTable,
    displayFavoritePage: displayFavoritePage,
    displayMyCardsPage: displayMyCardsPage,
};