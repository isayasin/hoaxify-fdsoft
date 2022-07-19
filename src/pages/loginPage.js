import React,{Component} from "react";

import {login} from "../api/apiCalls";
import {withTranslation} from 'react-i18next';
import Input from "../components/Input";
import InputPass from "../components/InputPass";
import Button from "../components/Button";
import axios from "axios";
import {withApiProgress} from "../shared/ApiProgress";

class LoginPage extends Component{
    state = {
        username: null,
        password: null,
        error: null
    }

    onChange = event => {
        const {name,value} = event.target;
        this.setState({
            [name]:value,
            error: null
        });
    };

    onClickLogin = async event => {
        event.preventDefault();
        const {username, password} = this.state;
        const creds = {
            username,
            password
        };
        this.setState({
            error: null
        });
        try {
            await login(creds)
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    };

    /*onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }*/

    render(){
        const {t, pendingApiCall} = this.props;
        const {error,username,password} = this.state;
        //const {username,password} = error;
        const buttonEnabled = username && password;
        return(

          <div className="container">
              <form>
                  <h1 className="text-center">{t("Login")}</h1>

                  <Input name="username" label={t("Username")} error={undefined} onChange={this.onChange} />
                  {/*<div className="mb-3">
                      <label className="form-label">{t("Username")}</label>
                      <input className={username ? "form-control is-invalid" : "form-control"} autoComplete="none"
                             name="username" onChange={this.onChange}/>
                      <div className="invalid-feedback" >{username}</div>
                  </div>*/}

                  <InputPass name="password" label={t("Password")} error={undefined} onChange={this.onChange}/>
                  {/*<div className="mb-3">
                      <label className="form-label">{t("Password")}</label>
                      <input className={password ? "form-control is-invalid" : "form-control"}
                             name="password" onChange={this.onChange} type="password"/>
                      <div className="invalid-feedback" >{password}</div>
                  </div>*/}
                  {error &&<div className="alert alert-danger">{error} </div>}

                  <Button label={t("Login")} onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall} pending={pendingApiCall} />
                  {/*<div className="text-center" >
                      <button className="btn btn-primary" onClick={this.onClickLogin} disabled={!buttonEnabled}>{t("Login")}</button>
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

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/1.0/users' )
export default LoginPageWithApiProgress;