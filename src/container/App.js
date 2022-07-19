import '../App.css';
import UserSignupPage from "../pages/UserSignupPage";
import LanguageSelector from "../components/LanguageSelector";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import TopBar from "../components/TopBar";

function App() {
  return (
        <div>
            <Router>
                <TopBar/>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route path="/user/:username" component={UserPage}/>
                    <Redirect to="/" />
                </Switch>
            </Router>
            {/*<div className="col">
                    <LoginPage/>
            </div>
            <div className="col">
                    <UserSignupPage/>
            </div>*/}
            <LanguageSelector/>
        </div>
  );
}

export default App;
