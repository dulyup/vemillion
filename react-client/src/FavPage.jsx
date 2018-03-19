import React, { Component } from 'react';
import './listPage.css';
import ListPage from "./ListPage";

class FavPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            wordList: props.wordList
        };

        this.currentId = this.props.currentUserId;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ wordList: nextProps.wordList });
    }

    render() {
        return (
            <div className="favorite-page hidden">

                <ListPage title={'Favorite'} currentId={this.currentId} wordList={this.state.wordList}
                    clickBackButton={this.props.clickBackButton}
                    setStudyList={this.props.setStudyList} />

            </div>
        );
    }
}

export default FavPage;