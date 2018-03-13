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

function contains(arr, val) {
    if (arr.indexOf(val) !== -1) {
        return true;
    } else {
        return false;
    }
}

function getCardRandomId(length, set) {
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

function getThreeAnswer(index, choicelength) {
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

function shuffleAnwser(index, choicelength) {
    let answerset = getThreeAnswer(index, choicelength);
    for (let i = answerset.length - 1; i >= 0; i--) {
        let j = parseInt(Math.random() * (i + 1));
        let t = answerset[i];
        answerset[i] = answerset[j];
        answerset[j] = t;
    }
    return answerset;
}

function addtoFavoriteJson(currentUserId, i, actual_JSON) {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:2666/users/' + currentUserId +'/fav';
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function(){
        console.log('onreadystatechange: '+ xhr.readyState);
    };
    xhr.setRequestHeader('currentId', currentUserId);
    xhr.send('{"id": '+ actual_JSON[i].cardId +'}');
}

function removeFromFavoriteJson(currentUserId, i, actual_JSON) {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:2666/users/' + currentUserId +'/fav/' + actual_JSON[i].cardId;
    xhr.open('DELETE', url, true);
    xhr.onreadystatechange = function(){
        console.log('onreadystatechange: '+ xhr.readyState);
    };
    xhr.setRequestHeader('currentId', currentUserId);
    xhr.send();
}

module.exports={
    showStudypage: showStudypage,
    shuffleAnwser: ((index, choicelength) => shuffleAnwser(index, choicelength)),
    getCardRandomId: ((length, set) => getCardRandomId(length, set)),
    addtoFavoriteJson: ((currentUserId, i, actual_JSON) => addtoFavoriteJson(currentUserId, i, actual_JSON)),
    removeFromFavoriteJson: ((currentUserId, i, actual_JSON) => removeFromFavoriteJson(currentUserId, i, actual_JSON)),
};
