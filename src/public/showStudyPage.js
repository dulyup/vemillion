const index = require('./index');
const helper = require('./showStudyPageHelperFunction.js');
const img_array = ['./image/emptyheart.png', './image/fullheart.png'];

let myTimer;
function clock() {
    let c = 11;
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

function studyPage(actual_JSON, length, currentUserId, chooseId) {
    let count = 1;
    let j = 1;
    let correctAnwser = "";
    let set = [];   // make sure questions have no duplicate.
    let choicelength = actual_JSON.length;
    clearInterval(myTimer);

    let i = helper.getCardRandomId(length, set);
    let answerset = helper.shuffleAnwser(i, choicelength);

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
        index.start(currentUserId);
    }

    function haveNoIdeaButtonClicked() {
        // clearInterval(myTimer);
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
        if (document.getElementById("answerPageButton").value === "Exit") {
            exitClicked(currentUserId);
        } else if (document.getElementById("answerPageButton").value === "Next"){
            nextButtonClicked();
        }
    }

    function nextButtonClicked() {
        count += 1;
        i = helper.getCardRandomId(length, set);;
        answerset = helper.shuffleAnwser(i, choicelength);
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
            clearInterval(myTimer);
            document.getElementById("header").style.visibility = 'hidden';
            document.getElementById("question").style.visibility = 'hidden';
            document.getElementById("card").style.visibility = 'hidden';
            document.getElementById("anwser").style.visibility = 'visible';
            document.getElementById("correctAnwser").innerHTML = "Congratulation! You have completed the study.";
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
            helper.addtoFavoriteJson(currentUserId, i, actual_JSON);
        } else {
            helper.removeFromFavoriteJson(currentUserId, i, actual_JSON);
        }
    }

    showQuestion(i, answerset);

    function showQuestion(i, answerset) {
        clearInterval(myTimer);
        document.getElementById("TimeOut").innerHTML = "";
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

module.exports = {
  studyPage: ((actual_JSON, length, currentUserId, chooseId) => studyPage(actual_JSON, length, currentUserId, chooseId)),
};
