import React from 'react';
import Tbody from './Tbody';

const Table = (props) => {
    if (!props.wordList) {
        return (<p>No cards</p>)
    } else {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Word</th>
                        <th>Explanation</th>
                    </tr>
                    </thead>
                    <Tbody {...props}
                    />
                </table>
            </div>
        )
    }
};
export default Table;