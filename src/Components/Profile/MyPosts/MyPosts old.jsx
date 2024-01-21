import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import P from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../Utils/Validators/validators';
import { FormCreate, TextArea } from '../../Common/FormControls/formControls';
import { Button } from "antd";

const MyPosts = (props) => {
  let state = (props.profilePage)
  let postsElements = state.posts.map((p) => <Post postId={p.id} message={p.message} likesCount={p.likesCount} share={p.share} img={p.imgSrc} addLike={props.addLike} key={p.id} />);
  let userId = Number(props.router.params.userId || props.ownerUserId);
  let onAddPost = (values) => {
    props.addPost(values.addNewPost);
  }
  if (userId) {
    return null
  }
  return <div className={P.profile}>
    <div className={P.MyPostsClass}>
      <h3>Мои посты</h3>
      <div>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        {postsElements}
      </div>
    </div>
  </div>
}
const maxLength30 = maxLengthCreator(30);
const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field component={FormCreate} fieldType='textarea' placeholder='Введите сообщение' name={'addNewPost'} validate={[required, maxLength30]} />
      <div><button>Добавить пост</button></div>
    </form>
  )
}
const AddNewPostFormRedux = reduxForm({ form: 'profileAddMessageForm' })(AddNewPostForm)
export default MyPosts;