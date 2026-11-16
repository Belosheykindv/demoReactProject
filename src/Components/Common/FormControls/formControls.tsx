/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement } from 'react'
import { Field } from 'react-final-form'

import './formControls.scss'

export const FormCreate = ({ input, meta, fieldType, ...props }: any) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={`formControl${hasError ? ' error' : ''}`}>
      <div>{createElement(fieldType, { ...input, ...props })}</div>
      {hasError && <span>{meta.error}</span>}
    </div>
  )
}

export const Textarea = (props: any) => {
  const { input, ...restProps } = props
  return (
    <FormCreate {...props}>
      <textarea {...input} {...restProps} />{' '}
    </FormCreate>
  )
}
export const CustopmInput = (props: any) => {
  const { input, ...restProps } = props
  return (
    <FormCreate {...props}>
      {' '}
      <input {...input} {...restProps} />{' '}
    </FormCreate>
  )
}
export const createField = (
  placeholder: any,
  name: any,
  validators: any,
  component: any,
  props = {},
  text = '',
) => {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />{' '}
      {text}
    </div>
  )
}
