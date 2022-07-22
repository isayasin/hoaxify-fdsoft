import React, {Component} from "react";
//import axios from "axios";
import {signup} from "../api/apiCalls";
import Input from "../components/Input";
import InputPass from "../components/InputPass";
import Button from "../components/Button";
import {withTranslation} from 'react-i18next';
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from "react-redux";
import {signupHandler} from "../redux/authActions";


class UserSignupPage extends Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    };

    onChange = event => {
        const {t} = this.props;  //Bu 3 satır object contruction'a örnek
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = t('Password mismatch');
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

        const {history, dispatch} = this.props;
        const {push} = history;

        const {username, displayName, password} = this.state;

        const body = {      //json objesi
            username,
            displayName,
            password
        };
        //this.setState({pendingApiCall: true});

        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({errors: error.response.data.validationErrors});
            }
        }
        //this.setState({pendingApiCall: false});
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

    /*onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }*/

    render() {
        const {t, pendingApiCall} = this.props;
        const {errors} = this.state;
        const {username, displayName, password, passwordRepeat} = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center"> {t("Sign Up")}</h1>
                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange}/>
                    {/*<div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className={username ? "form-control is-invalid" : "form-control"} autoComplete="none" name="username" onChange={this.onChange} />
                        <div className="invalid-feedback">{username}</div>
                    </div>*/}
                    <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange}/>
                    {/*<div className="mb-3">
                    <label>Display Name</label>
                    <input className={displayName ? "form-control is-invalid" : "form-control"} autoComplete="none" name="displayName" onChange={this.onChange}/>
                    <div className="invalid-feedback">{displayName}</div>
                </div>*/}
                    <InputPass name="password" label={t("Password")} error={password} onChange={this.onChange}/>
                    {/*<div className="mb-3">
                    <label>Password</label>
                    <input className="form-control" name="password" onChange={this.onChange} type="password"/>
                </div>*/}
                    <InputPass name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat}
                               onChange={this.onChange}/>
                    {/*<div className="mb-3">
                    <label>Password Repeat</label>
                    <input className="form-control" name="passwordRepeat" onChange={this.onChange} type="password"/>
                </div>*/}
                    <Button
                        label={t("Sign Up")}
                        onClick={this.onClickSignUp}
                        disabled={pendingApiCall || passwordRepeat !== undefined}
                        pending={pendingApiCall}/>
                    {/*<div className="text-center">
                    <button className="btn btn-primary" onClick={this.onClickSignUp} disabled={pendingApiCall || passwordRepeat !== undefined}>
                        {pendingApiCall && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>}Sign up</button>
                </div>*/}
                    {/*<div>
                        <img
                            src="https://flagcdn.com/h40/tr.png"
                            srcSet="https://flagcdn.com/h80/tr.png 2x,https://flagcdn.com/h120/tr.png 3x"
                            height="24"
                            alt="Turkey"
                            onClick={() => this.onChangeLanguage('tr')}
                            style={{cursor: 'pointer'}}/>
                        <img
                            src="https://flagcdn.com/h24/us.png"
                            srcSet="https://flagcdn.com/h48/us.png 2x"
                            height="24"
                            alt="United States"
                            onClick={() => this.onChangeLanguage('en')}
                            style={{cursor: 'pointer'}}/>
                    </div>*/}
                </form>
            </div>
        );
    }
}

// High order Component uygulamsı ile UserSignupPage'i translation ile mixledik.
const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPage, '/api/1.0/users');
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, '/api/1.0/auth');
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForAuthRequest);

export default connect()(UserSignupPageWithTranslation);