import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';
import P from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form'
import { maxLengthCreator, required, maxLength22 } from '../../../Utils/Validators/validators';
import { FormCreate, NewInput, Textarea } from '../../Common/FormControls/formControls';
import { Button, Input, Form as AntDForm } from 'antd';

// const maxLength60 = maxLengthCreator(60);

const MyPosts = (props) => {
  const [isActive, setIsActive] = useState(false)

  const [form] = AntDForm.useForm();
  
  const onFinish = (values) => {
    props.addPost(values.postInput);
    form.resetFields(['postInput'])
    setIsActive(false)
  };

  const onSubmit = (values) => {
    props.addPost(values.addNewPost);
    values.addNewPost = ''

    setIsActive(false)
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const buttonHandler = (e) => {
    if (e == '') { setIsActive(false) }
    else
      setIsActive(true)
  }
  let state = (props.profilePage)
  let postsElements = state.posts.map((p) => <Post postId={p.id} message={p.message} likesCount={p.likesCount} share={p.share} img={p.imgSrc} addLike={props.addLike} deletePost={props.deletePost} key={p.id} />);
  let userId = Number(props.router.params.userId || props.ownerUserId);
  const addPostInput = document.getElementById('addNewPost')
  if (userId) {
    return null
  }
  return <div className={P.profile}>
    <div className={P.MyPostsClass}>
      <h3>Мои посты (Хардкод Без API)</h3>
      {/* <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className={P.inputBlock}>
              <Field
                onInput={(e) => { buttonHandler(e.currentTarget.value) }}
                // id={'addNewPost'}
                component={FormCreate}
                fieldType={Input}
                placeholder='Введите сообщениеee'
                name={'addNewPost'}
              />
              <Button disabled={isActive != true} htmlType="submit">Добавить</Button>
            </div>
          </form>)} /> */}
      <div >
        <AntDForm className={P.inputBlock} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}  >
          <AntDForm.Item name={"postInput"} className={P.textBlock}>
            <Input name={'postInput'} showCount={true} maxLength={600} placeholder="Введите сообщение" onInput={(e) => { buttonHandler(e.currentTarget.value) }} />
          </AntDForm.Item>
          <AntDForm.Item className={P.btnBlock}>
            <Button disabled={isActive != true} className={P.btnBlock} htmlType="submit">Добавить</Button>
          </AntDForm.Item>
        </AntDForm>
      </div>
      <div>{postsElements}</div>

    </div>
  </div>
}


export default MyPosts;