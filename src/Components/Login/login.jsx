import React from "react";
import { Field, reduxForm } from "redux-form";
// import { Form, Field } from 'react-final-form'
import { FormCreate, Input } from "../Common/FormControls/formControls";
import { maxLengthCreator, required } from "../../Utils/Validators/validators";
import { connect } from "react-redux";
import { login } from "../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import styles from "../Common/FormControls/formControls.module.css"

const maxLength25 = maxLengthCreator(25)
const maxLength12 = maxLengthCreator(12)

const LoginForm = (props) => {
    return (
        <div>
            <h1>Логин</h1>
            <form onSubmit={props.handleSubmit}>
                <div> <Field name={'email'} placeholder={"Login"} fieldType={'input'} component={FormCreate} validate={[required, maxLength25]} /></div>
                <div> <Field name={'password'} placeholder={"Password"} fieldType={'input'} component={FormCreate} validate={[required, maxLength12]} 
                type={'password'}
                 /> </div>
                <div> <Field name={'rememberMe'} type={'checkbox'} fieldType={'input'} component={FormCreate} /> Remember me</div>
                {props.error && <div className={styles.formSummaryError}> {props.error} </div>}
                <div> <button>Login</button></div>
            </form>
        </div>
    )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Navigate to={'/profile'} />
    }
    return (
        <LoginReduxForm onSubmit={onSubmit} />
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);