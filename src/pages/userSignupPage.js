import React from "react";
//import axios from "axios";
import { signup} from "../api/apiCalls";
import Input from "../components/Input";
import InputPass from "../components/InputPass";
import Button from "../components/Button";

class UserSignupPage extends React.Component{

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event => {
        const {name,value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        if(name=== 'password' || name === 'passwordRepeat'){
            if(name==='password' && value !== this.state.passwordRepeat){
                errors.passwordRepeat = 'Password mismatch';
            } else if (name === 'passwordRepeat' && value !== this.state.password){
                errors.passwordRepeat = 'Password mismatch';
            } else {
                errors.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errors
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
        }   catch (error){
            if(error.response.data.validationErrors){
                this.setState({ errors: error.response.data.validationErrors});
            }
        }

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
    const {pendingApiCall,errors} = this.state;
    const {username,displayName,password,passwordRepeat} = errors;
    return(
        <div className="container">
            <form>
                <h1 className="text-center"> Sign Up</h1>
                <Input name="username" label="Username" error={username} onChange={this.onChange} />
                {/*<div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className={username ? "form-control is-invalid" : "form-control"} autoComplete="none" name="username" onChange={this.onChange} />
                        <div className="invalid-feedback">{username}</div>
                    </div>*/}
                <Input name="displayName" label="Display Name" error={displayName} onChange={this.onChange} />
                {/*<div className="mb-3">
                    <label>Display Name</label>
                    <input className={displayName ? "form-control is-invalid" : "form-control"} autoComplete="none" name="displayName" onChange={this.onChange}/>
                    <div className="invalid-feedback">{displayName}</div>
                </div>*/}
                <InputPass name="password" label="Password" error={password} onChange={this.onChange}/>
                {/*<div className="mb-3">
                    <label>Password</label>
                    <input className="form-control" name="password" onChange={this.onChange} type="password"/>
                </div>*/}
                <InputPass name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange}/>
                {/*<div className="mb-3">
                    <label>Password Repeat</label>
                    <input className="form-control" name="passwordRepeat" onChange={this.onChange} type="password"/>
                </div>*/}
                <Button label="Sign Up" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined} pending={pendingApiCall}/>
                {/*<div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>}Sign up</button>
                </div>*/}
            </form>
        </div>
        );
    }
}

export default UserSignupPage;