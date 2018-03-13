if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

function EditPage() {
   // this.currentUserId = currentUserId;
}

EditPage.prototype = (function() {
    const cencelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const title = document.getElementById('title');
    const modal = document.getElementsByClassName("edit-page");
    const cardURL = "http://localhost:2666/cards/{0}";
    saveBtn.disabled = false;
    cencelBtn.disabled = false;
    function render(data) {
        document.querySelector('.edit-inputs').innerHTML = generateInputs(data);
    }

    function generateInputs(data) {
        title.innerText = "Edit";
        if (Object.keys(data).length === 0) {
            title.innerText = "Add New";
            data = { side0: "", side1: "" };
        }

        return Object.keys(data).map((key, index) => {
            if (key === 'side0' || key === "side1") {
                return `<input class="input" key="${key}" value="${data[key]}"/><div id="${key}_status"> </div>`;
            }

            return `<input hidden class="input" key="${key}" value="${data[key]}"/><div id="${key}_status"> </div>`;
        }).join('\n');
    }

    function getUserInput(inputs) {
        let obj = {};
        inputs.forEach((input) => {
            obj[input.getAttribute('key')] = input.value;
        });

        return obj;
    }

    function validateInputs(inputs) {
        for (let i = 0; i < inputs.length; i++)
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
        let inputs = document.querySelectorAll(".edit-inputs input");
        if (validateInputs(inputs)) {
            let obj = getUserInput(inputs);
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

    function saveCard(saveCardURL, obj, currentUserId) {
        return fetch(saveCardURL,
            {
                method: 'POST',
                headers: {'currentId': currentUserId},
                body: JSON.stringify(obj),
            }).then((response) => {
                if (response.status !== 200) {
                    throw "unexpected error";
                }
            });
    }

    function getCardById(id, currentUserId) {
        return fetch(cardURL.format(id),
            {
                method: 'GET',
                headers: {'currentId': currentUserId},
            }).then((response) => {
                return response.json();
            });
    }

    return {
        constructor: EditPage,
        // saveFavCard(obj) {
        //     let saveCardURL = "http://localhost:2666/users/" + currentUserId + "/fav";
        //     return saveCard(saveFavCardURL, obj, EditPage.currentUserId);
        // },

        saveCtmCard(obj, currentUserId) {
            let saveCtmCardURL = "http://localhost:2666/users/" + currentUserId + "/custom";
            return saveCard(saveCtmCardURL, obj, currentUserId);
        },

        updateCard(id, obj, currentUserId) {
            return fetch(cardURL.format(id),
                {
                    method: 'PUT',
                    headers: {'currentId': currentUserId},
                    body: JSON.stringify(obj)
                }).then((response) => {
                    if (response.status !== 200) {
                        throw "unexpected error";
                    }
                });
        },

        showAddOrEditPage(id, currentUserId, curRow, onSaveClick, onCancelClick) {
            if (id !== null) {
                getCardById(id, currentUserId).then((data) => {
                    if (!data["ownership"]) { //have no permission to edit the card
                        let alert = document.querySelector('.alert');
                        // Hide the alert after 3000ms
                        setTimeout(()=>{ alert.style.display = "none";}, 3000);
                        alert.style.display = "";
                        //reset the style of the current row and button
                        if (curRow !== null) {
                            curRow.style.background='';
                            curRow.style.color='black';
                            curRow = null;
                            document.getElementById('favorite-page-edit').disabled = true;
                        }
                    } else {
                        render(data);
                        addListeners(onSaveClick, onCancelClick);
                        showModal();
                    }
                }).catch((e) => {
                    console.log(e);
                    throw e;
                });
            } else {
                render({});
                addListeners(onSaveClick, onCancelClick);
                showModal();
            }
        }
    };
})();
