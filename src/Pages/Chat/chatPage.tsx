import type { AppDispatch, RootState } from 'types/store'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import {
  sendMessage,
  startMessagesListening,
  startStatusListening,
  stopMessagesListening,
  stopStatusListening,
  unmountChat,
} from '@redux/chatReducer'
import { Button, Input, theme } from 'antd'
import { compose } from 'redux'

import style from '@components/Dialogs/Dialogs.module.css'
import userPhoto from '@src/Images/userPhoto.png'

const ChatPage = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat = () => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(startMessagesListening())
    dispatch(startStatusListening())
    return () => {
      dispatch(stopMessagesListening())
      dispatch(stopStatusListening())
      dispatch(unmountChat())
    }
  }, [])
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  )
}

const Messages = () => {
  const messages = useSelector((state: RootState) => state.chat.messages)
  return (
    <div style={{ height: '800px', overflowY: 'auto' }}>
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </div>
  )
}

type ChatMessage = {
  id: string
  userId: number
  userName: string
  photo: string | null
  message: string
}

const Message = React.memo(({ message }: { message: ChatMessage }) => {
  console.log('Отрисовка Сообщений')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [message])

  return (
    <div
      style={{
        margin: '4px 6px',
        padding: 4,
        // minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
      ref={messagesEndRef}
    >
      <NavLink to={'/profile/' + message.userId}>
        <img
          style={{ height: 50, width: 40, borderRadius: '10px' }}
          src={message.photo || userPhoto}
        />
      </NavLink>
      <span
        style={{
          position: 'relative',
          bottom: '20px',
          left: '10px',
          fontSize: '1.2rem',
        }}
      >
        {message.userName}{' '}
      </span>
      <br />
      <span style={{ fontSize: '1.0rem' }}>{message.message}</span>
      {/* <br /> */}
      <hr />
    </div>
  )
})

const AddMessageForm = () => {
  const [message, setMessage] = useState<string>()
  const dispatch = useDispatch<AppDispatch>()
  const status = useSelector((state: RootState) => state.chat.status)
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
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value == '') {
      setButtonStatus(false)
    } else setButtonStatus(true)
  }
  return (
    <div>
      <div style={{ display: 'flex', marginLeft: '10px' }}>
        <Input
          size='large'
          showCount
          maxLength={100}
          onInput={(e) => setMessage(e.currentTarget.value)}
          ref={inputRef}
          name={'chatInput'}
          onChange={(e) => inputHandler(e)}
          value={message}
          placeholder='Введите сообщение'
        ></Input>
        <Button
          className={btnStatus ? style.btn : style.disBtn}
          disabled={status !== 'ready' && btnStatus !== true}
          onClick={sendMessageHandler}
        >
          Отправить
        </Button>
      </div>
      <br></br>
      {/* <div>
            <button
                className={btnStatus ? style.btn : style.disBtn}
                disabled={status !== 'ready' && btnStatus !== true}
                onClick={sendMessageHandler}>Отправить</button>
        </div> */}
    </div>
  )
}
// export default ChatPage;
export const ChatPageComponent = compose(withAuthRedirect)(ChatPage)
