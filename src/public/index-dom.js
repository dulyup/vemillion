const img_array = ['./image/emptyheart.png', './image/fullheart.png'];

//==========================================================
//================fetch data from the server================
//==========================================================
function requestFavJsonUpdateFavList(){
    return fetch('http://localhost:2666/fav')
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => {
            deleteFavoriteTable();
            createFavoriteTable(fromJson);
            enableButton(fromJson.length !== 0 && curRow !== null, document.getElementById('favorite-page-edit'));
            enableButton(fromJson.length !== 0, document.getElementById('favorite-page-study'));
        })
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
}

function requestMyCardsJsonUpdateMyCardsList(){
    return fetch('http://localhost:2666/custom')
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => {
            deleteMyCardsTable();
            createMyCardsTable(fromJson);
            enableButton(fromJson.length !== 0 && curRow !== null, document.getElementById('my-cards-page-edit'));
            enableButton(fromJson.length !== 0, document.getElementById('my-cards-page-study'));
        })
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
}

var xobj;
function loadJSON() {
    xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = callback;
    xobj.open('GET', 'http://localhost:2666/cards', true);
    xobj.send(null);
}

function callback() {
    if ( xobj.readyState == 4 && xobj.status == "200") {
        displayStudyPage(xobj.responseText);
    }
}

var xfav;
function loadJSONFav() {
    xfav = new XMLHttpRequest();
    xfav.overrideMimeType("application/json");
    xfav.onreadystatechange = callbackFav;
    xfav.open('GET', 'http://localhost:2666/fav', true);
    xfav.send(null);
}

function callbackFav() {
    if ( xfav.readyState == 4 && xfav.status == "200") {
        displayStudyFavPage(xfav.responseText);
    }
}

var xcustom;
function loadJSONMyCard() {
    xcustom = new XMLHttpRequest();
    xcustom.overrideMimeType("application/json");
    xcustom.onreadystatechange = callbackMyCard;
    xcustom.open('GET', 'http://localhost:2666/custom', true);
    xcustom.send(null);
}

function callbackMyCard() {
    if ( xcustom.readyState == 4 && xcustom.status == "200") {
        displayStudyMyCardPage(xcustom.responseText);
    }
}

//======================================================
//==================Initialize the game=================
//======================================================
function start() {
    clearInterval(myTimer);
    addStudyListenerHomepage();
    addFavListenerHomepage();
    addMyCardListenerHomepage();
    displayHomepage();
    hideFavoritePage();
    hideMyCardsPage();
    hideStudyPage();
    //clear data of favorite list
    deleteFavoriteTable();
    //clear data of my cards list
    deleteMyCardsTable();
}

start();

//======================================================================
//==add listener for "study","favorite","my cards" buttons in Homepage==
//======================================================================
function addStudyListenerHomepage() {
    document.getElementById('homepage-study').addEventListener('click', loadJSON);
    document.getElementById('homepage-study').addEventListener('click', hideHomepage);
}

function addFavListenerHomepage() {
    document.getElementById('homepage-fav').addEventListener('click', displayFavoritePage);
    document.getElementById('homepage-fav').addEventListener('click', hideHomepage);
}

function addMyCardListenerHomepage() {
    document.getElementById('homepage-my-cards').addEventListener('click', hideHomepage);
    document.getElementById('homepage-my-cards').addEventListener('click', displayMyCardsPage);
}

//======================================================================
//====add listener for "back","edit","study" buttons in FavoritePage====
//======================================================================
function addBackListenerFavPage() {
    document.getElementById('favorite-page-back').addEventListener('click', start); //jump to homepage
}

function addEditListenerFavPage() {
    document.getElementById('favorite-page-edit').addEventListener('click', displayEditPageFromFavPage);
}

function addStudyListenerFavPage() {
    document.getElementById('favorite-page-study').addEventListener('click', loadJSONFav);
}


//=========================================================================
//==add listener for "back", "add", "edit","study" buttons in MyCardsPage==
//=========================================================================
function addBackListenerMyCaPage() {
    document.getElementById('my-cards-page-back').addEventListener('click', start); //jump to homepage
}

function addAddListenerMyCaPage() {
    document.getElementById('my-cards-page-add').addEventListener('click', displayAddPageFromMyCardPage);
}

function addEditListenerMyCaPage() {
    document.getElementById('my-cards-page-edit').addEventListener('click', displayEditPageFromMyCardPage);
}

function addStudyListenerMyCaPage() {
    document.getElementById('my-cards-page-study').addEventListener('click', loadJSONMyCard);
}


//=============================================================
//==========Create list for Favorite and MyCards page==========
//=============================================================
//create list for favorite page
function createFavoriteTable(json) {
    let table = document.createElement("table");
    //create header
    if (json.length !== 0) {
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
    if (json.length !== 0) {
        //create header
        createThead(table);
        //create tbody
        createTBody(table, json);
        document.getElementById('my-cards-list').appendChild(table);
        document.getElementById('my-cards-page-notification').innerHTML = "";
    } else {
        document.getElementById('my-cards-page-notification').innerHTML = "Create your own cards from here!";
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
let rowWordIdMap = {};
//create table body
function createTBody(table, json) {
    let tbody = document.createElement("tbody");
    //add tbody into table
    table.appendChild(tbody);
    //traverse all words in json
    for (let i = 0; i < Object.keys(json).length; i++) {
        const keyOfJson = ["side0", "side1"]; //keep it the same as key in json
        rowWordIdMap[i] = json[i]["id"];
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
function displayHomepage() {
    document.getElementById('page-header').innerHTML="Welcome to Flash Card";
    document.querySelector('.homepage').style.display = "";
}

function displayFavoritePage() {
    document.querySelector('.favorite-page').style = "";
    document.getElementById('page-header').innerHTML="Favorites";
    requestFavJsonUpdateFavList();
    addBackListenerFavPage();
    addEditListenerFavPage();
    addStudyListenerFavPage();
}

function displayMyCardsPage() {
    document.querySelector('.my-cards-page').style = "";
    document.getElementById('page-header').innerHTML="My Cards";
    requestMyCardsJsonUpdateMyCardsList();
    addAddListenerMyCaPage();
    addBackListenerMyCaPage();
    addEditListenerMyCaPage();
    addStudyListenerMyCaPage();
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
     if (c == 0) {
       clearInterval(myTimer);
       document.getElementById("haveNoIdea").click();
       document.getElementById("TimeOut").innerHTML = "Time out!";
     }
   }
   myClock();
   myTimer = setInterval(myClock, 1000);
}

var choiceJSON = [{id: 284, side0: "fart", side1: "屁(vi.)放屁"}, {id: 192, side0: "resist", side1: "(vt.)(vi.)抵抗,耐得住,抵制,反抗防染劑"}
,{id: 169, side0: "destination", side1: "目的地目的文件,目的單元"},{id: 214, side0: "specialize", side1: "(vt.)使特殊化,列舉,特別指明,限定...的範圍(vi.)成為專家,專攻"},{id: 248, side0: "react", side1: "re-act (vt.)重作,重演"}
,{id: 317, side0: "chronologically", side1: "(ad.)按年代地"}
,{id: 145, side0: "intellectual", side1: "有知識者,知識分子,憑理智做事者(a.)智力的,知性的,聰明的"}
,{id: 131, side0: "content", side1: "內容,滿足,意義,要旨(a.)滿足的,滿意的,意義的(vt.)使...滿足"}
,{id: 350, side0: "unwillingness", side1: "不願意;不情願"},{id: 243, side0: "definition", side1: "u定義;限定,確定;清晰度"}];

function displayStudyPage(response) {
    document.querySelector('.study-page').style.display = 'block';
    hideHomepage();
    hideMyCardsPage();
    hideFavoritePage();
    showStudypage();

    let actual_JSON = JSON.parse(response);
    let length = actual_JSON.length;

    studyPage(actual_JSON, length);
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

function displayStudyFavPage(response) {
    document.querySelector('.study-page').style.display = 'block';
    showStudypage();
    hideHomepage();
    hideFavoritePage();
    hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    studyPage(actual_JSON.concat(choiceJSON), length);
}

function displayStudyMyCardPage(response) {
    document.querySelector('.study-page').style.display = 'block';
    showStudypage();
    hideHomepage();
    hideFavoritePage();
    hideMyCardsPage();

    let actual_JSON = JSON.parse(response);
    let length = Object.keys(actual_JSON).length;

    studyPage(actual_JSON.concat(choiceJSON), length);
}

function studyPage(actual_JSON, length) {
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
  document.getElementById("exit").addEventListener('click', exitClicked);
  document.getElementById("answerPageButton").addEventListener('click', answerPageButtonClicked);
  document.getElementById("addtoFavorite").addEventListener('click', addtoFavoriteClicked)

  function exitClicked() {
    document.getElementById("haveNoIdea").removeEventListener('click', haveNoIdeaButtonClicked);
    document.getElementById("AButton").removeEventListener('click', AButtonClicked);
    document.getElementById("BButton").removeEventListener('click', BButtonClicked);
    document.getElementById("CButton").removeEventListener('click', CButtonClicked);
    document.getElementById("exit").removeEventListener('click', start);
    document.getElementById("answerPageButton").removeEventListener('click', answerPageButtonClicked);
    document.getElementById("addtoFavorite").removeEventListener('click', addtoFavoriteClicked)
    start();
  }

  function haveNoIdeaButtonClicked() {
      document.getElementById("card").style.display = "block";
      buttonClicked();
      document.getElementById("result").innerHTML = "You missed the anwser.";
      document.getElementById("addtoFavorite").style.visibility = 'visible';
      clearInterval(myTimer);
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
      document.getElementById("card").style.display = "none";
      document.getElementById("header").style.display = 'none';
      document.getElementById("anwser").style.visibility = 'visible';
      document.getElementById("correctAnwser").innerHTML = correctAnwser;
      clearInterval(myTimer);
  }

  function answerPageButtonClicked() {
      document.getElementById("result").innerHTML = "";
      clearInterval(myTimer);
      if (document.getElementById("answerPageButton").value == "Exit") {
          exitClicked();
      } else if (document.getElementById("answerPageButton").value == "Next"){
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
      if(j == img_array.length) {
          j = 0;
      }
      document.getElementById("myImg").src=img_array[j];
      if (j == 1) {
          addtoFavoriteJson();
      } else {
          removeFromFavoriteJson();
      }
  }

  function addtoFavoriteJson() {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:2666/fav', true);
      xhr.onreadystatechange = function(){
          console.log('onreadystatechange: '+ xhr.readyState);
      };
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send('{"id": '+ actual_JSON[i].id +'}');
  }

  function removeFromFavoriteJson() {
      var xhr = new XMLHttpRequest();
      let url = "http://localhost:2666/fav/" + actual_JSON[i].id;
      console.log(url);
      xhr.open('DELETE', url, true);
      xhr.onreadystatechange=function(){
          console.log('onreadystatechange: '+ xhr.readyState);
      };
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send();
  }

  showQuestion(i, answerset);

  function showQuestion(i, answerset) {
      clock();
      document.getElementById("card").style.display = "block";
      let num =  parseInt(Math.random() * 2);
      if (actual_JSON[i].inFav) {
        j = 1;
        document.getElementById("myImg").src = img_array[j];
      } else {
        j = 0;
        document.getElementById("myImg").src = img_array[j];
      }
      if (num == 1) {
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
const editPage = new EditPage();
function displayAddPageFromMyCardPage() {
    console.log("displayAddPageFromMyCardPage");
    editPage.showAddOrEditPage(null, (obj) => {
        // 'Save' clicked.
        editPage.saveCtmCard(obj).then(() => {
            // Places your code here if you want to do anything after save completed.
            displayMyCardsPage();
        }).then(() => {
            curRow = null;
        })
    }, () => {
        // 'Cancel' clicked.
        curRow.style.background = '';
    })
}

function displayEditPageFromFavPage() {
    let idOfSelectedWord = getIdOfSelectedWord();
    console.log(idOfSelectedWord); //when click edit, print id in console
    if (idOfSelectedWord) {
        editPage.showAddOrEditPage(idOfSelectedWord, (obj) => {
            // 'Save' clicked.
            editPage.updateCard(idOfSelectedWord, obj).then(() => {
                // Places your code here if you want to do anything after save completed.
                displayFavoritePage();
            }).then(() => {
                curRow = null;
            })
        }, () => {
            // 'Cancel' clicked.
            // reset the state of current row
            curRow.style.background='';
            curRow.style.color='black';
            curRow = null;
            enableButton(curRow !== null, document.getElementById('favorite-page-edit'));
        });
    }
}


function displayEditPageFromMyCardPage() {
    let idOfSelectedWord = getIdOfSelectedWord();
    console.log(idOfSelectedWord); //when click edit, print id in console
    if (idOfSelectedWord) {
        editPage.showAddOrEditPage(idOfSelectedWord, (obj) => {
            // 'Save' clicked.
            editPage.updateCard(idOfSelectedWord, obj).then(() => {
                // Places your code here if you want to do anything after save completed.
                displayMyCardsPage();
            }).then(() => {
                // Reset curRow
                curRow = null;
            })
        }, () => {
            // 'Cancel' clicked.
            // reset the state of current row
            curRow.style.background='';
            curRow.style.color='black';
            curRow = null;
            enableButton(curRow !== null, document.getElementById('my-cards-page-edit'));
        })
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

function deleteFavoriteTable() {
    document.getElementById('favorite-list').innerHTML = '';
}

function deleteMyCardsTable() {
    document.getElementById('my-cards-list').innerHTML = '';
}
