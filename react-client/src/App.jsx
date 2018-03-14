import React, { Component } from 'react';
import './App.css';
import Alert from './Alert';
import Banner from './Banner';
const connection = require('./connection');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.currentId,
      '.study-page':'',
      '.favorite-page':'',
      '.my-cards-page' : ''
    };
  }

  render() {

    return (
      <div className="App">
        <div className="homepage">
          <Banner id={this.state.currentId}/>
          <div className="slogan">
            <p id="slogan-study">STUDY: </p>
            <p id="slogan-easier">Easier</p>
            <p id="slogan-faster">Faster</p>
            <p id="slogan-harder">Harder</p>
          </div>
          <div className="homepage-buttons">

            <button className='test-dummy' onClick={() => this.goToView('.study-page')}>STUDY</button>
            <button className='test-dummy' onClick={() => this.goToView('.favorite-page')}>FAV</button>
            <button className='test-dummy' onClick={() => this.goToView('.my-cards-page')}>CUSTOM</button>
            <button onClick={() => this.showElement('.alert')}>Show Alert</button>

            {/*
            <Button to presotred/>
            <Button to fav/>
            <Button to custom/>
            <Select to shared/>
            */}
          </div>
        </div>

        {/*
        <Listview of presotred/>
        <Listview of fav/>
        <Listview of custom/>
        <Listview of shared/>
        */}
        <p className='hidden test-dummy study-page' onClick={() => this.backToHome('.study-page')}> study-page </p>
        <p className='hidden test-dummy favorite-page' onClick={() => this.backToHome('.favorite-page')}>favorite-page </p>
        <p className='hidden test-dummy my-cards-page' onClick={() => this.backToHome('.my-cards-page')}> my-cards-page </p>        
        
        <Alert message='custom alert message' onClick={() => this.hideElement('.alert')} />


      </div>
    );

  }

  goToView(queryString) {

    this.hideElement('.homepage');

    //show loading

    const views={'.study-page':'/prestored','.favorite-page':'/users/'+this.state.currentId+'/fav'
    ,'.my-cards-page':'/users/'+this.state.currentId+'/custom'};

    for (let i in views){
      this.hideElement(i);
    }

    connection.fetchJsonFrom(views[queryString],'get', this.state.currentId)
    .then(json => {
      this.setState({[queryString] : json});
      //hide loading
      console.log(this.state);
      this.showElement(queryString);
    })
    .catch((error) => {
    if (error.toString().startsWith('error-')) {
        return Promise.reject(error);
    }
    return Promise.reject('error-response-json-bad');
    });    

  }


  hideElement(queryString) {
    document.querySelector(queryString).classList.add('hidden');
  }

  showElement(queryString) {
    document.querySelector(queryString).classList.remove('hidden');;
  }

  backToHome(curView){
    this.hideElement(curView);
    this.showElement('.homepage');
  }

}

export default App;
