import React, { Component } from 'react';
import './listPage.css';
import ListPage from "./ListPage";

class MyCardsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            wordList: this.props.wordList
        };
        this.currentId = this.props.currentUserId;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList });
    }

    render() {
        return (
            <div className="my-cards-page hidden">

                <ListPage title={'My Cards'} currentId={this.currentId} wordList={this.state.wordList}
                          clickBackButton={this.props.clickBackButton}
                          setStudyList={this.props.setStudyList}/>

            </div>
        );
    }
}

export default MyCardsPage;