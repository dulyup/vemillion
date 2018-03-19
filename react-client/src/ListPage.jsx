import React, { Component } from 'react';
import './listPage.css';
import Table from "./Table";
import Banner from "./Banner";
import Alert from "./Alert";
import { EditPage, updateCard, saveCtmCard } from './EditPage';
import StudyPage from "./StudyPage";

class ListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            wordList: this.props.wordList,
            selected: '',
            isValidToEdit: false,
            isValidToStudy: false,
            showAddPage: false,
            showEditPage: false
        };

        this.currentId = this.props.currentId;
        this.handleSelected = this.handleSelected.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList });
    }

    componentDidMount() {
        console.log(this.state.title);

        this.initial();
    }

    initial() {
        let title = `.list-page-${this.state.title.split(" ").join("")} `;
        if (this.state.title === 'Favorite') {
            this.hideElement(title + '.list-page-add');
        }
        if (this.state.title === "Shared Cards") {
            this.hideElement(title + '.list-page-add');
            this.hideElement(title + '.list-page-edit');
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

    // goToView(queryString) {
    //     this.hideElement('.list-page');
    //     this.showElement(queryString);
    // }

    hideElement(queryString) {
        console.log(queryString);
        document.querySelector(queryString).classList.add('hidden');
    }

    showElement(queryString) {
        document.querySelector(queryString).classList.remove('hidden');
    }

    render() {
        return (

            <div className={"list-page-"+this.state.title.split(" ").join("")}>
                <Banner text={this.state.title} />
                <div className="whole-list">
                    <Table className="list"
                        onClick={this.handleSelected}
                        wordList={this.state.wordList}
                        selectedId={this.state.selected}
                    />
                </div>

                <div className="list-page-buttons">
                    <button className="list-page-back" onClick={this.props.clickBackButton}>Back</button>
                    <button className="list-page-add"
                        onClick={() => this.setState({
                            showAddPage: true,
                        })} > Add</button>
                    <button className="list-page-edit"
                        onClick={() => {
                            this.setState({
                                showEditPage: true,
                            })
                        }} disabled={this.handleEditButton() ? false : "disabled"}>Edit</button>
                    <button className="list-page-study"
                        onClick={() => this.props.setStudyList(this.state.wordList)}
                        disabled={this.handleStudyButton() ? false : "disabled"}>Study</button>
                </div>

                {/*<StudyPage actualJSON={this.state.wordList} currentUserId={this.currentId} clickExitButton={() => this.props.backToHome('.study-page')}/>*/}
                {/*please add "hidden" in the className of EditPage*/}
                <EditPage
                    selectedId={null}
                    currentUserId={this.currentId}
                    hidden={!this.state.showAddPage}
                    onCancelClick={() => {
                        this.setState({
                            showAddPage: false,
                        })
                    }}
                    onAccessDenied={() => {
                        // Add code here when user ownership is false
                        this.setState({
                            showAddPage: false,
                        });
                        setTimeout(() => {
                            this.hideElement('.alert');
                        },3000);
                        this.showElement('.alert');
                    }}
                    onSaveClick={(data) => {
                        this.setState({
                            showAddPage: false,
                        });

                        saveCtmCard(data, this.currentId).then(() => {
                            // Save completed.
                            this.props.updateWordList();
                        });
                    }
                    } />
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
                        });
                        setTimeout(() => {
                            this.hideElement('.alert');
                        },3000);
                        this.showElement('.alert');
                    }}
                    onSaveClick={(data) => {
                        this.setState({
                            showEditPage: false,
                        });

                        updateCard(this.state.selected, data, this.currentId).then(() => {
                            // Update completed
                            this.props.updateWordList();
                        })
                    }} />
                <Alert message="Sorry, you can not edit preset or other users' cards " onClick={() => this.hideElement('.alert')} />
            </div >
        );
    }
}

export default ListPage;