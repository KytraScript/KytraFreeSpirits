import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const PopularDrink = (props) => {

    return (
        <div className={props.loading ? 'hidden' : 'drink-card'} id={props.drink.idDrink}
             onClick={
                 (event) => {
                     props.query(event);
                    window.location.hash = '/search';
        }}>
            <div className={'drink-info'}>
                <div className={'drink-thumb'}><img alt={props.drink.strDrink} src={props.drink.strDrinkThumb}/></div>
                <div className={'drink-name'}>{props.drink.strDrink}</div>
            </div>
        </div>
    )
};

export default PopularDrink;
