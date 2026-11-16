import React, { createRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'

import { addLike, deletePost } from '../../../../Redux/profilePage-reducer'

import P from './Post.module.scss'

const Post = React.memo((props) => {
  const dispatch = useDispatch()
  let onAddLike = () => {
    let postId = props.postId
    dispatch(addLike(postId))
  }
  const onDeletePost = () => {
    let postId = props.postId
    dispatch(deletePost(postId))
  }
  return (
    <div key={props.postId} className={P.postContainer}>
      <div className={P.imgContainer}>
        {' '}
        <img src={props.img}></img>
      </div>
      <div className={P.msgContainer}>{props.message}</div>
      <div className={P.btnContainer}>
        <div className={P.delBtn}>
          <Button onClick={onDeletePost} type={'default'} ghost={true}>
            ❌
          </Button>
        </div>
        <div className={P.btnBlock1}>
          <div className={P.likeBtn}>
            <Button size={'small'} onClick={onAddLike} type={'default'}>
              {props.likesCount}❤️
            </Button>{' '}
          </div>
          <div className={P.shareBtn}>
            <Button size={'small'} type={'default'}>
              {props.share}✉
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
})
export const PostComponent = Post
