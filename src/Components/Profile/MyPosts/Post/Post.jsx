import React, { createRef } from 'react';
import P from './Post.module.scss';
import { addPostLikeActionCreator } from '../../../../Redux/profilePage-reducer';
import { Button } from 'antd';
const Post = React.memo((props) => {
  let onAddLike = () => {
    let postId = props.postId
    props.addLike(postId)
  }
  return <div key={props.postId} className={P.item}>
    <div className={P.post}>
      <img className={P.img} src={props.img}></img>
      <span className={P.message}>&nbsp; {props.message}</span>
    </div>
    <div>
      <Button onClick={onAddLike} type={'primary'}><span>Лайк</span></Button> {props.likesCount}
      <Button type={'primary'}>Репост</Button><span>{props.share}</span>
    </div>
  </div>


})
export default Post;