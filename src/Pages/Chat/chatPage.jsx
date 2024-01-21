import React, { useEffect, useRef, memo } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage, startMessagesListening, stopMessagesListening, unmountChat } from "../../Redux/chatReducer"
import style from './/..//../Components/Dialogs/Dialogs.module.css'
import { withAuthRedirect } from "../../Hoc/withAuthRedirect"
import { compose } from "redux"
const ChatPage = () => {
    return <div>
        <Chat />
    </div>
}

const Chat = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
            dispatch(unmountChat())
        }
    }, [])
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}
const Messages = () => {
    const messages = useSelector((state => state.chat.messages))
    return <div style={{ height: '800px', overflowY: 'auto' }}>
        {messages.map((m, index) => <Message key={m.id} message={m} id={m} />)}
    </div>
}
const Message = React.memo(({ message }) => {
    console.log('Отрисовка Сообщений')
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [message]);

    return <div ref={messagesEndRef}>
        <NavLink to={'/profile/' + message.userId}><img style={{ height: 50, width: 40 }} src={message.photo} /></NavLink> <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})
const AddMessageForm = () => {
    const [message, setMessage] = useState()
    const dispatch = useDispatch()
    const status = useSelector((state) => state.chat.status)
    const inputRef = useRef(null)
    const [btnStatus, setButtonStatus] = useState(false)
    const sendMessageHandler = () => {
        if (!message) {
            return setButtonStatus(false)
        }
        dispatch(sendMessage(message))
        setMessage('')
        setButtonStatus(false)
    }
    const inputHandler = (e) => {
        if (e == '') { setButtonStatus(false) }
        else
            setButtonStatus(true)
    }
    return <div>
        <div><Input size="large" showCount maxLength={100} onInput={(e) => setMessage(e.currentTarget.value)} ref={inputRef} name={'chatInput'} onChange={(e) => inputHandler(e.currentTarget.value)} value={message} placeholder="Введите сообщение" ></Input></div>
        <br></br>
        <div><button
            className={btnStatus ? style.btn : style.disBtn}
            disabled={status !== 'ready' && btnStatus !== true}
            onClick={sendMessageHandler}>Отправить</button></div>
    </div>
}
// export default ChatPage;
export default compose(
    withAuthRedirect
)(ChatPage)