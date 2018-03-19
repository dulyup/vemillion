import React, { Component } from 'react';
import './listPage.css';
import Table from "./Table";
import Banner from "./Banner";
import StudyPage from './StudyPage';

class ListPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: this.props.title,
            wordList: this.props.wordList,
            selected:'',
            isValidToEdit: false,
            isValidToStudy: false,

        };
        this.currentId = this.props.currentId;
        this.handleSelected = this.handleSelected.bind(this);        
    }

    componentWillReceiveProps(nextProps) {
        this.setState({wordList : nextProps.wordList });
    }

    componentDidMount(){
        this.initial();        
    }

    initial() {
        if (this.state.title === 'Favorite') {
            this.hideElement('#list-page-add');
        }
        if (this.state.title === "Shared Cards") {
            this.hideElement('#list-page-add');
            this.hideElement('#list-page-edit');
        }
    }

    handleSelected(id) {
        this.setState({selected: id}, ()=>console.log(id));
    }

    handleEditButton() {
        return this.state.wordList && this.state.selected !== '';
    }

    handleStudyButton() {
        return this.state.wordList;
    }

    goToView(queryString) {
        this.hideElement('.list-page');
        this.showElement(queryString);
    }

    hideElement(queryString) {
        document.querySelector(queryString).classList.add('hidden');
    }

    showElement(queryString) {
        document.querySelector(queryString).classList.remove('hidden');
    }

    render() {
        return (
            <div className="list-page hidden">

                <Banner text={this.state.title}/>

                <Table className="list"
                       onClick={this.handleSelected}
                       wordList={this.state.wordList}
                />

                <div className="list-page-buttons">
                    <button id="list-page-back" onClick={this.props.clickBackButton}>Back</button>
                    <button id="list-page-add" onClick={this.goToView.bind(this, '.edit-page')}>Add</button>
                    <button id="list-page-edit" onClick={this.goToView.bind(this, '.edit-page')} disabled={this.handleEditButton()?false:"disabled"}>Edit</button>
                    <button id="list-page-study" onClick={this.props.setStudyList(this.state.wordList)} disabled={this.handleStudyButton()?false:"disabled"}>Study</button>
                </div>

                {/*<StudyPage actualJSON={this.state.wordList} currentUserId={this.currentId} clickExitButton={() => this.props.backToHome('.study-page')}/>*/}
                {/*please add "hidden" in the className of EditPage*/}
                {/*<EditPage selected={this.state.selected}/>*/}

            </div>
        );
    }
}

export default ListPage;