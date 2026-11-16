/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field, Form } from 'react-final-form'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import S from './login.module.css'

import { login } from '../../Redux/authReducer'
import { FormCreate } from '../Common/FormControls/formControls'
import styles from '../Common/FormControls/formControls.module.css'
import Input from 'antd/es/input/Input'

const Fields = ({ names, subscription, fieldsState = {}, children, originalRender }: any) => {
  if (!names.length) {
    return (originalRender || children)(fieldsState)
  }
  const [name, ...rest] = names
  return (
    <Field name={name} subscription={subscription}>
      {(fieldState) => (
        <Fields
          names={rest}
          subscription={subscription}
          originalRender={originalRender || children}
          fieldsState={{ ...fieldsState, [name]: fieldState }}
        />
      )}
    </Field>
  )
}
const Login2 = (props: any) => {
  const onSubmit = (values: any) => {
    props.login(values.email, values.password, values.rememberMe, values.captcha)
    values.captcha = ''
  }
  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }
  return (
    <div>
      <h1>Страница логина</h1>
      <Form
        onSubmit={onSubmit}
        // initialValues={{ }}
        validate={(values) => {
          const errors: any = {}
          if (!values.email) {
            errors.email = 'Поле обязательно'
          }
          if (!values.password) {
            errors.password = 'Поле обязательно'
          }
          return errors
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {' '}
              <Field
                name={'email'}
                fieldType={Input}
                placeholder={'Login'}
                component={FormCreate}
              />
            </div>
            <div>
              {' '}
              <Field
                name={'password'}
                type={'password'}
                fieldType={Input}
                autoComplete='on'
                placeholder={'Password'}
                component={FormCreate}
              />{' '}
            </div>
            {props.captcha && (
              <div>
                {' '}
                <img src={props.captcha} />
                <Field
                  name={'captcha'}
                  fieldType={Input}
                  autoComplete='on'
                  component={FormCreate}
                />{' '}
              </div>
            )}
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
              <button className={S.btn} type={'submit'} disabled={submitting || pristine}>
                Войти
              </button>{' '}
            </div>
            {/* <div> <Field name={'button'} type={'submit'} component={SubmitButton}>Кнопка</Field> </div> */}
            <div>
              <label style={{ color: 'red' }}>{props.loginError}</label>
            </div>
          </form>
        )}
      />
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
  loginError: state.auth.error,
  captcha: state.auth.captchaUrl,
})
export const LoginRFFComponent = connect(mapStateToProps, { login })(Login2)
