import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Home from './components/Home.jsx';
import DrinkSearch from './components/DrinkSearch.jsx';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, useParams, Link, HashRouter} from 'react-router-dom';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            userValue: '',
            userCreatedDrinks: {},
            favoriteDrinks: [],
            oldQuery: [],
            queryResults: [],
            currentDrink: [],
            drinkCategories: [],
            drinkNames: [],
            drinkIngredients: [],
            drinkGlassware: [],
            dataFocus: [],
            pageState: 1,
            favSlice: [],
            favIDs: [],
            popularDrinks: [],
            isCurrentFav: false
        };

        this.addFavorite = this.addFavorite.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.paginateNext = this.paginateNext.bind(this);
        this.paginatePrev = this.paginatePrev.bind(this);
        this.createQueryString = this.createQueryString.bind(this);
        this.categoryQuery = this.categoryQuery.bind(this);
        this.glasswareQuery = this.glasswareQuery.bind(this);
        this.letterQuery = this.letterQuery.bind(this);
        this.ingredientQuery = this.ingredientQuery.bind(this);
        this.drinkIDQuery = this.drinkIDQuery.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.getGlassware = this.getGlassware.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.getNames = this.getNames.bind(this);
        this.displayFavorite = this.displayFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.clearDrink = this.clearDrink.bind(this);
        this.getPopular = this.getPopular.bind(this);
    }

    UNSAFE_componentWillMount() {

        let favDrinks = window.localStorage.getItem('favoriteDrinks');
        let favIDs = this.state.favIDs;
        if (!favDrinks) {
            favDrinks = [];
        } else {
            favDrinks = JSON.parse(favDrinks);
        }

        favDrinks.forEach( e => {
            favIDs.push(e.idDrink);
        });

        this.setState({
            favoriteDrinks: favDrinks,
            favIDs: favIDs
        }, () => {
            let pS = this.state.pageState;
            this.setState({
                favSlice: this.state.favoriteDrinks.slice(((pS - 1) * 7), (pS * 7))
            });
        });

        axios.get('http://spiritguide.us-west-2.elasticbeanstalk.com/popular')
            .then( response => {
                this.setState({
                    popularDrinks: response.data.drinks
                })
            })
            .catch( err => console.log(err))
    }

    componentDidMount() {
        document.querySelector('.loadingScreen').remove();
    }

    addFavorite(drinkID) {

        let newAddition = this.state.currentDrink;
        let favorites = this.state.favoriteDrinks;
        let favIDs = this.state.favIDs;
        let alreadyFavorite = false;

        favorites.forEach(e => {
            if (e.idDrink === drinkID) {
                alreadyFavorite = true;
            }
        });

        if (!alreadyFavorite) {
            favorites.push(newAddition);
            favIDs.push(newAddition.idDrink);
        }

        this.setState({
            favoriteDrinks: favorites,
            favIDs: favIDs
        }, () => {
            let pS = this.state.pageState;
            this.setState({
                favSlice: this.state.favoriteDrinks.slice(((pS - 1) * 7), (pS * 7)),
                isCurrentFav: this.confirmFavorite()
            }, () => {
                let favString = JSON.stringify(this.state.favoriteDrinks);
                window.localStorage.setItem('favoriteDrinks', favString);
            });
        });
    }

    removeFavorite(drinkID) {
        let favState = this.state.favoriteDrinks;
        let favIDs = [];

        for (let i = 0; i < favState.length; i++) {
            if (favState[i].idDrink === drinkID) {
                favState.splice(i, 1);
            }
        }

        favState.forEach( e => {
            favIDs.push(e.idDrink);
        });

        this.setState({
            favoriteDrinks: favState,
            favIDs: favIDs
        }, () => {
            let pS = this.state.pageState;
            this.setState({
                favSlice: this.state.favoriteDrinks.slice(((pS - 1) * 7), (pS * 7)),
                isCurrentFav: this.confirmFavorite()
            }, () => {
                let favString = JSON.stringify(this.state.favoriteDrinks);
                window.localStorage.setItem('favoriteDrinks', favString);
            });
        });
    }

    displayFavorite(eventID) {
        let fav = this.state.favoriteDrinks;
        for (let i = 0; i < fav.length; i++) {
            if (fav[i].idDrink === eventID) {
                let drink = fav[i];
                this.setState({
                    currentDrink: drink
                }, () => {
                    this.setState({
                        isCurrentFav: this.confirmFavorite()
                    })
                });
            }
        }
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            userValue: e.target.value
        });
    }

    createQueryString(str) {
        let query = str.toLowerCase();
        let queryReturn = '';
        for (let i = 0; i < query.length; i++) {
            if (query.charAt(i) === ' ') {
                queryReturn += '_';
            } else {
                queryReturn += query.charAt(i);
            }
        }
        return queryReturn;
    }

    categoryQuery(event) {
        event.preventDefault();
        let self = this;
        let textQuery = event.currentTarget.textContent;
        textQuery = this.createQueryString(textQuery);
        this.setState({
            loading: true
        }, () => {
            axios.post('http://spiritguide.us-west-2.elasticbeanstalk.com/findByCategory', {
                    query: textQuery
                })
                .then(function (response) {
                    self.setState({
                        queryResults: response.data.drinks,
                        isCurrentFav: self.confirmFavorite(),
                        currentDrink: [],
                        loading: false
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    letterQuery(event) {
        event.preventDefault();
        let self = this;
        let textQuery = event.currentTarget.textContent;
        textQuery = this.createQueryString(textQuery);
        this.setState({
            loading: true
        }, () => {
            axios.post('http://spiritguide.us-west-2.elasticbeanstalk.com/findByLetter', {query: textQuery})
                .then(function (response) {
                    self.setState({
                        queryResults: response.data.drinks,
                        isCurrentFav: self.confirmFavorite(),
                        currentDrink: [],
                        loading: false
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    glasswareQuery(event) {
        event.preventDefault();
        let self = this;
        let textQuery = event.currentTarget.textContent;
        textQuery = this.createQueryString(textQuery);
        this.setState({
            loading: true
        }, () => {
            axios.post('http://spiritguide.us-west-2.elasticbeanstalk.com/findByGlassware', {
                    query: textQuery
                })
                .then(function (response) {
                    self.setState({
                        queryResults: response.data.drinks,
                        isCurrentFav: self.confirmFavorite(),
                        currentDrink: [],
                        loading: false
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    ingredientQuery(event) {
        event.preventDefault();
        let self = this;
        let textQuery = event.currentTarget.textContent;
        textQuery = this.createQueryString(textQuery);
        this.setState({
            loading: true
        }, () => {
            axios.post('http://spiritguide.us-west-2.elasticbeanstalk.com/findByIngredient', {
                    query: textQuery
                })
                .then(function (response) {
                    if (typeof (response.data.drinks) === 'string') {
                        self.setState({
                            queryResults: [{'strDrink': `No Drink Found: ${textQuery}`, 'strDrinkThumb': './img/sadgurl.jpg', 'idDrink': 'zero0'}],
                            loading: false
                        });
                    } else {
                        self.setState({
                            queryResults: response.data.drinks,
                            isCurrentFav: self.confirmFavorite(),
                            currentDrink: [],
                            loading: false
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    drinkIDQuery(event) {
        event.preventDefault();
        let oldQuery = this.state.queryResults;
        let self = this;
        let idQuery = event.currentTarget.id;
        this.setState({
            loading: true
        }, () => {
            axios.post('http://spiritguide.us-west-2.elasticbeanstalk.com/findByID', {
                    query: idQuery
                })
                .then(function (response) {
                    if (!response.data.drinks.length) {
                        self.setState({
                            currentDrink: [],
                            queryResults: [],
                            isCurrentFav: self.confirmFavorite(),
                            oldQuery: oldQuery,
                            loading: false
                        });
                    } else {
                        self.setState({
                            currentDrink: response.data.drinks[0],
                            isCurrentFav: self.confirmFavorite(),
                            queryResults: [],
                            oldQuery: oldQuery,
                            loading: false
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    getNames() {
        let alpha = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        let alphaArr = [];
        alpha.forEach(e => {
            alphaArr.push({letter: true, value: e});
        });
        this.setState({
            dataFocus: alphaArr,
            isCurrentFav: this.confirmFavorite(),
            currentDrink: [],
            queryResults: []
        });
    }

    getCategory() {
        if (this.state.drinkCategories.length) {
            this.setState({
                dataFocus: this.state.drinkCategories,
                isCurrentFav: this.confirmFavorite(),
                currentDrink: [],
                queryResults: []
            });
        } else {
            let self = this;
            this.setState({
                loading: true
            }, () => {
                axios.get('http://spiritguide.us-west-2.elasticbeanstalk.com/getCategories')
                    .then(function (response) {
                        self.setState({
                            drinkCategories: response.data.drinks,
                            isCurrentFav: self.confirmFavorite(),
                            currentDrink: [],
                            queryResults: [],
                            loading: false
                        });
                    })
                    .then(() => {
                        self.setState({
                            dataFocus: this.state.drinkCategories,
                            loading: false
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }

    getIngredients() {
        if (this.state.drinkIngredients.length) {
            this.setState({
                dataFocus: this.state.drinkIngredients,
                isCurrentFav: this.confirmFavorite(),
                currentDrink: [],
                queryResults: []
            });
        } else {
            let self = this;
            this.setState({
                loading: true
            }, () => {
                axios.get('http://spiritguide.us-west-2.elasticbeanstalk.com/getIngredients')
                    .then(function (response) {
                        self.setState({
                            drinkIngredients: response.data.drinks,
                            isCurrentFav: self.confirmFavorite(),
                            currentDrink: [],
                            queryResults: [],
                            loading: false
                        });
                    })
                    .then(() => {
                        self.setState({
                            dataFocus: this.state.drinkIngredients,
                            loading: false
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }

    getGlassware() {
        if (this.state.drinkGlassware.length) {
            this.setState({
                dataFocus: this.state.drinkGlassware,
                isCurrentFav: this.confirmFavorite(),
                currentDrink: [],
                queryResults: []
            });
        } else {
            let self = this;
            this.setState({
                loading: true
            }, () => {
                axios.get('http://spiritguide.us-west-2.elasticbeanstalk.com/getGlassware')
                    .then(function (response) {
                        self.setState({
                            drinkGlassware: response.data.drinks,
                            isCurrentFav: self.confirmFavorite(),
                            currentDrink: [],
                            queryResults: [],
                            loading: false
                        });
                    })
                    .then(() => {
                        self.setState({
                            dataFocus: this.state.drinkGlassware,
                            loading: false
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });
        }
    }

    getPopular() {
        let popular = this.state.popularDrinks;
        this.setState({
            currentDrink: [],
            queryResults: popular,
            oldQuery: popular
        })
    }


    paginatePrev() {
        let pS = this.state.pageState;
        if (pS > 1) {
            pS--;
            this.setState({
                pageState: pS
            }, () => {
                pS = this.state.pageState;
                this.setState({
                    favSlice: this.state.favoriteDrinks.slice(((pS - 1) * 7), (pS * 7))
                });
            });
        }
    }

    paginateNext() {
        let pS = this.state.pageState;
        pS++;
        this.setState({
            pageState: pS
        }, () => {
            pS = this.state.pageState;
            this.setState({
                favSlice: this.state.favoriteDrinks.slice(((pS - 1) * 7), (pS * 7))
            });
        });
    }

    clearDrink() {
        let oldQuery = this.state.oldQuery;
        this.setState({
            currentDrink: [],
            isCurrentFav: this.confirmFavorite(),
            queryResults: oldQuery,
            oldQuery: []
        });
    }

    confirmFavorite(){
        return this.state.favIDs.includes(this.state.currentDrink.idDrink);
    }

    render() {
        return (
            <HashRouter>
                <div className={'container'}>
                    <div className={'nav-top'}>
                        <div className={'nav-title'}>Spirit Guide</div>
                        <div className={'nav-menu'}>
                            <div className={'nav-link'} id={'home'}>
                                <Link to="/">Home</Link>
                            </div>
                            <div className={'nav-link'} id={'profile'}>
                                <Link to="/saved">Saved Drinks</Link>
                            </div>
                            <div className={'nav-link'} onClick={() => { this.setState({currentDrink: []}); }} id={'search'}>
                                <Link to="/search">Search Drink Recipes</Link>
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <Home popular={this.state.popularDrinks}
                                  drinkIDQuery={this.drinkIDQuery}
                                  loading={this.state.loading}
                                  favorites={this.state.favoriteDrinks}/>
                        </Route>
                        <Route exact path="/saved">
                            <Profile createdDrinks={this.state.userCreatedDrinks}
                                     favConfirm={this.state.isCurrentFav}
                                     pageState={this.state.pageState}
                                     favSlice={this.state.favSlice}
                                     paginatePrev={this.paginatePrev}
                                     paginateNext={this.paginateNext}
                                     favorites={this.state.favoriteDrinks}
                                     displayFavorite={this.displayFavorite}
                                     addFavorite={this.addFavorite}
                                     currentDrink={this.state.currentDrink}
                                     removeFavorite={this.removeFavorite}
                            />
                        </Route>
                        <Route path="/search">
                            <DrinkSearch createQueryString={this.createQueryString}
                                         favConfirm={this.state.isCurrentFav}
                                         categoryQuery={this.categoryQuery}
                                         glasswareQuery={this.glasswareQuery}
                                         letterQuery={this.letterQuery}
                                         ingredientQuery={this.ingredientQuery}
                                         drinkIDQuery={this.drinkIDQuery}
                                         getCategory={this.getCategory}
                                         getGlassware={this.getGlassware}
                                         getIngredients={this.getIngredients}
                                         getNames={this.getNames}
                                         addFavorite={this.addFavorite}
                                         loading={this.state.loading}
                                         queryResults={this.state.queryResults}
                                         currentDrink={this.state.currentDrink}
                                         drinkCategories={this.state.drinkCategories}
                                         drinkNames={this.state.drinkNames}
                                         drinkIngredients={this.state.drinkIngredients}
                                         drinkGlassware={this.state.drinkGlassware}
                                         dataFocus={this.state.dataFocus}
                                         clearDrink={this.clearDrink}
                                         getPopular={this.getPopular}

                            />
                        </Route>
                    </Switch>
                    <div className={'footer'}>
                        <span className={'hire-me'}>SpiritGuide is a React application created with love by Kytra Murphree.  Kytra is currently looking for employment as a Front-end Web Developer.
                                                    Recruiters and Hiring Managers may contact her at kytrascript@gmail.com or via <a
                                href={'http://www.linkedin.com/in/kytrascript'}>LinkedIn</a>.</span>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
