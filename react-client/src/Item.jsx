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
            activeRow: true,
            word: this.props.word,
        };
    }
    render() {
        return (
            <tr className={`row ${this.state.activeRow ? 'selected' :'row'}`}
                onClick={()=>{this.props.onClick(this.state.word["cardId"]);
                              this.setState({activeRow: !this.state.activeRow})}}>
                <td>{this.state.word["side0"]}</td>
                <td>{this.state.word["side1"]}</td>
            </tr>
        )
    }
}
export default Item;