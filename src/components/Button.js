import React from "react";

const Button = props => {
    const {label, onClick, disabled, pending} = props;
    return(
    <div className="text-center">
        <button className="btn btn-primary" onClick={onClick} disabled={disabled}>
            {pending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>}
            {label}
        </button>
    </div>
    )
}

export default Button;