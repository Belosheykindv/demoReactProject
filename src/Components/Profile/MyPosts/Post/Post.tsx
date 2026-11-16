import type { PostViewProps } from 'types/profile'

import React from 'react'
import { useDispatch } from 'react-redux'
import { addLike, deletePost } from '@redux/profilePage-reducer'
import { Button } from 'antd'

import P from './Post.module.scss'

const Post = React.memo((props: PostViewProps) => {
  const dispatch = useDispatch()
  const onAddLike = () => {
    const postId = props.postId
    dispatch(addLike(postId))
  }
  const onDeletePost = () => {
    const postId = props.postId
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
