if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

const cencelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const title = document.getElementById('title');
const modal = document.getElementsByClassName("edit-page");
const getCardByIdURL = "http://localhost:2666/cards/{0}";
const saveCardURL = "http://localhost:2666/cards";
saveBtn.disabled = false;
cancelBtn.disabled = false;

function render(data) {
    document.querySelector('.edit-inputs').innerHTML = generateInputs(data);
}

function generateInputs(data) {
    title.innerText = "Edit";
    if (Object.keys(data).length == 0) {
        title.innerText = "Add New";
        data = {english: "", chinese: ""};
    }

    return Object.keys(data).map((key, index) =>`<input class="input" key="${key}" value="${data[key]}"/><div id="${key}_status"> </div>`).join('\n');
}

function getUserInput(inputs) {
    var obj = {};
    inputs.forEach((input) => {
        obj[input.getAttribute('key')] = input.value;
    });

    return obj;
}

function validateInputs(inputs) {
    for (var i = 0; i < inputs.length; i++)
    {
        if (!inputs[i].value) {
            return false;
        }
    }

    return true;
}

function handleInputChangeListener(input) {
    const status = document.getElementById(input.getAttribute("key")+ "_status");
    if (!input.value) {
        input.classList.add('error');
        status.innerText = "Invalid input";
    } else {
        input.classList.remove('error');
        status.innerText = '';
    }
}

function cancelBtnListener() {
    hideModal();
}

function saveBtnListener() {
    var inputs = document.querySelectorAll('input');
    if (validateInputs(inputs)) {
        var obj = getUserInput(inputs);
        hideModal();
        saveCard(saveCardURL, obj)
            .then(data => {
                // document.getElementById("edit-page").style.display = "none";
            })
            .catch(error => console.error(error));
    }
}

function addListeners() {
    cancelBtn.addEventListener('click', cancelBtnListener);
    saveBtn.addEventListener('click', saveBtnListener);
    document.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', function() {
            handleInputChangeListener(input);
        });
    })
}

function saveCard(saveCardURL, obj) {
    console.log(saveCardURL, obj);
    return fetch(saveCardURL, obj,
        {
            method: 'POST',
        }).then(function(response) {
        return response.json();
    });
}


function getCardById(id) {
    console.log(getCardByIdURL.format(id));
    return fetch(getCardByIdURL.format(id),
        {
            method: 'GET',
        }).then(function(response) {
        return response.json();
    });
}

function showModal() {
    modal[0].style.display = "block";
}

function hideModal() {
    modal[0].style.display = "none";
}

function showAddOrEditPage(id) {
    if (id) {
        getCardById(id).then((data) => {
            console.log(data);
            render(data);
            addListeners();
            this.showModal();
        }).catch((e)=> {
            console.log(e);
        })
    } else {
        render({});
        addListeners();
        this.showModal();
    }
}