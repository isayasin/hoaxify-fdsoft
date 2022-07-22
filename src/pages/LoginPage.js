import React, {useState, useEffect} from "react";
import {withTranslation} from 'react-i18next';
import Input from "../components/Input";
import InputPass from "../components/InputPass";
import Button from "../components/Button";
import {withApiProgress} from "../shared/ApiProgress";
import {connect} from "react-redux";
import {loginHandler} from '../redux/authActions';

// import {Authentication} from "../shared/AuthenticationContext";

const LoginPage = props => {

    // static contextType = Authentication;

    /*    state = {
            username: null,
            password: null,
            error: null
        }*/
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    /*    onChange = event => {
            const {name, value} = event.target;
            this.setState({
                [name]: value,
                error: null
            });
        };*/

    useEffect(() => {
        setError(undefined);
    }, [username, password]);


    //onClickLogin = async event => {
    const onClickLogin = async event => {
        event.preventDefault();
        //const {username, password} = this.state;
        const creds = {
            username,
            password
        };

        const {history, dispatch} = props;
        const {push} = history;

        // this.setState({
        //     error: null
        // });
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            // this.setState({
            //     error: apiError.response.data.message
            // });
            setError(apiError.response.data.message);
        }
    };

    /*onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }*/

    const {t, pendingApiCall} = props;
    const buttonEnabled = username && password;

    return (

        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>
                <Input name="username" label={t("Username")} error={undefined}
                       onChange={event => setUsername(event.target.value)}/>
                <InputPass name="password" label={t("Password")} error={undefined}
                           onChange={event => setPassword(event.target.value)}/>
                {error && <div className="alert alert-danger">{error} </div>}
                <Button label={t("Login")} onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall}
                        pending={pendingApiCall}/>
            </form>
        </div>
    );
};
/*render()
{
    const {t, pendingApiCall} = this.props;
    const {error, username, password} = this.state;
    //const {username,password} = error;
    const buttonEnabled = username && password;
    return (

        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>

                <Input name="username" label={t("Username")} error={undefined} onChange={this.onChange}/>
                {/!*<div className="mb-3">
                      <label className="form-label">{t("Username")}</label>
                      <input className={username ? "form-control is-invalid" : "form-control"} autoComplete="none"
                             name="username" onChange={this.onChange}/>
                      <div className="invalid-feedback" >{username}</div>
                  </div>*!/}

                <InputPass name="password" label={t("Password")} error={undefined} onChange={this.onChange}/>
                {/!*<div className="mb-3">
                      <label className="form-label">{t("Password")}</label>
                      <input className={password ? "form-control is-invalid" : "form-control"}
                             name="password" onChange={this.onChange} type="password"/>
                      <div className="invalid-feedback" >{password}</div>
                  </div>*!/}
                {error && <div className="alert alert-danger">{error} </div>}

                <Button label={t("Login")} onClick={this.onClickLogin} disabled={!buttonEnabled || pendingApiCall}
                        pending={pendingApiCall}/>
                {/!*<div className="text-center" >
                      <button className="btn btn-primary" onClick={this.onClickLogin} disabled={!buttonEnabled}>{t("Login")}</button>
                  </div>*!/}

                {/!*<div>
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
                  </div>*!/}
            </form>
        </div>
    );
}
;
}*/


/*const mapDispatchToProps = dispatch => {
    return {
        onLoginSuccess: authState => dispatch(loginSuccess(authState))
    };
}*/

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/1.0/users')
export default connect()(LoginPageWithApiProgress);