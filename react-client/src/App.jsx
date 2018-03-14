import React, { Component } from 'react';
import './App.css';
import Alert from './Alert';
import Banner from './Banner';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentId: this.props.currentId
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

        <button onClick={() => this.showElement('.alert')}>Show Alert</button>
        <Alert message='custom alert message' onClick={() => this.hideElement('.alert')} />


      </div>
    );
  }

  hideElement(queryString) {
    document.querySelector(queryString).classList.add('hidden');
  }

  showElement(queryString) {
    document.querySelector(queryString).classList.remove('hidden');;
  }

  goToView( queryString ) {
    const views=['.homepage','.study-page','favorite-page','my-cards-page','edit-page'];
    for (let i of views){
      this.hideElement(i);
    }
    this.showElement(queryString);
  }


}

export default App;
