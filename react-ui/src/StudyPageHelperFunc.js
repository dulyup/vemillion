
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
        index = parseInt(Math.random() * length, 10);
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
        let j = parseInt(Math.random() * choicelength, 10);
        if (!contains(threeAnswers, j)) {
            threeAnswers.push(j);
        }
    }
    return threeAnswers;
}

function shuffleAnwser(index, choicelength) {
    let answerset = getThreeAnswer(index, choicelength);
    for (let i = answerset.length - 1; i >= 0; i--) {
        let j = parseInt(Math.random() * (i + 1), 10);
        let t = answerset[i];
        answerset[i] = answerset[j];
        answerset[j] = t;
    }
    return answerset;
}

module.exports={
    shuffleAnwser: ((index, choicelength) => shuffleAnwser(index, choicelength)),
    getCardRandomId: ((length, set) => getCardRandomId(length, set)),
};
