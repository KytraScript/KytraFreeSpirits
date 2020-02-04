import React from 'react';
import MyDrinks from './MyDrinks.jsx'
import InstructionCard from './InstructionCard.jsx';

const Profile = (props) => {
    return (
        <div className={'main'}>
            <div className={'viewer'}>
                <div className={'info-bar'}><span className={'info-bar-profile'}><a href={'http://www.linkedin.com/in/kytrascript'}>A Kytrascript Application</a></span></div>
                <div className={'card'}>
                    <div className={'list'}>
                        <MyDrinks paginatePrev={props.paginatePrev} paginateNext={props.paginateNext} displayFavorite={props.displayFavorite} removeFavorite={props.removeFavorite}
                                  createdDrinks={props.createdDrinks} favorites={props.favorites} favSlice={props.favSlice} pageState={props.pageState}/>
                    </div>
                    <div className={'drink-details-viewer'}>
                        <div className={'data-points'}>
                            <InstructionCard drink={props.currentDrink} addFavorite={props.addFavorite}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;