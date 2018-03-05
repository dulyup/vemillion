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

function EditPage() {

}

EditPage.prototype = (function() {
    const cencelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const title = document.getElementById('title');
    const modal = document.getElementsByClassName("edit-page");
    const cardURL = "http://localhost:2666/cards/{0}";
    const saveFavCardURL = "http://localhost:2666/fav";
    const saveCtmCardURL = "http://localhost:2666/custom";
    saveBtn.disabled = false;
    cancelBtn.disabled = false;
    function render(data) {
        document.querySelector('.edit-inputs').innerHTML = generateInputs(data);
    }

    function generateInputs(data) {
        title.innerText = "Edit";
        if (Object.keys(data).length == 0) {
            title.innerText = "Add New";
            data = { side0: "", side1: "" };
        }

        return Object.keys(data).map((key, index) => {
            if (key == 'side0' || key == "side1") {
                return `<input class="input" key="${key}" value="${data[key]}"/><div id="${key}_status"> </div>`;
            }

            return `<input hidden class="input" key="${key}" value="${data[key]}"/><div id="${key}_status"> </div>`;
        }).join('\n');
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
            if (!inputs[i].hidden && !inputs[i].value) {
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

    function cancelBtnListener(onCancelClick) {
        hideModal();
        onCancelClick();
    }

    function saveBtnListener(onSaveClick) {
        var inputs = document.querySelectorAll(".edit-inputs input");
        if (validateInputs(inputs)) {
            var obj = getUserInput(inputs);
            hideModal();
            onSaveClick(obj);
        }
    }

    function showModal() {
        modal[0].style.display = "block";
    }

    function hideModal() {
        modal[0].style.display = "none";
    }

    function addListeners(onSaveClick, onCancelClick) {
        cancelBtn.onclick = () => {
            cancelBtnListener(onCancelClick);
        };

        saveBtn.onclick = () => {
            saveBtnListener(onSaveClick);
        };

        document.querySelectorAll('.edit-inputs input').forEach((input) => {
            input.oninput = () => {
                handleInputChangeListener(input);
            };
        })
    }

    function saveCard(saveCardURL, obj) {
        return fetch(saveCardURL,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                if (response.status != 200) {
                    throw "unexpected error";
                }
            });
    }

    function getCardById(id) {
        return fetch(cardURL.format(id),
            {
                method: 'GET',
            }).then((response) => {
                return response.json();
            });
    }

    return {
        constructor: EditPage,
        saveFavCard(obj) {
            return saveCard(saveFavCardURL, obj);
        },

        saveCtmCard(obj) {
            return saveCard(saveCtmCardURL, obj);
        },

        updateCard(id, obj) {
            return fetch(cardURL.format(id),
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }).then((response) => {
                    if (response.status != 200) {
                        throw "unexpected error";
                    }
                });
        },

        showAddOrEditPage(id, onSaveClick, onCancelClick) {
            if (id) {
                getCardById(id).then((data) => {
                    render(data);
                    addListeners(onSaveClick, onCancelClick);
                    showModal();
                }).catch((e) => {
                    console.log(e);
                    throw e;
                });
            } else {
                render({});
                addListeners(onSaveClick, onCancelClick);
                showModal();
            };
        }
    };
})();



