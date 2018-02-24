// export const callGetJsonService = (url) => {
const callGetJsonService = (url) => {
    return fetch(url)
        .then( response => {
            if(response.ok) {
                return response.json();
            }
            return Promise.reject('error-response-not-okay');
        }).then(fromJson => console.log(fromJson))
        .catch( ( error ) => {
            if(error.toString().startsWith('error-')) {
                return Promise.reject(error);
            }
            return Promise.reject('error-response-json-bad');
        });
};


