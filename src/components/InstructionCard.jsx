import React from 'react';
import Ingredients from './Ingredients.jsx';

const InstructionCard = (props) => {

    function listIngredients() {
        let slicedKey;
        let ingredients = [];
        for (let key in props.drink) {
            slicedKey = key.slice(0, 13);
            if (slicedKey === 'strIngredient' && props.drink[key] !== null) {
                ingredients.push(props.drink[key]);
            }
        }
        return ingredients;
    }

    function listMeasurements() {
        let slicedKey;
        let measurements = [];
        for (let key in props.drink) {
            slicedKey = key.slice(0, 10);
            if (slicedKey === 'strMeasure' && props.drink[key] !== null) {
                measurements.push(props.drink[key]);
            }
        }
        return measurements;
    }

    let allIngredients = listIngredients();
    let allMeasurements = listMeasurements();
    let count = -1;

    return (<div className={props.loading ? 'hidden' : ''}>
            <div className={props.drink.idDrink ? 'instruction-card' : 'instruction-card hidden'}>
                <div className={'instruction-info'}>
                    <div className={'instruction-name'}>{props.drink.strDrink}</div>
                    <div className={'instruction-thumb'}><img alt={props.drink.strDrink} src={props.drink.strDrinkThumb}/></div>
                    <div className={'instruction-steps'}><strong>Glassware:</strong> {props.drink.strGlass}</div>
                    <div className={'instruction-steps'}><strong>Directions:</strong> {props.drink.strInstructions}</div>
                    <div className={'instruction-ingredients'}>
                        <strong>Ingredients: </strong>
                        {allIngredients.map((e, index) => {
                            count++;
                            return <Ingredients name={e} measure={allMeasurements[count]} key={index}/>;
                        })}
                    </div>
                    <div id={props.favConfirm ? 'btn-already-fav' : 'btn-add-fav'} onClick={() => props.addFavorite(props.drink.idDrink)}>
                        {props.favConfirm ? 'Saved!' : 'Add To Favorites'}</div>
                </div>
            </div>
        </div>
    );
};

export default InstructionCard;
