import React from "react";
//import axios from "axios";
import { signup} from "../api/apiCalls";

class UserSignupPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    };

    onChange = event => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        });
    };

    onClickSignUp = async event => {
        //browser'in bizim yerimize birşey yapmasını engelliyoruz.
        event.preventDefault();

        const {username, displayName, password} = this.state;

        const body = {      //json objesi
            username,
            displayName,
            password
        };
        this.setState({pendingApiCall: true});

        try{
            const response = await signup(body);
        }   catch (error){}

        this.setState({pendingApiCall: false});

        /*signup(body)
            .then(response => {
                this.setState({pendingApiCall: false});
             })
            .catch(error =>{
                this.setState({pendingApiCall: false});
            });*/
    };

    // onChangeUsername = event => {
    //     this.setState({
    //         username: event.target.value
    //     });
    // };
    // onChangeDisplayName = event => {
    //     this.setState({
    //         displayName: event.target.value
    //     });
    // };
    // onChangePassword = event => {
    //     this.setState({
    //         password: event.target.value
    //     });
    // };
    // onChangePasswordRepeat = event => {
    //     this.setState({
    //         passwordRepeat: event.target.value
    //     });
    // };

    render() {
    const {pendingApiCall} = this.state;
        return(
            <div className="container">
                <form>
                    <h1 className="text-center"> Sign Up</h1>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control" autoComplete="none" name="username" onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label>Display Name</label>
                        <input className="form-control" autoComplete="none" name="displayName" onChange={this.onChange}/>
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input className="form-control" name="password" onChange={this.onChange} type="password"/>
                    </div>
                    <div className="mb-3">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" onChange={this.onChange} type="password"/>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={pendingApiCall}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>}Sign up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserSignupPage;