// const server = require('./connectServer');

//Homepage
const homepage = document.querySelector('.homepage');
const favoritePage = document.querySelector('.favorite-page');
const myCardsPage = document.querySelector('.my-cards-page');
//Favorite Page
const favoriteTable = document.getElementById('favorite-list');
//My Cards Page
const myCardsTable = document.getElementById('my-cards-list');

function requestFavJsonUpdateFavList(){
    return fetch('http://localhost:2666/fav')
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => {let json = fromJson; createFavoriteTable(json);})
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
        }).then(fromJson => {let json = fromJson; createMyCardsTable(json);})
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
}

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://localhost:2666/cards', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if ( xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

function loadJSONFav(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://localhost:2666/fav', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if ( xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

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
}

function addMyCardListenerHomepage() {
    const myCaBtnsHomepage = document.getElementById('homepage-my-cards');
    myCaBtnsHomepage.addEventListener('click', hideHomepage);
    myCaBtnsHomepage.addEventListener('click', displayMyCardsPage);
}

//==================================================================
//==add listener for "back","edit","study" buttons in FavoritePage==
//==================================================================
function addBackListenerFavPage() {
    document.querySelector('.favorite-page-back').addEventListener('click', start); //jump to homepage
}

function addEditListenerFavPage() {
    document.querySelector('.favorite-page-edit').addEventListener('click', displayEditPageFromFavPage);
}

function addStudyListenerFavPage() {
    document.querySelector('.favorite-page-study').addEventListener('click', displayStudyFavPage);
}

//=========================================================================
//==add listener for "back", "add", "edit","study" buttons in MyCardsPage==
//=========================================================================
function addBackListenerMyCaPage() {
    document.querySelector('.my-cards-page-back').addEventListener('click', start); //jump to homepage
}

function addAddListenerMyCaPage() {
    document.querySelector('.my-cards-page-add').addEventListener('click', displayAddPageFromMyCardPage);
}

function addEditListenerMyCaPage() {
    document.querySelector('.my-cards-page-edit').addEventListener('click', displayEditPageFromMyCardPage);
}

function addStudyListenerMyCaPage() {
    document.querySelector('.my-cards-page-study').addEventListener('click', displayStudyPage);
}

//=============================================
//==Create list for Favorite and MyCards page==
//=============================================
//create list for favorite page
function createFavoriteTable(json) {
    let table = document.createElement("table");
    //create header
    createThead(table);
    //create tbody
    createTBody(table, json);
    favoriteTable.appendChild(table);
}

//create list for my cards page
function createMyCardsTable(json) {
    let table = document.createElement("table");
    //create header
    createThead(table);
    //create tbody
    createTBody(table, json);
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
function createTBody(table, json) {
    let tbody = document.createElement("tbody");
    //add tbody into table
    table.appendChild(tbody);
    //traverse all words in json
    for (let i = 0; i < Object.keys(json).length; i++) {
        const keyOfJson = ["side0", "side1"]; //keep it the same as key in json
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
        curRow.style.background="#b6e1c8";
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
    requestFavJsonUpdateFavList();
    addBackListenerFavPage();
    addEditListenerFavPage();
    addStudyListenerFavPage();
}

function displayMyCardsPage() {
    myCardsPage.style = "";
    requestMyCardsJsonUpdateMyCardsList();
    addAddListenerMyCaPage();
    addBackListenerMyCaPage();
    addEditListenerMyCaPage();
    addStudyListenerMyCaPage();
}

//from lulu tong
function displayStudyPage() {
    document.querySelector('.study-page').style.display = 'block';
    hideHomepage();
    hideMyCardsPage();
    hideFavoritePage();
    let count = 1;
    let flag = false;
    let timerFlag = false;
    let answerTimerFlag = false;
    let j = 0;
    let correctAnwser = "";
    let img_array = new Array('./image/emptyheart.png', './image/fullheart.png');
    let set = [];   // make sure questions have no duplicate.

    function init() {

        function startTimer(duration, display) {
            let start = Date.now(),
                diff,
                minutes,
                seconds;

            function timer() {
                // get the number of seconds that have elapsed since
                // startTimer() was called
                let currentTime = Date.now();

                diff = duration - (((currentTime - start) / 1000) | 0);
                msDiff = duration * 1000 - (currentTime - start);
                // console.log(Math.floor(msDiff / 100));

                // does the same job as parseInt truncates the float
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (timerFlag) { // start Timer again
                    start = Date.now() + 1000;
                    diff = duration - (((Date.now() - start) / 1000) | 0);
                    timerFlag = false;
                }

                if (!answerTimerFlag) {  // if answerTimerFlag is false, we try to meet the condition that timer = 0
                    if (Math.floor(msDiff / 100) == 0) {
                        // add one second so that the count down starts at the full duration
                        // example 05:00 not 04:59

                        // start = Date.now() + 1000;
                        if (!flag) {  // if flag is false, we didn't complete whole study, and time out
                            document.getElementById("haveNoIdea").click();
                            document.getElementById("TimeOut").innerHTML = "Time out!"
                            timerFlag = false;
                        }
                    }
                }
            };

            // we don't want to wait a full second before the timer starts
            timer();
            setInterval(timer, 5);
        }

        function onLoad() {
            let seconds = 10,
                display = document.querySelector('#time');
            startTimer(seconds, display);
        };

        loadJSON(function(response) {
            // Parse JSON string into object
            var myTimer = onLoad();

            var actual_JSON = JSON.parse(response);
            console.log(actual_JSON);
            console.log("length: " + actual_JSON.length);

            function contains(arr, val) {
                if (arr.indexOf(val) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }

            function getCardRandomId() {
                let index;
                while (true) {
                    index = parseInt(Math.random() * (actual_JSON.length + 1));
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
                    let j = parseInt(Math.random() * (actual_JSON.length + 1));
                    if (!contains(threeAnswers, j)) {
                        threeAnswers.push(j);
                    }
                }
                return threeAnswers;
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            function shuffleAnwser(index) {
                let answerset = getThreeAnswer(index);
                for (let i = answerset.length - 1; i > 0; i--) {
                    var j = getRandomInt(0, i);
                    var t = answerset[i];
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
            document.getElementById("exit").addEventListener('click', start);
            document.getElementById("answerPageButton").addEventListener('click', answerPageButtonClicked);
            document.getElementById("addtoFavorite").addEventListener('click', addtoFavoriteClicked)

            function haveNoIdeaButtonClicked() {
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
                answerTimerFlag = true;
                var x = document.getElementById("card");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
                // document.getElementById("header").style.visibility = 'hidden';
                document.getElementById("header").style.display = 'none';
                // document.getElementById("question").style.visibility = 'visible';
                document.getElementById("anwser").style.visibility = 'visible';
                // document.getElementById("next").style.visibility = 'visible'
                document.getElementById("correctAnwser").innerHTML = correctAnwser;
            }

            function answerPageButtonClicked() {
                timerFlag = true;
                answerTimerFlag = false;
                document.getElementById("result").innerHTML = "";
                // console.log(value);
                if (document.getElementById("answerPageButton").value == "Exit") {
                    start();
                } else {
                    nextButtonClicked();
                }
            }

            function nextButtonClicked() {
                count += 1;
                i = getCardRandomId();
                answerset = shuffleAnwser(i);
                document.getElementById("TimeOut").innerHTML = "";
                document.getElementById("header").style.display = 'block';
                timerFlag = true;
                document.getElementById("myImg").src= img_array[0];
                j = 0;
                document.getElementById("addtoFavorite").style.visibility = 'hidden';
                if (count <= 10) {
                    if (document.getElementById("card").style.display === "none") {
                        document.getElementById("card").style.display = "block";
                    } else if (document.getElementById("card").style.display === "block"){
                        document.getElementById("card").style.display = "none";
                    }
                    document.getElementById("header").style.visibility = 'visible';
                    document.getElementById("anwser").style.visibility = 'hidden';
                    showQuestion(i, answerset);
                } else if (count > 10 || count == actual_JSON.length){ // end of the JSON file
                    flag = true;
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
                xhr.onreadystatechange=function(){
                    console.log('onreadystatechange: '+ xhr.readyState);
                };
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send('{"id": '+ i +'}');
            }

            function removeFromFavoriteJson() {

            }

            showQuestion(i, answerset);

            function showQuestion(i, answerset) {
                let num =  parseInt(Math.random() * 2);
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
        });
    }

    init();
}

function displayStudyFavPage() {
    document.querySelector('.study-page').style.display = 'block';
    hideFavoritePage();
    hideMyCardsPage();
    let count = 1;
    let flag = false;
    let timerFlag = false;
    let answerTimerFlag = false;
    let j = 0;
    let correctAnwser = "";
    let img_array = new Array('./image/emptyheart.png', './image/fullheart.png');
    let set = [];   // make sure questions have no duplicate.

    function init() {

        function startTimer(duration, display) {
            let start = Date.now(),
                diff,
                minutes,
                seconds;

            function timer() {
                // get the number of seconds that have elapsed since
                // startTimer() was called
                let currentTime = Date.now();

                diff = duration - (((currentTime - start) / 1000) | 0);
                msDiff = duration * 1000 - (currentTime - start);
                // console.log(Math.floor(msDiff / 100));

                // does the same job as parseInt truncates the float
                minutes = (diff / 60) | 0;
                seconds = (diff % 60) | 0;

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (timerFlag) { // start Timer again
                    start = Date.now() + 1000;
                    diff = duration - (((Date.now() - start) / 1000) | 0);
                    timerFlag = false;
                }

                if (!answerTimerFlag) {  // if answerTimerFlag is false, we try to meet the condition that timer = 0
                    if (Math.floor(msDiff / 100) == 0) {
                        // add one second so that the count down starts at the full duration
                        // example 05:00 not 04:59

                        // start = Date.now() + 1000;
                        if (!flag) {  // if flag is false, we didn't complete whole study, and time out
                            document.getElementById("haveNoIdea").click();
                            document.getElementById("TimeOut").innerHTML = "Time out!"
                            timerFlag = false;
                        }
                    }
                }
            };

            // we don't want to wait a full second before the timer starts
            timer();
            setInterval(timer, 5);
        }

        function onLoad() {
            let seconds = 10,
                display = document.querySelector('#time');
            startTimer(seconds, display);
        };

        loadJSONFav(function(response) {
            // Parse JSON string into object
            onLoad();
            var actual_JSON = JSON.parse(response);
            let length = Object.keys(actual_JSON).length;

            function contains(arr, val) {
                if (arr.indexOf(val) !== -1) {
                    return true;
                } else {
                    return false;
                }
            }

            function getCardRandomId() {
                let index;
                while (true) {
                    index = parseInt(Math.random() * (length + 1));
                    console.log("index: " + index );
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
                    let j = parseInt(Math.random() * (length + 1));
                    if (!contains(threeAnswers, j)) {
                        threeAnswers.push(j);
                    }
                }
                return threeAnswers;
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            function shuffleAnwser(index) {
                let answerset = getThreeAnswer(index);
                for (let i = answerset.length - 1; i > 0; i--) {
                    var j = getRandomInt(0, i);
                    var t = answerset[i];
                    answerset[i] = answerset[j];
                    answerset[j] = t;
                }
                return answerset;
            }

            let i = getCardRandomId();
            console.log("i: " + i);
            console.log(actual_JSON[i].id);
            let answerset = shuffleAnwser(i);

            document.getElementById("anwser").style.visibility = 'hidden';
            document.getElementById("haveNoIdea").addEventListener('click', haveNoIdeaButtonClicked);
            document.getElementById("AButton").addEventListener('click', AButtonClicked);
            document.getElementById("BButton").addEventListener('click', BButtonClicked);
            document.getElementById("CButton").addEventListener('click', CButtonClicked);
            document.getElementById("exit").addEventListener('click', start);
            document.getElementById("answerPageButton").addEventListener('click', answerPageButtonClicked);
            document.getElementById("addtoFavorite").addEventListener('click', addtoFavoriteClicked)

            function haveNoIdeaButtonClicked() {
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
                // console.log(answer);
                // console.log(value);
                if (value === answer) {
                    document.getElementById("result").innerHTML = "Correct!";
                } else {
                    document.getElementById("result").innerHTML = "Wrong!";
                }
                document.getElementById("addtoFavorite").style.visibility = 'visible';
            }

            function buttonClicked() {
                answerTimerFlag = true;
                var x = document.getElementById("card");
                if (x.style.display === "none") {
                    x.style.display = "block";
                } else {
                    x.style.display = "none";
                }
                // document.getElementById("header").style.visibility = 'hidden';
                document.getElementById("header").style.display = 'none';
                // document.getElementById("question").style.visibility = 'visible';
                document.getElementById("anwser").style.visibility = 'visible';
                // document.getElementById("next").style.visibility = 'visible'
                document.getElementById("correctAnwser").innerHTML = correctAnwser;
            }

            function answerPageButtonClicked() {
                timerFlag = true;
                answerTimerFlag = false;
                document.getElementById("result").innerHTML = "";
                // console.log(value);
                if (document.getElementById("answerPageButton").value == "Exit") {
                    exitButtonClicked();
                } else {
                    nextButtonClicked();
                }
            }

            function nextButtonClicked() {
                count += 1;
                i = getCardRandomId();
                answerset = shuffleAnwser(i);
                document.getElementById("TimeOut").innerHTML = "";
                document.getElementById("header").style.display = 'block';
                timerFlag = true;
                document.getElementById("myImg").src= img_array[0];
                j = 0;
                document.getElementById("addtoFavorite").style.visibility = 'hidden';
                if (count <= 10) {
                    if (document.getElementById("card").style.display === "none") {
                        document.getElementById("card").style.display = "block";
                    } else if (document.getElementById("card").style.display === "block"){
                        document.getElementById("card").style.display = "none";
                    }
                    document.getElementById("header").style.visibility = 'visible';
                    document.getElementById("anwser").style.visibility = 'hidden';
                    showQuestion(i, answerset);
                } else if (count > 10 || count == actual_JSON.length){ // end of the JSON file
                    flag = true;
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
                xhr.onreadystatechange=function(){
                    console.log('onreadystatechange: '+ xhr.readyState);
                };
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                xhr.send('{"id": '+ i +'}');
            }

            function removeFromFavoriteJson() {

            }

            showQuestion(i, answerset);

            function showQuestion(i, answerset) {
                let num =  parseInt(Math.random() * 2);
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
        });
    }

    init();
}
//===========================
//==Display edit, add pages==
//===========================
//from lu niu
function displayAddPageFromMyCardPage() {
    deleteMyCardsTable();
    showAddOrEditPage(null, false);
}

//from lu niu
function displayEditPageFromFavPage() {
    let idOfSelectedWord = getIdOfSelectedWord();
    console.log(idOfSelectedWord); //when click edit, print id in console
    curRow = null; //show edit page, hide list, reset curRow(global variable) to null
    deleteFavoriteTable();
    showAddOrEditPage(idOfSelectedWord, true);
}

function displayEditPageFromMyCardPage() {
    let idOfSelectedWord = getIdOfSelectedWord();
    console.log(idOfSelectedWord); //when click edit, print id in console
    curRow = null; //show edit page, hide list, reset curRow(global variable) to null
    deleteMyCardsTable();
    showAddOrEditPage(idOfSelectedWord, false);
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

function hideStudyPage() {
    document.querySelector('.study-page').style.display = "none";
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
    hideStudyPage();
    //clear data of favorite list
    deleteFavoriteTable();
    //clear data of my cards list
    deleteMyCardsTable();
}

start();


/*let data = [
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
];*/
