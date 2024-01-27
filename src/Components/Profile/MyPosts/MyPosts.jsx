import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import P from './MyPosts.module.css';
import Post from './Post/Post';
import { Form, Field } from 'react-final-form'
import { maxLengthCreator, required, maxLength22 } from '../../../Utils/Validators/validators';
import { FormCreate, TextArea } from '../../Common/FormControls/formControls';
const maxLength30 = maxLengthCreator(30);

const MyPosts = (props) => {
  let state = (props.profilePage)
  let postsElements = state.posts.map((p) => <Post postId={p.id} message={p.message} likesCount={p.likesCount} share={p.share} img={p.imgSrc} addLike={props.addLike} key={p.id} />);
  let userId = Number(props.router.params.userId || props.ownerUserId);
  let onSubmit = (values) => {
    props.addPost(values.addNewPost);
  }
  if (userId) {
    return null
  }
  return <div className={P.profile}>
    <div className={P.MyPostsClass}>
      <h3>Мои посты</h3>
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name={'addNewPost'}
                component={FormCreate}
                fieldType='textarea'
                validate={(required, maxLength22)}
                placeholder='Введите сообщение'
              />
              <div><button type={'submit'}>Добавить пост</button></div>
            </form>)} />
        {postsElements}
      </div>
    </div>
  </div>
}


export default MyPosts;