import React, { createRef } from 'react';
import P from './Post.module.scss';
import { addPostLikeActionCreator } from '../../../../Redux/profilePage-reducer';
import { Button } from 'antd';
const Post = React.memo((props) => {
  let onAddLike = () => {
    let postId = props.postId
    props.addLike(postId)
  }
  const onDeletePost = () => {
    let postId = props.postId
    props.deletePost(postId)
  }
  return <div key={props.postId} className={P.postContainer}>
    <div className={P.imgContainer}> <img src={props.img}></img></div>
    <div className={P.msgContainer}>{props.message}</div>
    <div className={P.btnContainer}>
      <div className={P.likeBtn}>{props.likesCount}<Button ghost={true} size={'small'} onClick={onAddLike} type={'default'}>❤️</Button> </div>
      <div className={P.shareBtn}>{props.share}<Button ghost={true} size={'small'} type={'default'}>✉</Button></div>
    </div>
    <div className={P.delBtn}><Button onClick={onDeletePost} type={'default'} ghost={true}>❌</Button></div>
  </div >


})
export default Post;