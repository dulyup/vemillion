import React, { Component } from 'react';
import './listPage.css';
import Table from "./Table";
import Banner from "./Banner";
import StudyPage from './StudyPage';
import { EditPage, updateCard, saveCtmCard } from './EditPage';
import Alert from "./Alert";
const connection = require('./connection');

class ListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            wordList: this.props.wordList,
            selected: '',
            isValidToEdit: false,
            isValidToStudy: false,
            showEditPage: false
        };

        this.currentId = this.props.currentId;
        this.handleSelected = this.handleSelected.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList }, () => console.log(this.state.wordList));
    }

    componentDidMount() {
        this.initial();
    }

    initial() {
        if (this.state.title === 'Favorite') {
            this.hideElement('#list-page-add');
        }
        // if (this.state.title === "Shared Cards") {
        //     this.hideElement('#list-page-add');
        //     this.hideElement('#list-page-edit');
        // }
    }

    handleSelected(id) {
        this.setState({ selected: id }, () => console.log(id));
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
            <div className="list-page">
                <Banner text={this.state.title} />
                <Table className="list"
                    onClick={this.handleSelected}
                    wordList={this.state.wordList}
                />

                <div className="list-page-buttons">
                    <button id="list-page-back" onClick={this.props.clickBackButton}>Back</button>
                    <button id="list-page-add"
                        onClick={() => this.setState({
                            showEditPage: true,
                        })} > Add</button>
                    <button id="list-page-edit"
                        onClick={() => {
                            console.log("editClick");
                            this.setState({
                                showEditPage: true,
                            })
                        }} disabled={this.handleEditButton() ? false : "disabled"}>Edit</button>
                    <button id="list-page-study"
                        onClick={() => this.props.setStudyList(this.state.wordList)}
                        disabled={this.handleStudyButton() ? false : "disabled"}>Study</button>
                </div>

                {/*<StudyPage actualJSON={this.state.wordList} currentUserId={this.currentId} clickExitButton={() => this.props.backToHome('.study-page')}/>*/}
                {/*please add "hidden" in the className of EditPage*/}
                <EditPage
                    selectedId={this.state.selected}
                    currentUserId={this.currentId}
                    hidden={!this.state.showEditPage}
                    onCancelClick={() => {
                        this.setState({
                            showEditPage: false,
                        })
                    }}
                    onAccessDenied={() => {
                        // Add code here when user ownership is false
                        this.setState({
                            showEditPage: false,
                        })
                    }}
                    onSaveClick={(data) => {
                        this.setState({
                            showEditPage: false,
                        })

                        if (!this.state.selected) {
                            saveCtmCard(data, this.currentId).then(() => {
                                // Save completed.
                                this.props.updateWordList();
                            });
                        } else {
                            updateCard(this.state.selected, data, this.currentId).then(() => {
                                // Update completed
                                this.props.updateWordList();
                            })
                        }
                    }} />
            </div >
        );
    }
}

export default ListPage;