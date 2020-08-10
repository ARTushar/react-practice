import React from 'react'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { DISHES } from '../shared/dishes.js'
import Header from './HeaderComponent.js'
import Footer from './FooterComponent.js'
import Home from './HomeComponent.js'
import { Switch, Route, Redirect } from 'react-router-dom'


class Main extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
        };
    }

    render(){

        const HomePage = () => {
            return(
                <Home />
            );
        }

        return(
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;