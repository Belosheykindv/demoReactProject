import type { MyPostsProps } from 'types/profile'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '@redux/profilePage-reducer'
import { Form as AntDForm, Button, Input } from 'antd'

import { PostComponent } from '@components/Profile/MyPosts/Post'

import './MyPosts.scss'

// const maxLength60 = maxLengthCreator(60);

const MyPosts = (props: MyPostsProps) => {
  const [isActive, setIsActive] = useState(false)
  const [form] = AntDForm.useForm()
  const dispath = useDispatch()
  const onFinish = (values: { postInput: string }) => {
    dispath(addPost(values.postInput))
    form.resetFields(['postInput'])
    setIsActive(false)
  }

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }
  const buttonHandler = (e: string) => {
    if (e == '') {
      setIsActive(false)
    } else setIsActive(true)
  }
  const state = props.profilePage
  const postsElements = state.posts.map((p) => (
    <PostComponent
      postId={p.id}
      message={p.message}
      likesCount={p.likesCount}
      share={p.share}
      img={p.imgSrc}
      key={p.id}
    />
  ))
  const userId = Number(props.router.params.userId || props.ownerUserId)
  if (userId) {
    return null
  }
  return (
    <div className='myPosts'>
      <div className='MyPostsClass'>
        <h3>Мои посты (Хардкод Без API)</h3>
        <div>
          <AntDForm
            className='postInputBlock'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <AntDForm.Item name={'postInput'} className='textBlock'>
              <Input
                name={'postInput'}
                showCount={true}
                maxLength={600}
                placeholder='Введите сообщение'
                onInput={(e) => {
                  buttonHandler(e.currentTarget.value)
                }}
              />
            </AntDForm.Item>
            <AntDForm.Item className='postBtnBlock'>
              <Button disabled={isActive != true} className='postBtnBlock' htmlType='submit'>
                Добавить
              </Button>
            </AntDForm.Item>
          </AntDForm>
        </div>
        <div>{postsElements}</div>
      </div>
    </div>
  )
}

export const MyPostsComponent = MyPosts
