( () => {
    // var dummy = {english: "start", chinese: "开始"};
    var item = document.getElementById('item');
    var cencelBtn = document.getElementById('cancelBtn');
    var saveBtn = document.getElementById('saveBtn');
    var item = document.getElementById('item');
    var title = document.getElementById('title');
 
    saveBtn.disabled = false;
    cancelBtn.disabled = false;

    function render(data) {
        document.querySelector('.input').innerHTML = generateInputs(data);
    }

    function generateInputs(data) {
        console.log(data);
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
        var status = document.getElementById(input.getAttribute("key")+ "_status");
        if (!input.value) {
            input.classList.add('error');
            status.innerText = "Invalid input";
        } else {
            input.classList.remove('error');
            status.innerText = '';
        }
    }

    function cancelBtnListener() {
        document.getElementsByClassName("edit-page")[0].style.display = "none";
    }

    function saveBtnListener() {
        var inputs = document.querySelectorAll('input');
        if (validateInputs(inputs)) {
            var obj = getUserInput(inputs);
            document.getElementsByClassName("edit-page")[0].style.display = "none";
            postData('http://', obj)
                .then(data => {
                    // document.getElementById("edit-page").style.display = "none";
                })
                .catch(error => console.error(error));
        }
    }

    function postData(url, data) {
        return fetch(url, {
            body: JSON.stringify(data),
            cache: 'no-cache',
            headers: {
            'content-type': 'application/json'
            },
            method: 'POST',
            redirect: 'follow',
            referrer: 'no-referrer',
            })
        .then(response => response.json());
    }

    function addAddListener() {
        cancelBtn.addEventListener('click', cancelBtnListener);
        saveBtn.addEventListener('click', saveBtnListener);
        document.querySelectorAll('input').forEach((input) => {
            input.addEventListener('input', function() {
                handleInputChangeListener(input);
            });
        })
        
    }
 
    function showAddOrEdit(id) {
        
        fetch(url + id, 
            { 
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
            }).then((data) => {
                render(data);
                addAddListener();
                document.getElementsByClassName("edit-page")[0].style.display = "block";  
            })
    }

    var testBtn = document.getElementById("TestBtn");
    testBtn.onclick = function(event) {
        showAddOrEdit(id);
    }
    
})();
