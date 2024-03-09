import React from "react";
import { useState } from "react";
import s from './Dialogs.module.css';
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { Navigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { maxLength100, required } from "../../Utils/Validators/validators";
import { FormCreate, TextArea } from "../Common/FormControls/formControls";
import { Input, List, Avatar } from "antd";

const Dialogs = (props) => {
    // const messageArea = React.createRef();
    const onSubmit = (values) => {
        props.addDialogMessage(values.newMessageBody)
        values.newMessageBody = ''
        setButtonStatus(false)
    };
    const [status, setButtonStatus] = useState(false)
    const buttonHandler = (e) => {
        if (e == '') { setButtonStatus(false) }
        else
            setButtonStatus(true)
    }
    let state = (props.dialogsPage);
    let dialogElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} imgSrc={d.imgSrc} key={d.id} />);
    let messageElement = state.messages.map(m => <Message message={m.message} key={m.id} />);
    if (props.auth === false) return <Navigate to={'/login'} />
    return (
        <nav className={s.dialogs}>
            <div >
                {dialogElements}
            </div>
            <div className={s.messages}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, submitting, pristine }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field
                                    onInput={(e) => { buttonHandler(e.currentTarget.value) }}
                                    component={FormCreate}
                                    fieldType={Input}
                                    placeholder='Введите сообщениеee'
                                    name={'newMessageBody'}
                                    validate={(required, maxLength100)} />
                            </div>
                            <div>
                                <br />
                                <button
                                    disabled={status !== true}
                                    type={"submit"} className={status ? s.btn : s.disBtn}>Отправить сообщение</button>
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