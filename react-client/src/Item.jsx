import React , { Component } from 'react';

// const Item = ({word, onClick}) => {

    // return (
    //     <tr className={"row" ${this.state.isNavOpen ? 'selected' :''`}}
    //
    //         onClick={()=>{onClick(word["cardId"]); }}>
    //         <td>{word["side0"]}</td>
    //         <td>{word["side1"]}</td>
    //     </tr>
    // )
// };


class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: false,
            word: this.props.word,
        };
        console.log(this.state.activeRow);
    }
    render() {
        return (
            <tr className={`row ${this.state.activeRow ? 'selected' :'row'}`}
                onClick={()=>{this.props.onClick(this.state.word["cardId"]);
                              this.setState({activeRow: true})}}>
                <td>{this.state.word["side0"]}</td>
                <td>{this.state.word["side1"]}</td>
            </tr>
        )
    }
}
export default Item;