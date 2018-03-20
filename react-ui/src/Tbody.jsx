import React from 'react';
import Item from './Item';

const Tbody = ({wordList, onClick, selectedWordId}) => {
    return (
        <tbody>
        {wordList.map(function (word, index) {
            return <Item key={index}
                         word={word}
                         onClick={onClick}
                         className={selectedWordId === word['cardId'] ? "selected" : ""}
            />
        })}
        </tbody>
    )
};


// class Tbody extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             rIdx: -1
//         };
//     }
//
//     render() {
//         return (
//             <tbody>
//                 {this.props.wordList.map((word, index) => {
//                     return <Item key={index}
//                                  word={word}
//                                  onClick={this.props.onClick}
//                                  className={this.state.rIdx === index ? "selected" : ""}
//                     />
//                 })}
//             </tbody>
//         )
//     }
// }

export default Tbody;