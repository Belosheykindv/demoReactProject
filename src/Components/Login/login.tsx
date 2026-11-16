/* eslint-disable @typescript-eslint/no-explicit-any */

import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { login } from '@redux/authReducer'
import { Field, reduxForm } from 'redux-form'

import { FormCreate } from '@components/Common/FormControls'
import styles from '@components/Common/FormControls/formControls.module.css'
import { maxLengthCreator, required } from '@utils/Validators/validators'

const maxLength25 = maxLengthCreator(25)
const maxLength12 = maxLengthCreator(12)

const LoginForm = (props: any) => {
  return (
    <div>
      <h1>Логин</h1>
      <form onSubmit={props.handleSubmit}>
        <div>
          {' '}
          <Field
            name={'email'}
            placeholder={'Login'}
            fieldType={'input'}
            component={FormCreate}
            validate={[required, maxLength25]}
          />
        </div>
        <div>
          {' '}
          <Field
            name={'password'}
            placeholder={'Password'}
            fieldType={'input'}
            component={FormCreate}
            validate={[required, maxLength12]}
            type={'password'}
          />{' '}
        </div>
        <div>
          {' '}
          <Field
            name={'rememberMe'}
            type={'checkbox'}
            fieldType={'input'}
            component={FormCreate}
          />{' '}
          Remember me
        </div>
        {props.error && <div className={styles.formSummaryError}> {props.error} </div>}
        <div>
          {' '}
          <button>Login</button>
        </div>
      </form>
    </div>
  )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = (props: any) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }
  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }
  return <LoginReduxForm onSubmit={onSubmit} />
}
const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
})
export const LoginComponent = connect(mapStateToProps, { login })(Login)
