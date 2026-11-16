import type { Dialog } from 'types/components'

import { useState } from 'react'
import s from './DialogItem.module.css'
import { Button, Card } from 'antd'

import Modal from 'antd/es/modal/Modal'

type DialogItemProps = Dialog & { ingridients: Dialog[] }

const DialogItem = (props: DialogItemProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const ingridients = props.ingridients.map((element) => (
    <Card
      key={element.id}
      bodyStyle={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      hoverable
      style={{
        width: 120,
        height: 'min-content',
      }}
      cover={<img alt='example' src={props.imgSrc} />}
    >
      <span>Ингридиент из Стейта</span>
      <p>99р</p>
    </Card>
  ))

  return (
    <div className={s.dialogsItems}>
      <img src={props.imgSrc} alt={props.name} />
      {/* <NavLink to={path} className={navData => navData.isActive ? s.active : s.dialogsItems}> */}
      <div>
        <span onClick={showModal}>{props.name}</span>
      </div>
      {/* </NavLink> */}
      <Modal
        width={900}
        height={'auto'}
        centered={true}
        keyboard={true}
        open={isModalOpen}
        onOk={handleOk}
        okText={`Добавить в корзину за ${props.id} руб`}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { width: 'min-content' } }}
      >
        <div className={s.modalBlock}>
          <div className={s.imgBlock}>
            <img src={props.imgSrc} alt={props.name} />
          </div>
          <div className={s.descriptionBlock}>
            <div className={s.name}>
              {' '}
              <h3>{props.name}</h3>
            </div>
            <div className={s.lowDescriptions}>
              <span>25 см, традиционное тесто 25, 380 г</span>
            </div>
            <div className={s.btnBlock}>
              <Button>Small</Button>
              <Button>Medium</Button>
              <Button>Large</Button>
            </div>
            <div className={s.name}>
              <span>Добавить по вкусу</span>
            </div>
            <div className={s.cardBlock}>{ingridients}</div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export const DialogItemComponent = DialogItem
