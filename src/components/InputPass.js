import React from "react";

const InputPass = props => {
    const{label, name, error, onChange} = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return(
        <div className="form-group">
            <label>{label}</label>
            <input className={className} name={name} onChange={onChange} type="password"/>
            <div className="invalid-feedback">{props.error}</div>
        </div>
    )
}
export default InputPass;