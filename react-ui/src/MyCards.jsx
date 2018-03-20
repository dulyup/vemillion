import React, { Component } from 'react';
import './listPage.css';
import ListPage from "./ListPage";
const connection = require('./connection');

class MyCardsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wordList: this.props.wordList
        };
        this.currentId = this.props.currentUserId;
        this.updateWordList = this.updateWordList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList });
    }

    updateWordList() {
        const url = '/users/'+this.currentId+'/custom';
        connection.fetchJsonFrom(url,'get', this.currentId)
            .then(json => {
                this.setState({wordList : json});
            })
            .catch((error) => {
                if (error.toString().startsWith('error-')) {
                    return Promise.reject(error);
                }
                return Promise.reject('error-response-json-bad');
            });
    }

    render() {
        return (
            <div className="my-cards-page hidden">

                <ListPage title={'My Cards'} currentId={this.currentId} wordList={this.state.wordList}
                          selectedWordId={this.props.selectedWordId}
                          clickBackButton={this.props.clickBackButton}
                          setStudyList={this.props.setStudyList}
                          updateWordList={this.updateWordList}/>

            </div>
        );
    }
}

export default MyCardsPage;