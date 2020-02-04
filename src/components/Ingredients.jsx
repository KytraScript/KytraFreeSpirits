import React from 'react';

const Ingredients = (props) => {

    return (
        <div className={'ingredient-row'}>
        <div className={'ingredient'}>{props.name}</div>
        <div className={'measurement'}>{props.measure}</div>
        </div>
    )
};

export default Ingredients;