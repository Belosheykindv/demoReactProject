import React, { useState, useEffect } from 'react';
import P from './MyPosts.module.css';
import Post from './Post/Post';
import { Button, Input, Form as AntDForm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost} from '../../../Redux/profilePage-reducer';
// const maxLength60 = maxLengthCreator(60);

const MyPosts = (props) => {
  const [isActive, setIsActive] = useState(false)
  const [form] = AntDForm.useForm();
  const dispath = useDispatch();
  const onFinish = (values) => {
    dispath(addPost(values.postInput));
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
  let postsElements = state.posts.map((p) => <Post postId={p.id} message={p.message} likesCount={p.likesCount} share={p.share} img={p.imgSrc} key={p.id} />);
  let userId = Number(props.router.params.userId || props.ownerUserId);
  const addPostInput = document.getElementById('addNewPost')
  if (userId) {
    return null
  }
  return <div className={P.profile}>
    <div className={P.MyPostsClass}>
      <h3>Мои посты (Хардкод Без API)</h3>
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