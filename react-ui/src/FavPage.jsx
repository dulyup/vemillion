import React, { Component } from 'react';
import './listPage.css';
import ListPage from "./ListPage";
const connection = require('./connection');

class FavPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            wordList: props.wordList
        };

        this.currentId = this.props.currentUserId;
        this.updateWordList = this.updateWordList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList });
    }

    updateWordList() {
        const url = '/users/'+this.currentId+'/fav';
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
            <div className="favorite-page hidden">

                <ListPage title={'Favorite'} currentId={this.currentId} wordList={this.state.wordList}
                          clickBackButton={this.props.clickBackButton}
                          setStudyList={this.props.setStudyList}
                          updateWordList={this.updateWordList}/>

            </div>
        );
    }
}

export default FavPage;