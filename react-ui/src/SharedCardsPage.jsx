import React, { Component } from 'react';
import './listPage.css';
import ListPage from "./ListPage";

class SharedCardsPage extends Component {

    constructor (props) {
        super(props);
        this.state = {
            wordList: this.props.wordList
        };
        this.currentId = this.props.currentId;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({wordList : nextProps.wordList });
    }

    render() {
        return (
            <div className="shared-cards-page hidden">

                <ListPage title={'Shared Cards'} currentId={this.currentId} wordList={this.state.wordList}
                          selectedWordId={this.props.selectedWordId}
                          clickBackButton={this.props.clickBackButton}
                          setStudyList={this.props.setStudyList}/>

            </div>
        );
    }
}

export default SharedCardsPage;