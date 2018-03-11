const img_array = ['./image/emptyheart.png', './image/fullheart.png'];
//==========================================================
//================fetch data from the server================
//==========================================================
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

function requestFavJsonUpdateFavList(currentUserId){
    return fetch('http://localhost:2666/users/'+ currentUserId +'/fav',
        {headers: {'currentId': currentUserId}
        }).then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => {
            deleteFavoriteTable();
            createFavoriteTable(fromJson);
            enableButton(fromJson !== null && curRow !== null, document.getElementById('favorite-page-edit'));
            enableButton(fromJson !== null, document.getElementById('favorite-page-study'));
        })
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
}

function requestMyCardsJsonUpdateMyCardsList(currentUserId, chooseId){
    let url = 'http://localhost:2666/users/'+chooseId+'/custom';
    return fetch(url, {headers: {'currentId': currentUserId}})
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => {
            deleteMyCardsTable();
            createMyCardsTable(fromJson);
            enableButton(fromJson !== null && curRow !== null, document.getElementById('my-cards-page-edit'));
            enableButton(fromJson !== null, document.getElementById('my-cards-page-study'));
        })
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
}

var xobj;
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

var xfav;
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

var xcustom;
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

//======================================================
//==================Initialize the game=================
//======================================================
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

function start(currentUserId) {
    clearInterval(myTimer);
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
    deleteFavoriteTable();
    //clear data of my cards list
    deleteMyCardsTable();
}

//======================================================================
//==add listener for "study","favorite","my cards" buttons in Homepage==
//======================================================================
function addStudyListenerHomepage(currentUserId) {
    document.getElementById('homepage-study').addEventListener('click', function(){loadJSON(currentUserId);});
    document.getElementById('homepage-study').addEventListener('click', hideHomepage);
}

function addFavListenerHomepage(currentUserId) {
    document.getElementById('homepage-fav').addEventListener('click', function() {displayFavoritePage(currentUserId);});
    document.getElementById('homepage-fav').addEventListener('click', hideHomepage);
}

function addMyCardListenerHomepage(currentUserId) {
    document.getElementById('homepage-my-cards').addEventListener('click', hideHomepage);
    document.getElementById('homepage-my-cards').addEventListener('click', function() {displayMyCardsPage(currentUserId, currentUserId);});
}

function addSelectListenerHomepage(currentUserId) {
  document.getElementById('homepage-dropbtn').addEventListener('change', hideHomepage);
  document.getElementById('homepage-dropbtn').addEventListener('change', function() {onchange(currentUserId);});
}

function onchange1(currentUserId) {
   let selectedUserId = select.options[1].text;
   displayMyCardsPage(currentUserId, selectedUserId);
}

function onchange(currentUserId) {
    let select = document.getElementById('homepage-dropbtn');
    let index = select.selectedIndex;
    let selectedUserId = select.options[index].text;
    displayMyCardsPage(currentUserId, selectedUserId);
}
//======================================================================
//====add listener for "back","edit","study" buttons in FavoritePage====
//======================================================================
function addBackListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-back').addEventListener('click', function() {start(currentUserId);}); //jump to homepage
}

function addEditListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-edit').addEventListener('click', function() {displayEditPageFromFavPage(currentUserId);});
}

function addStudyListenerFavPage(currentUserId) {
    document.getElementById('favorite-page-study').addEventListener('click', function() {loadJSONFav(currentUserId);});
}


//=========================================================================
//==add listener for "back", "add", "edit","study" buttons in MyCardsPage==
//=========================================================================
function addBackListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-back').addEventListener('click', function(){start(currentUserId);}); //jump to homepage
}

function addAddListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-add').addEventListener('click', function(){displayAddPageFromMyCardPage(currentUserId);});
}

function addEditListenerMyCaPage(currentUserId) {
    document.getElementById('my-cards-page-edit').addEventListener('click', function() {displayEditPageFromMyCardPage(currentUserId);});
}

function addStudyListenerMyCaPage(currentUserId, chooseId) {
    document.getElementById('my-cards-page-study').addEventListener('click', function() {loadJSONMyCard(currentUserId, chooseId);});
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
function selectRow(obj) {
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
}

//Return the id of the selected word and pass it to edit page
function getIdOfSelectedWord() {
    if (curRow !== null) {
        return rowWordIdMap[curRow.rowIndex - 1];
    }
    return null;
}

//=========================================================
//=================Display different pages=================
//=========================================================
function displayHomepage(currentUserId) {
    document.getElementById('page-header').innerHTML="Welcome User " + currentUserId + " to Flash Card";
    document.querySelector('.homepage').style.display = "";
}

function displayFavoritePage(currentUserId) {
    document.querySelector('.favorite-page').style = "";
    document.getElementById('page-header').innerHTML="Favorites";
    requestFavJsonUpdateFavList(currentUserId);
    addBackListenerFavPage(currentUserId);
    addEditListenerFavPage(currentUserId);
    addStudyListenerFavPage(currentUserId);
}

function displayMyCardsPage(currentUserId, chooseId) {
    document.querySelector('.my-cards-page').style = "";
    if (currentUserId === chooseId) {
        requestMyCardsJsonUpdateMyCardsList(currentUserId, chooseId);
        document.getElementById('page-header').innerHTML="My Cards";
        document.getElementById('my-cards-page-add').style.display = "";
        document.getElementById('my-cards-page-edit').style.display = "";
        addAddListenerMyCaPage(currentUserId);
        addEditListenerMyCaPage(currentUserId);
        addStudyListenerMyCaPage(currentUserId, chooseId);
        addBackListenerMyCaPage(currentUserId);
    } else {  //
        requestMyCardsJsonUpdateMyCardsList(currentUserId, chooseId);
        document.getElementById('page-header').innerHTML= "User " +chooseId + " 's Cards";
        addStudyListenerMyCaPage(currentUserId, chooseId);
        document.getElementById('my-cards-page-add').style.display = "none";
        document.getElementById('my-cards-page-edit').style.display = "none";
        addBackListenerMyCaPage(currentUserId);
    }
}

//==============================================
//===========Enable or Disable button===========
//==============================================
function enableButton (condition, button) {
    button.disabled = !condition;
}


//======================================================================
//==============================Study Page==============================
//======================================================================
//from lulu tong
var myTimer;
function clock() {
   var c = 11;
   function myClock() {
     document.getElementById("time").innerHTML = --c;
     if (c === 0) {
       clearInterval(myTimer);
       document.getElementById("haveNoIdea").click();
       document.getElementById("TimeOut").innerHTML = "Time out!";
     }
   }
   myClock();
   myTimer = setInterval(myClock, 1000);
}

let choiceJSON = [{id: 284, side0: "fart", side1: "屁(vi.)放屁"}, {id: 192, side0: "resist", side1: "(vt.)(vi.)抵抗,耐得住,抵制,反抗防染劑"}
,{id: 169, side0: "destination", side1: "目的地目的文件,目的單元"},{id: 214, side0: "specialize", side1: "(vt.)使特殊化,列舉,特別指明,限定...的範圍(vi.)成為專家,專攻"},{id: 248, side0: "react", side1: "re-act (vt.)重作,重演"}
,{id: 317, side0: "chronologically", side1: "(ad.)按年代地"}
,{id: 145, side0: "intellectual", side1: "有知識者,知識分子,憑理智做事者(a.)智力的,知性的,聰明的"}
,{id: 131, side0: "content", side1: "內容,滿足,意義,要旨(a.)滿足的,滿意的,意義的(vt.)使...滿足"}
,{id: 350, side0: "unwillingness", side1: "不願意;不情願"},{id: 243, side0: "definition", side1: "u定義;限定,確定;清晰度"}];

function displayStudyPage(response, currentUserId) {
    document.querySelector('.study-page').style.display = 'block';
    hideHomepage();
    hideMyCardsPage();
    hideFavoritePage();
    showStudypage();

    let actual_JSON = JSON.parse(response);
    let length = actual_JSON.length;

    studyPage(actual_JSON, length, currentUserId, currentUserId);
}

function showStudypage() {
    document.getElementById("header").style.visibility = 'visible';
    document.getElementById("question").style.visibility = 'visible';
    document.getElementById("AButton").style.visibility = 'visible';
    document.getElementById("BButton").style.visibility = 'visible';
    document.getElementById("CButton").style.visibility = 'visible';
    document.getElementById("haveNoIdea").style.visibility = 'visible';
    document.getElementById("exit").style.visibility = 'visible';
    document.getElementById("answerPageButton").value = "Next";
}

function displayStudyFavPage(response, currentUserId) {
    document.querySelector('.study-page').style.display = 'block';
    showStudypage();
    hideHomepage();
    hideFavoritePage();
    hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    studyPage(actual_JSON.concat(choiceJSON), length, currentUserId, currentUserId);
}

function displayStudyMyCardPage(response, currentUserId, chooseId) {
    document.querySelector('.study-page').style.display = 'block';
    showStudypage();
    hideHomepage();
    hideFavoritePage();
    hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    studyPage(actual_JSON.concat(choiceJSON), length, currentUserId, chooseId);
}

function studyPage(actual_JSON, length, currentUserId, chooseId) {
    let count = 1;
    let j = 1;
    let correctAnwser = "";
    let set = [];   // make sure questions have no duplicate.
    let choicelength = actual_JSON.length;

    function contains(arr, val) {
        if (arr.indexOf(val) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    function getCardRandomId() {
        let index;
        while (set.length < 10) {
            index = parseInt(Math.random() * length);
            if (!contains(set, index)) {
                set.push(index);
                break;
            }
        }
        return index;
    }

    function getThreeAnswer(index) {
        let threeAnswers = [];
        threeAnswers.push(index);
        while(threeAnswers.length < 3) {
            let j = parseInt(Math.random() * choicelength);
            if (!contains(threeAnswers, j)) {
                threeAnswers.push(j);
            }
        }
        return threeAnswers;
    }

    function shuffleAnwser(index) {
        let answerset = getThreeAnswer(index);
        for (let i = answerset.length - 1; i >= 0; i--) {
            let j = parseInt(Math.random() * (i + 1));
            let t = answerset[i];
            answerset[i] = answerset[j];
            answerset[j] = t;
        }
        return answerset;
    }

    let i = getCardRandomId();
    let answerset = shuffleAnwser(i);

    document.getElementById("anwser").style.visibility = 'hidden';
    document.getElementById("haveNoIdea").addEventListener('click', haveNoIdeaButtonClicked);
    document.getElementById("AButton").addEventListener('click', AButtonClicked);
    document.getElementById("BButton").addEventListener('click', BButtonClicked);
    document.getElementById("CButton").addEventListener('click', CButtonClicked);
    document.getElementById("exit").addEventListener('click', function() {exitClicked(currentUserId);});
    document.getElementById("answerPageButton").addEventListener('click', answerPageButtonClicked);
    document.getElementById("addtoFavorite").addEventListener('click', addtoFavoriteClicked)

    function exitClicked(currentUserId) {
      document.getElementById("haveNoIdea").removeEventListener('click', haveNoIdeaButtonClicked);
      document.getElementById("AButton").removeEventListener('click', AButtonClicked);
      document.getElementById("BButton").removeEventListener('click', BButtonClicked);
      document.getElementById("CButton").removeEventListener('click', CButtonClicked);
      document.getElementById("answerPageButton").removeEventListener('click', answerPageButtonClicked);
      document.getElementById("addtoFavorite").removeEventListener('click', addtoFavoriteClicked)
      start(currentUserId);
    }

    function haveNoIdeaButtonClicked() {
        clearInterval(myTimer);
        document.getElementById("card").style.display = "block";
        buttonClicked();
        document.getElementById("result").innerHTML = "You missed the anwser.";
        document.getElementById("addtoFavorite").style.visibility = 'visible';

    }

    function AButtonClicked() {
        buttonClicked();
        getResult(document.getElementById("AButton").value, "A. " +  correctAnwser);
    }

    function BButtonClicked() {
        buttonClicked();
        getResult(document.getElementById("BButton").value, "B. "  + correctAnwser);
    }

    function CButtonClicked() {
        buttonClicked();
        getResult(document.getElementById("CButton").value, "C. " + correctAnwser);
    }

    function getResult(value, answer) {
        if (value === answer) {
            document.getElementById("result").innerHTML = "Correct!";
        } else {
            document.getElementById("result").innerHTML = "Wrong!";
        }
        document.getElementById("addtoFavorite").style.visibility = 'visible';
    }

    function buttonClicked() {
        clearInterval(myTimer);
        document.getElementById("card").style.display = "none";
        document.getElementById("header").style.display = 'none';
        document.getElementById("anwser").style.visibility = 'visible';
        document.getElementById("correctAnwser").innerHTML = correctAnwser;
    }

    function answerPageButtonClicked() {
        document.getElementById("result").innerHTML = "";
        clearInterval(myTimer);
        if (document.getElementById("answerPageButton").value === "Exit") {
            exitClicked(currentUserId);
        } else if (document.getElementById("answerPageButton").value === "Next"){
            nextButtonClicked();
        }
    }

    function nextButtonClicked() {
        count += 1;
        i = getCardRandomId();
        answerset = shuffleAnwser(i);
        document.getElementById("TimeOut").innerHTML = "";
        document.getElementById("header").style.display = 'block';
        document.getElementById("myImg").src= img_array[0];
        j = 0;
        document.getElementById("addtoFavorite").style.visibility = 'hidden';
        if ((count <= 10 && length >= 10) || (count <= length && length < 10)) {   //three questions at most
            showQuestion(i, answerset);
            document.getElementById("card").style.display = "block";
            document.getElementById("header").style.visibility = 'visible';
            document.getElementById("anwser").style.visibility = 'hidden';
        } else { // end of the JSON file
            document.getElementById("header").style.visibility = 'hidden';
            document.getElementById("question").style.visibility = 'hidden';
            document.getElementById("card").style.visibility = 'hidden';
            document.getElementById("anwser").style.visibility = 'visible';
            document.getElementById("correctAnwser").innerHTML = "Congratulation! You have complete today's study.";
            document.getElementById("answerPageButton").value = "Exit";
        }
    }

    function addtoFavoriteClicked() {
        j++;
        if(j === img_array.length) {
            j = 0;
        }
        document.getElementById("myImg").src=img_array[j];
        if (j === 1) {
            addtoFavoriteJson();
        } else {
            removeFromFavoriteJson();
        }
    }

    function addtoFavoriteJson() {
        var xhr = new XMLHttpRequest();
        let url = 'http://localhost:2666/users/' + currentUserId +'/fav';
        xhr.open('POST', url, true);
        xhr.onreadystatechange = function(){
            console.log('onreadystatechange: '+ xhr.readyState);
        };
        xhr.setRequestHeader('currentId', currentUserId);
        xhr.send('{"id": '+ actual_JSON[i].cardId +'}');
    }

    function removeFromFavoriteJson() {
        var xhr = new XMLHttpRequest();
        let url = 'http://localhost:2666/users/' + currentUserId +'/fav/' + actual_JSON[i].cardId;
        xhr.open('DELETE', url, true);
        xhr.onreadystatechange=function(){
            console.log('onreadystatechange: '+ xhr.readyState);
        };
        xhr.setRequestHeader('currentId', currentUserId);
        xhr.send();
    }

    showQuestion(i, answerset);

    function showQuestion(i, answerset) {
        clock();
        document.getElementById("card").style.display = "block";
        let num =  parseInt(Math.random() * 2);
        if (actual_JSON[i].infav) {
          j = 1;
          document.getElementById("myImg").src = img_array[j];
        } else {
          j = 0;
          document.getElementById("myImg").src = img_array[j];
        }
        if (num === 1) {
            document.getElementById("question").innerHTML = actual_JSON[i].side0;
            document.getElementById("AButton").value = "A. " + actual_JSON[answerset[0]].side1;
            document.getElementById("BButton").value = "B. " + actual_JSON[answerset[1]].side1;
            document.getElementById("CButton").value = "C. " + actual_JSON[answerset[2]].side1;
            correctAnwser = actual_JSON[i].side1;
        } else {
            document.getElementById("question").innerHTML = actual_JSON[i].side1;
            document.getElementById("AButton").value = "A. " + actual_JSON[answerset[0]].side0;
            document.getElementById("BButton").value = "B. " + actual_JSON[answerset[1]].side0;
            document.getElementById("CButton").value = "C. " + actual_JSON[answerset[2]].side0;
            correctAnwser = actual_JSON[i].side0;
        }
    }
}


//=====================================================
//===============Display edit, add pages===============
//=====================================================
//from lu niu
// const editPage = new EditPage();
function displayAddPageFromMyCardPage(currentUserId) {
    let editPage = new EditPage();
    editPage.showAddOrEditPage(null, currentUserId, (obj) => {
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
        editPage.showAddOrEditPage(idOfSelectedWord, currentUserId, (obj) => {
            // 'Save' clicked.
            console.log(currentUserId);
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
        editPage.showAddOrEditPage(idOfSelectedWord, currentUserId, (obj) => {
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

//==============================================================
//==================Hide pages and clear lists==================
//==============================================================
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

function deleteFavoriteTable() {
    document.getElementById('favorite-list').innerHTML = '';
}

function deleteMyCardsTable() {
    document.getElementById('my-cards-list').innerHTML = '';
}
