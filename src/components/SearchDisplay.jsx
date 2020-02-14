import React from 'react';
import ResultCard from './ResultCard.jsx';
import DrinkCard from './DrinkCard.jsx';
import InstructionCard from './InstructionCard.jsx';
import axios from 'axios';

class SearchDisplay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        if (!this.props.queryResults.length && !this.props.currentDrink.idDrink) {
            return (
                <div className={this.props.loading ? 'apiLoading' : 'data-points'}>
                    {this.props.dataFocus.map((e, index) => {
                        if (e.strGlass) {
                            return <ResultCard loading={this.props.loading} result={e.strGlass} query={this.props.glasswareQuery} key={index}/>;
                        } else if (e.strCategory) {
                            return <ResultCard loading={this.props.loading} result={e.strCategory} query={this.props.categoryQuery} key={index}/>;
                        } else if (e.strIngredient1) {
                            return <ResultCard loading={this.props.loading} result={e.strIngredient1} query={this.props.ingredientQuery} key={index}/>;
                        } else if (e.letter) {
                            return <ResultCard loading={this.props.loading} result={e.value} query={this.props.letterQuery} key={index}/>;
                        }
                    })}
                </div>
            );
        } else if (this.props.currentDrink.idDrink) {
            return (
                <div className={this.props.loading ? 'apiLoading' : 'data-points'}>
                    <div onClick={() => this.props.clearDrink()} title={'Back to Results'} id={'btn-return'}></div>
                    <InstructionCard loading={this.props.loading} drink={this.props.currentDrink} favConfirm={this.props.favConfirm} addFavorite={this.props.addFavorite}/>
                </div>
            );
        }
        else if (this.props.queryResults.length && !this.props.currentDrink.idDrink) {
            return (
                <div className={this.props.loading ? 'apiLoading' : 'data-points-drinks'}>
                    {this.props.queryResults.map((e, index) => {
                        return <DrinkCard loading={this.props.loading} drink={e} key={index} query={this.props.drinkIDQuery}/>;
                    })}
                </div>
            );
        }
    }
}

export default SearchDisplay;
