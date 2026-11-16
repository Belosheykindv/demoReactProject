import '@components/Dialogs/Dialogs.scss'

const Message = (props: { message: string }) => {
  return (
    <div className='messages'>
      {props.message} <hr />
    </div>
  )
}
export const MessageComponent = Message
