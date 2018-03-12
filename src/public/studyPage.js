const img_array = ['./image/emptyheart.png', './image/fullheart.png'];

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