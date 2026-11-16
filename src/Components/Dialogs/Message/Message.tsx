import s from '@components/Dialogs/Dialogs.module.css'

const Message = (props: { message: string }) => {
  return (
    <div className={s.messages}>
      {props.message} <hr />
    </div>
  )
}
export const MessageComponent = Message
