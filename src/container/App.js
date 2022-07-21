import '../App.css';
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import TopBar from "../components/TopBar";
import React, {Component} from "react";
import userPage from "../pages/UserPage";
import {Authentication} from "../shared/AuthenticationContext";


class App extends Component {

    static contextType = Authentication;

    render() {
        const isLoggedIn = this.context.state.isLoggedIn;
        //const username = undefined;
        //const {isLoggedIn, username} = this.state;

        return (<div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    {!isLoggedIn && (<Route path="/login" component={LoginPage}
                        /*component={props => {
                            return <LoginPage {...props} onLoginSuccess={this.onLoginSuccess}/>;
                        }}*/
                        /*component={function (reactRouterProps){
                            return <LoginPage {... reactRouterProps} />;
                        }}*/
                    />)}
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route
                        path="/user/:username" component={UserPage}
                        /*component={props => {
                            return <UserPage {...props} username={username}/>;
                        }}*/
                    />
                    <Redirect to="/"/>
                </Switch>
            </Router>
            {/*<div className="col">
                    <LoginPage/>
                </div>
                <div className="col">
                    <UserSignupPage/>
                </div>*/}
            <LanguageSelector/>
        </div>);
    }
}

export default App;
