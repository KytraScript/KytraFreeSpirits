import React from 'react';
import axios from 'axios';
import SearchDisplay from './SearchDisplay.jsx';

class DrinkSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={'main'}>
                <div className={'viewer'}>
                    <div className={'info-bar'}><span className={'info-bar-profile'}><a href={'http://www.linkedin.com/in/kytrascript'}>A Kytrascript Application</a></span></div>
                    <div className={'card'}>
                        <div className={'list'}>
                            <div className={'search-option'} onClick={this.props.getNames}>
                                <div id={'btn-by-name'}></div>
                                <div className={'search-option-name'}>By First Letter</div>
                            </div>
                            <div className={'search-option'} onClick={this.props.getCategory}>
                                <div id={'btn-by-category'}></div>
                                <div className={'search-option-name'}>By Category</div>
                            </div>
                            <div className={'search-option'} onClick={this.props.getIngredients}>
                                <div id={'btn-by-ingredients'}></div>
                                <div className={'search-option-name'}>By Ingredients</div>
                            </div>
                            <div className={'search-option'} onClick={this.props.getGlassware}>
                                <div id={'btn-by-glassware'}></div>
                                <div className={'search-option-name'}>By Glassware</div>
                            </div>
                            <div className={'search-option'} onClick={this.props.getPopular}>
                                <div id={'btn-by-popular'}></div>
                                <div className={'search-option-name'}>Popular Searches</div>
                            </div>
                        </div>
                        <div className={this.props.loading ? 'whiteBck drink-details-viewer' : 'drink-details-viewer'}>
                            <SearchDisplay dataFocus={this.props.dataFocus}
                                           favConfirm={this.props.favConfirm}
                                           loading={this.props.loading}
                                           glasswareQuery={this.props.glasswareQuery}
                                           categoryQuery={this.props.categoryQuery}
                                           ingredientQuery={this.props.ingredientQuery}
                                           letterQuery={this.props.letterQuery}
                                           drinkIDQuery={this.props.drinkIDQuery}
                                           addFavorite={this.props.addFavorite}
                                           queryResults={this.props.queryResults}
                                           currentDrink={this.props.currentDrink}
                                           drinkCategories={this.props.drinkCategories}
                                           drinkNames={this.props.drinkNames}
                                           drinkIngredients={this.props.drinkIngredients}
                                           drinkGlassware={this.props.drinkGlassware}
                                           clearDrink={this.props.clearDrink}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DrinkSearch;
