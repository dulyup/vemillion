import React, { Component } from 'react';
import './listPage.css';
import Table from "./Table";
import Banner from "./Banner";
import StudyPage from './StudyPage';
import { EditPage, updateCard, saveCtmCard } from './EditPage';

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
        if (this.state.title === "Shared Cards") {
            this.hideElement('#list-page-add');
            this.hideElement('#list-page-edit');
        }
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
                        onClick={() => this.setState({
                            showEditPage: true,
                        })} disabled={this.handleEditButton() ? false : "disabled"}>Edit</button>
                    <button id="list-page-study" onClick={() => this.props.setStudyList(this.state.wordList)}
                        disabled={this.handleStudyButton() ? false : "disabled"}>Study</button>
                </div>

                {/*<StudyPage actualJSON={this.state.wordList} currentUserId={this.currentId} clickExitButton={() => this.props.backToHome('.study-page')}/>*/}
                {/*please add "hidden" in the className of EditPage*/}
                <EditPage
                    selectedId={this.state.selected}
                    currentUserId={this.currentId}
                    hidden={!this.state.showEditPage}
                    onCancelClick={() => {
                        // Add code here when click cancel
                    }}
                    onAccessDenied={() => {
                        // Add code here when user ownership is false
                    }}
                    onSaveClick={(data) => {
                        if (!this.state.selected) {
                            saveCtmCard(data, this.currentId).then(() => {
                                // Save completed.
                            });
                        } else {
                            updateCard(this.state.selected, data, this.currentId).then(() => {
                                // Update completed
                            })
                        }
                    }} />
            </div >
        );
    }
}

export default ListPage;