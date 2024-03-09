import React from "react"
import styles from "./formControls.module.css"
// import { Field } from "redux-form";
import { Field, Form } from "react-final-form";
import { Button, Input } from 'antd';
export const FormCreate = ({ input, meta, fieldType, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {React.createElement(fieldType, { ...input, ...props })}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormCreate {...props}><textarea {...input} {...restProps} /> </FormCreate>
}
export const CustopmInput = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormCreate {...props}> <input {...input}{...restProps} /> </FormCreate>
}
export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    <div>
        <Field placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props} /> {text}
    </div>
}