import React from "react";

const Input = props => {
    const {label, error, name, onChange, type} = props;
    let className = error ? "form-control is-invalid" : "form-control";
    return(
    <div className="form-group">
        <label >{label}</label>
        <input className={className} autoComplete="none" name={name} onChange={onChange} type={type}/>
        <div className="invalid-feedback">{props.error}</div>
    </div>
    );
};
export default Input;


