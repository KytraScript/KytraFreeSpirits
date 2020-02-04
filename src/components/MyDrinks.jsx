import React from 'react';
import FavoriteCard from './FavoriteCard.jsx';
import {BrowserRouter as Router, Route, Switch, useParams, Link} from 'react-router-dom';

const MyDrinks = (props) => {
        return (
            <div>
                <div className={'drink-created'} id={'no-drinks'}>
                    <div className={'drink-created-name'}>Favorite Recipes</div>
                </div>
                {props.favSlice.map((e, index) => {
                    return <FavoriteCard removeFavorite={props.removeFavorite} displayFavorite={props.displayFavorite} drink={e} key={index}/>;
                })}
                <div className={'drink-created'}>
                    <div onClick={() => props.paginatePrev()} id={'btn-paginate-prev'}></div> Page: {props.pageState} <div onClick={() => props.paginateNext()} id={'btn-paginate-next'}></div>
                </div>
            </div>
        );
};

export default MyDrinks;