import React from 'react';
import Item from './Item';

const Tbody = ({wordList, onClick}) => {
    return (
        <tbody>
        {wordList.map(function (word, index) {
            return <Item key={index}
                         word={word}
                         onClick={onClick}
            />
        })}
        </tbody>
    )
};

export default Tbody;