import React from 'react';

const FavoriteCard = (props) => {

    return (
        <div className={'drink-favorite'} onClick={ () => {props.displayFavorite(props.drink.idDrink);} } id={props.drink.idDrink}>
            <div className={'drink-favorite-name'}>{props.drink.strDrink}</div>
            <span className={'drink-favorite-ingredient'}>({props.drink.strIngredient1})</span>
            <div title={'Remove From Favorites'} onClick={() => props.removeFavorite(props.drink.idDrink)} id={'btn-remove-fav'}>X</div>
        </div>
    )
};

export default FavoriteCard;