import React from "react";

const Input = (props) => {
    return (
        <div className={props.class}>
            <label htmlFor={props.id}>{props.label}</label>
            <input type={props.type} id={props.id} value={props.value} onChange={props.onChange} onBlur={props.onBlur} />
        </div>
    )
};

export default Input;