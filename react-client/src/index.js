import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const api = require('./api');
let currentId = null;

boot();

async function boot(){
    while(!currentId){
        currentId = await api.requestUserId();
    }
    console.log(currentId);
    ReactDOM.render(<App currentId={currentId}/>, document.getElementById('root'));
    registerServiceWorker();
}
