// Integration Note:
// <StudyPage actualJSON={this.state.actualJSON} currentUserId={this.state.currentId} clickExitButton/>

import React from 'react';
import ClockTimer from './ClockTimer';
import Banner from './Banner';
const helper = require('./StudyPageHelperFunc.js');

class StudyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeOut: "",
      result: "",
      question: "",
      haveNoIdea: "Have No Idea",
      AButton: '',
      BButton: '',
      CButton: '',
      correctAnwser: "",
      infav: false,
      card: true,     // use for toogle
      answer: false,  // use for toogle
      button: false,  // use for toogle
      timer: 10,
      seconds: 10,
      favSrc: null,   // use for fav button's image
    }
    this.set = [];

    const emptyheart = require('./emptyheart.png');
    const fullheart = require('./fullheart.png');

    this.img_array = [emptyheart, fullheart];
    // // supplement for the choice， when the number of question is less than 10, in order to generate choices.
    this.choiceJSON = [{"cardId":355,"side0":"millennial","side1":"(a.)一千年的;千福年的","infav":false,"ownership":false},
                       {"cardId":356,"side0":"binder","side1":"縛者,用以綁縛之物,夾器","infav":false,"ownership":false},
                       {"cardId":357,"side0":"spil","side1":"矽品","infav":false,"ownership":false},
                       {"cardId":358,"side0":"tress","side1":"頭發一束,卷發,發辮","infav":false,"ownership":false},
                       {"cardId":359,"side0":"chivalrous","side1":"(a.)騎士的,勇敢的","infav":false,"ownership":false},
                       {"cardId":360,"side0":"sniffily","side1":"sniff.i.ly [ˋsnifәli; ˋsnifili] &lt;&lt;副詞&gt;&gt; 嗤之以鼻地; 輕蔑地","infav":false,"ownership":false},
                       {"cardId":361,"side0":"oration","side1":"演說,致辭,敘述法","infav":false,"ownership":false},
                       {"cardId":362,"side0":"unsteady","side1":"(a.)不安定的;易變的;不穩的","infav":false,"ownership":false},
                       {"cardId":363,"side0":"squatter","side1":"蹲著的人(vi.)涉水而過","infav":false,"ownership":false},
                       {"cardId":364,"side0":"proofread","side1":"(vt.)校正,校對","infav":false,"ownership":false},
                       {"cardId":365,"side0":"casserole","side1":"餐桌上用有蓋的焙盤,砂鍋菜","infav":false,"ownership":false},
                       {"cardId":366,"side0":"hyphen","side1":"連字號(vt.)以連字號連接","infav":false,"ownership":false},
                       {"cardId":367,"side0":"astigmatism","side1":"散光","infav":false,"ownership":false},
                       {"cardId":368,"side0":"resp","side1":"反映","infav":false,"ownership":false},
                       {"cardId":369,"side0":"induct","side1":"(vt.)引導,使入門,引入,使就職","infav":false,"ownership":false},
                       {"cardId":370,"side0":"bifocal","side1":"(a.)雙焦點的","infav":false,"ownership":false},
                       {"cardId":371,"side0":"gamesmanship","side1":"攪亂戰術","infav":false,"ownership":false}];
    this.indexOfImgArr = 1;
    this.actualLength = this.props.actualJSON.length;
    this.actualJSON = this.actualLength < 10 ? this.props.actualJSON.concat(this.choiceJSON) : this.props.actualJSON;
    this.i = 0;  // the index of pick up questions random

    this.haveNoIdeaButtonClicked = this.haveNoIdeaButtonClicked.bind(this);
    this.AButtonClicked = this.AButtonClicked.bind(this);
    this.BButtonClicked = this.BButtonClicked.bind(this);
    this.CButtonClicked = this.CButtonClicked.bind(this);
    this.showQuestion = this.showQuestion.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.nextButtonClicked = this.nextButtonClicked.bind(this);
    this.favButtonClicked = this.favButtonClicked.bind(this);
    this.addtoFavoriteJson = this.addtoFavoriteJson.bind(this);
    this.removeFromFavoriteJson = this.removeFromFavoriteJson.bind(this);
    this.onChildChanged = this.onChildChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.actualJSON !== null) {
      this.setState({
        card: true,     // use for toogle
        answer: false,  // use for toogle
        button: false,
      })
      this.set = [];
      this.indexOfImgArr = 1;
      this.actualLength = nextProps.actualJSON.length
      this.actualJSON = nextProps.actualJSON.length < 10 ? nextProps.actualJSON.concat(this.choiceJSON) : nextProps.actualJSON;
      this.nextButtonClicked();
    }
  }

  favButtonClicked() {
    this.indexOfImgArr++;
    if(this.indexOfImgArr === 2) {
        this.indexOfImgArr = 0;
    }
    this.setState({
      favSrc: this.img_array[this.indexOfImgArr],
    })
    if (this.indexOfImgArr === 1) {
       this.addtoFavoriteJson(this.props.currentUserId, this.i, this.actualJSON);
    } else {
       this.removeFromFavoriteJson(this.props.currentUserId, this.i, this.actualJSON);
    }
  }

  addtoFavoriteJson(currentUserId, i, actualJSON) {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/users/' + currentUserId +'/fav';
    xhr.open('POST', url, true);
    xhr.onreadystatechange = function(){
       console.log('onreadystatechange: '+ xhr.readyState);
    };
    xhr.setRequestHeader('currentId', currentUserId);
    xhr.send('{"id": '+ actualJSON[i].cardId +'}');
  }

  removeFromFavoriteJson(currentUserId, i, actualJSON) {
    let xhr = new XMLHttpRequest();
    let url = 'http://localhost:3000/users/' + currentUserId +'/fav/' + actualJSON[i].cardId;
    xhr.open('DELETE', url, true);
    xhr.onreadystatechange = function(){
        console.log('onreadystatechange: '+ xhr.readyState);
    };
    xhr.setRequestHeader('currentId', currentUserId);
    xhr.send();
  }

  haveNoIdeaButtonClicked() {
    this.setState({
       result: "Missed!",
       card: false,
       answer: true,
       button: false,
    })
  }

  AButtonClicked(){
    this.buttonClicked(this.state.AButton);
  }

  BButtonClicked(){
    this.buttonClicked(this.state.BButton);
  }

  CButtonClicked(){
    this.buttonClicked(this.state.CButton);
  }

  buttonClicked(answer) {
     this.setState({
        timeOut: "",
        result: (answer === this.state.correctAnwser) ? "Correct!" : "Wrong!",
        card: false,
        answer: true,
        button: false,
        seconds: 0,
        timer: 0,
     })
  }

  nextButtonClicked() {
    this.setState({
      card: true,
      answer: false,
      button: false,
      seconds: 10,
      timer: 10,
    })
    this.showQuestion(this.actualJSON);
  }

  // render之后执行
  componentDidMount() {
    this.nextButtonClicked();
  }

  showQuestion(actualJSON){
    if ((this.set.length < 10 && this.actualLength >= 10) || (this.set.length < this.actualLength && this.actualLength < 10)) {
      this.i = helper.getCardRandomId(this.actualLength, this.set);
      let answerset = helper.shuffleAnwser(this.i, this.actualJSON.length);
      let num =  parseInt(Math.random() * 2, 10);
      this.setState({
        question: (num === 1) ? this.actualJSON[this.i].side0 : this.actualJSON[this.i].side1,
        AButton: (num === 1) ? this.actualJSON[answerset[0]].side1 : this.actualJSON[answerset[0]].side0,
        BButton: (num === 1) ? this.actualJSON[answerset[1]].side1 : this.actualJSON[answerset[1]].side0,
        CButton: (num === 1) ? this.actualJSON[answerset[2]].side1 : this.actualJSON[answerset[2]].side0,
        correctAnwser: (num === 1) ? this.actualJSON[this.i].side1 : this.actualJSON[this.i].side0,
        infav: this.actualJSON[this.i].infav,
        favSrc: this.actualJSON[this.i].infav ? this.img_array[1] : this.img_array[0],
        timer: 10,
        seconds: 10,
      })
      this.indexOfImgArr = this.actualJSON[this.i].infav ? 1 : 0;
    } else {
      this.setState({
        correctAnwser: "Congratulation! You have completed the study.",
        card: false,
        answer: false,
        button: true,
      })
    }
  }

  onChildChanged(){
    this.setState({
      timeOut: "Time Out",
      result: "Missed!",
      card: false,
      answer: true,
      button: false,
      seconds: 0,
      timer: 0,   // timer == 0, stop the countDown
    })
  }

  render() {
    const { card } = this.state;
    const { answer } = this.state;
    const { button } = this.state;
    return (
      <div className='hidden study-page'>
        <Banner text={'Welcome to Vermillion Flashcard! User '} id={this.props.currentUserId}/>
        <div id='wholecard' style={{display: (card ? 'block' : 'none')}}>
          <div id="header">Choose The Answer in <span id="time"><ClockTimer timer={this.state.timer} seconds={this.state.seconds}  callbackParent={this.onChildChanged}/></span> Seconds!</div>
          <div id="cards">
    				<p id="question">{this.state.question}</p>
            <div id="card">
      					<input type = "button" id="haveNoIdea" value = {this.state.haveNoIdea} onClick={this.haveNoIdeaButtonClicked}/>
                <button id="AButton" onClick={this.AButtonClicked}> {this.state.AButton} </button>
      					<button id="BButton" onClick={this.BButtonClicked}>{this.state.BButton}</button>
                <button id="CButton" onClick={this.CButtonClicked}>{this.state.CButton}</button>
      					<button id="exit" value = "Exit" onClick={this.props.clickExitButton}>Exit</button>
      			</div>
          </div>
        </div>
        <div id="anwser" style={{display: (answer ? 'block' : 'none')}}>
          <div id="TimeOut">{this.state.timeOut}</div>
          <div id="result">{this.state.result}</div>
          <div id="cards">
            <p id="question">{this.state.question}</p>
      			<p id="correctAnwser">{this.state.correctAnwser}</p>
      			<button id="addtoFavorite" onClick={this.favButtonClicked}>
      				<img id="myImg" alt="fav" src={this.state.favSrc} width="20px" height="20px" border="0"/>
      			</button>
      			<input type="button" id="answerPageButton" value="Next" onClick={this.nextButtonClicked}/>
          </div>
    		</div>
        <div id="ending" style= {{display: (button ? 'block' : 'none')}}>
          <p id="correctAnwser">{this.state.correctAnwser}</p>
          <input type="button" id="endingButton" value="Exit" onClick={this.props.clickExitButton}/>
        </div>
      </div>
    );
  }
}

export default StudyPage;
