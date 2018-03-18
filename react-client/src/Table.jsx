import React from 'react';
import Tbody from './Tbody';

const Table = ({wordList, onClick}) => {
    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Word</th>
                    <th>Explanation</th>
                </tr>
                </thead>
                <Tbody wordList={wordList}
                       onClick={onClick}
                />
            </table>
        </div>
    )
};
export default Table;