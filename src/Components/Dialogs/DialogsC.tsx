/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { addDialogMessage } from '@redux/dialogPage-reducer'
import { IRootStore } from '@redux/reduxStore'
import { Input } from 'antd'

import { DialogItemComponent } from '@components/Dialogs/DialogItem'
import s from '@components/Dialogs/Dialogs.module.css'
import { MessageComponent } from '@components/Dialogs/Message'
import { maxLength100, required } from '@utils/Validators/validators'

const Dialogs = (props: { auth: boolean; dialogsPage: any }) => {
  const dispatch = useDispatch()
  const dialogs = useSelector((state: ReturnType<IRootStore>) => state.dialogsPage.dialogs)
  const messages = useSelector((state: ReturnType<IRootStore>) => state.dialogsPage.messages)
  const [, setButtonStatus] = useState(false)
  const composeValidators: any =
    (...validators: any[]) =>
    (value: string) =>
      validators.reduce((error: string, validator: any) => error || validator(value), undefined)

  const onSubmit = (values: { newMessageBody: string | undefined }) => {
    if (values.newMessageBody !== '')
      if (values.newMessageBody !== undefined) {
        dispatch(addDialogMessage(values.newMessageBody))
        values.newMessageBody = ''
        setButtonStatus(false)
      }
  }
  const buttonHandler = (e: string) => {
    if (e == '') {
      setButtonStatus(false)
    } else setButtonStatus(true)
  }
  const dialogElements = dialogs.map((d) => (
    <DialogItemComponent
      ingridients={props.dialogsPage.dialogs}
      name={d.name}
      id={d.id}
      imgSrc={d.imgSrc}
      key={d.id}
    />
  ))
  const messageElement = messages.map((m) => <MessageComponent message={m.message} key={m.id} />)
  if (props.auth === false) return <Navigate to={'/login'} />
  return (
    <nav className={s.dialogs}>
      <div>{dialogElements}</div>
      <div className={s.messages}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field
                  onInput={(e: { currentTarget: { value: any } }) => {
                    buttonHandler(e.currentTarget.value)
                  }}
                  name={'newMessageBody'}
                  defaultValue={''}
                  validate={composeValidators(required, maxLength100)}
                >
                  {({ input, meta }) => (
                    <div>
                      <Input {...input} type='text' placeholder='Введите сообщение' />
                      {meta.error && meta.modified && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
              </div>
            </form>
          )}
        />
        {messageElement}
      </div>
      <div className={s.messages}>Здесь могла бы быть ваша реклама</div>
    </nav>
  )
}

export const DialogsComponent = Dialogs
