import React, { Component } from 'react';
import './App.css';
import Alert from './Alert';
import Banner from './Banner';
import StudyPage from './StudyPage';
import FavPage from "./FavPage";
import MyCardsPage from "./MyCards";
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

  componentDidMount(){
    this.initializeOption();
  }

  render() { 

    return (
      <div className="App">
        <div className="homepage">
          <Banner text={'Welcome to Vermillion Flashcard! User '} id={this.state.currentId}/>
          <div className="slogan">
            <p id="slogan-study">STUDY: <span id="slogan-easier">Easier</span></p>
            <p id="slogan-faster">Faster</p>
            <p id="slogan-harder">Harder</p>
          </div>
          <div className="homepage-buttons">

            <button className='test-dummy' onClick={() => this.goToView('.study-page')}>STUDY</button>
            <button className='test-dummy' onClick={() => this.goToView('.favorite-page')}>FAVORITE</button>
            <button className='test-dummy' onClick={() => this.goToView('.my-cards-page')}>CUSTOM</button>            
            <select className='test-dummy' id='homepage-dropbtn'></select>
            {/*
            <Button to presotred/>
            <Button to fav/>
            <Button to custom/>
            <Select to shared/>
            <button onClick={() => this.setStudyList(Math.random().toString())}>setStudyList</button>
            */}
          </div>
          
        </div>
        <div>
          {/*
        <Listview of presotred/>
        <Listview of fav/>
        <Listview of custom/>
        <Listview of shared/>
        */}

        <StudyPage actualJSON={this.state['.study-page']} currentUserId={this.state.currentId} 
          clickExitButton={() => this.backToHome('.study-page')}/>

        <FavPage wordList={this.state['.favorite-page']} currentUserId={this.state.currentId} 
          clickBackButton={() => this.backToHome('.favorite-page')} setStudyList={(list)=>this.setStudyList(list)}/>

        <MyCardsPage wordList={this.state['.my-cards-page']} currentUserId={this.state.currentId} 
          clickBackButton={() => this.backToHome('.my-cards-page')} setStudyList={(list)=>this.setStudyList(list)}/>

        </div>
        
        <Alert message='custom alert message' onClick={() => this.hideElement('.alert')} />

      </div>
    );

  }

  setStudyList(list){
    this.setState({'.study-page': list}, ()=>{console.log(this.state);});    
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
      //console.log(this.state);
      
      this.showElement(queryString);
    })
    .catch((error) => {
    if (error.toString().startsWith('error-')) {
        return Promise.reject(error);
    }
    return Promise.reject('error-response-json-bad');
    });    

  }

  async initializeOption(){
    const drop = document.getElementById('homepage-dropbtn');
    drop.options.length = 0;
    const placeholder = document.createElement('option');
    placeholder.text = "SHARED CARDS";
    placeholder.selected = "selected";
    drop.add(placeholder); 
    let list = await connection.getUserList();
    for (let id of list.activeUsers){
        if (id === this.state.currentId) continue;
        let option = document.createElement('option');
        option.text = +id;        
        drop.add(option);
    }
    
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
