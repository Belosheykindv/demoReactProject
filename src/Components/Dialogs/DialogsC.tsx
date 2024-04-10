import React from "react";
import { useState } from "react";
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { Navigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import {  maxLength100, required } from "../../Utils/Validators/validators";
import { FormCreate } from "../Common/FormControls/formControls";
import { Input, List, Avatar, Button } from "antd";
import { addDialogMessage, messagesType } from "../../Redux/dialogPage-reducer";
import { useDispatch, useSelector } from "react-redux";
import { IRootStore } from "../../Redux/reduxStore";
interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}
const Dialogs = (props: { auth: boolean; dialogsPage:any }) => {
    const dispatch = useDispatch()
    const dialogs = useSelector((state: IRootStore) => state.dialogsPage.dialogs)
    const messages = useSelector((state: IRootStore) => state.dialogsPage.messages)
    const [status, setButtonStatus] = useState(false)
    const composeValidators: any = (...validators: any[]) => (value: string) =>
        validators.reduce((error: string, validator: any) => error || validator(value), undefined)

    const onSubmit = (values: { newMessageBody: string | undefined; }) => {
        if (values.newMessageBody !== '') if (values.newMessageBody !== undefined) {
            dispatch(addDialogMessage(values.newMessageBody))
            values.newMessageBody = ''
            setButtonStatus(false)
        }

    };
    const buttonHandler = (e: string) => {
        if (e == '') { setButtonStatus(false) }
        else
            setButtonStatus(true)
    }
    let dialogElements = dialogs.map(d => <DialogItem ingridients={props.dialogsPage.dialogs} name={d.name} id={d.id} imgSrc={d.imgSrc} key={d.id} />);
    let messageElement = messages.map(m => <Message message={m.message} key={m.id} />);
    if (props.auth === false) return <Navigate to={'/login'} />
    return (
        <nav className={s.dialogs}>
            <div >
                {dialogElements}
            </div>
            <div className={s.messages}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field
                                    onInput={(e: { currentTarget: { value: any; }; }) => { buttonHandler(e.currentTarget.value) }}
                                    name={'newMessageBody'}
                                    defaultValue={''}
                                    validate={composeValidators(required, maxLength100)}>
                                    {({ input, meta }) => (
                                        <div>
                                            <Input {...input} type="text" placeholder="Введите сообщение" />
                                            {meta.error && meta.modified && <span>{meta.error}</span>}
                                        </div>
                                    )}
                                </Field>

                            </div>
                        </form>)}
                />
                {messageElement}
            </div>
            <div className={s.messages}>Здесь могла бы быть ваша реклама</div>
        </nav>
    )
}


export default Dialogs;