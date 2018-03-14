

function requestUserId() {
    return fetch('/users', { method: 'POST',
    }).then( response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('error-response-not-okay');
    }).then(json => { 
        return json.currentId;
    }).catch( ( error ) => {
        if(error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

function getUserList() {
    return fetch('http://localhost:2666/users')
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject('error-response-not-okay');
    }).then(fromJson => { 
        return fromJson;
    }).catch( ( error ) => {
        if(error.toString().startsWith('error-')) {
            return Promise.reject(error);
        }
        return Promise.reject('error-response-json-bad');
    });
}

module.exports={
    requestUserId : requestUserId,
    getUserList : getUserList
}