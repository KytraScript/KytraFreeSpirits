import React from 'react';

const DrinkCard = (props) => {

    return (
        <div className={'drink-card'} id={props.drink.idDrink} onClick={props.query}>
            <div className={'drink-info'}>
                <div className={'drink-thumb'}><img alt={props.drink.strDrink} src={props.drink.strDrinkThumb}/></div>
                <div className={'drink-name'}>{props.drink.strDrink}</div>
            </div>
        </div>
    )
};

export default DrinkCard;