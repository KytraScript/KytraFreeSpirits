import React from 'react';
import PopularDrink from './PopularDrink.jsx';
import {BrowserRouter as Router, Route, Redirect, Link} from 'react-router-dom';

const Home = (props) => {
    return (
        <div className={'main'}>
            <div className={'viewer'}>
                <div className={'info-bar'}><span className={'info-bar-profile'}><a href={'http://www.linkedin.com/in/kytrascript'}>A Kytrascript Application</a></span></div>
                <div className={'card'}>
                    <div className={'drink-details-viewer'}>
                        <div className={'data-points-drinks'}>
                            <div className={'landing-page'}>
                            <h1>Welcome to Kytra's Spirit Guide</h1>
                                <p>
                                    {props.favorites.length ? `Nice to see you again! You currently have ${props.favorites.length} drink${props.favorites.length === 1 ? '' : 's'} saved to your 
                                    list. You can access these recipes through the Saved Drinks navigation link or search our database of drinks for more
                                    cocktails that interest you! You can save as many drinks to your list as you'd like.` : 'It looks like this may be your first time here ' +
                                        'or you have not yet saved any drink recipes. You can search my cocktail recipe database by' +
                                        ' clicking the Search Drink Recipes navigation link above or by selecting one of the popular drink searches I have listed below. Add your favorites drinks to your saved ' +
                                        'drinks list to retrieve them with ease in the future. You can save as many drinks to your Saved Drinks list as you\'d like.'}
                                </p>
                                <h3>Some Popular Drink Choices:</h3>
                            </div>
                            {props.popular.map((e, index) => {
                                return (
                                    <PopularDrink redirect={props.redirect} loading={props.loading} drink={e} key={index} query={props.drinkIDQuery}/>
                                    )
                            })}
                            <h2>Thank you for using Spirit Guide!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;
