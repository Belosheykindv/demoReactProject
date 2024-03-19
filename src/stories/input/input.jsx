
import React from "react";

export const InputCustom = ({
    type,
    placeholder,
    value,
    ...props
}) => {

    return (
        <input type={type} placeholder={placeholder} value={value}{...props} />
    )
}