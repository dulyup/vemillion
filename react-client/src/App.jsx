import React, { Component } from 'react';
import './App.css';
import Alert from './Alert';


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
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={()=>this.showElement('.alert')}>ALERT</button>
        <Alert message='custom alert message' onClick={()=>this.hideElement('.alert')}/>
      </div>
    );
  }

  hideElement(queryString){
    document.querySelector( queryString ).classList.add('hidden');
  }

  showElement(queryString){
    document.querySelector( queryString ).classList.remove('hidden');;
  }


}

export default App;
