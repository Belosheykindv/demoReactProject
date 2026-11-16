import type { PostViewProps } from 'types/profile'

import React from 'react'
import { useDispatch } from 'react-redux'
import { addLike, deletePost } from '@redux/profilePage-reducer'
import { Button } from 'antd'

import './Post.scss'

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
    <div key={props.postId} className='postContainer'>
      <div className='imgContainer'>
        {' '}
        <img src={props.img}></img>
      </div>
      <div className='msgContainer'>{props.message}</div>
      <div className='btnContainer'>
        <div className='delBtn'>
          <Button onClick={onDeletePost} type={'default'} ghost={true}>
            ❌
          </Button>
        </div>
        <div className='btnBlock1'>
          <div className='likeBtn'>
            <Button size={'small'} onClick={onAddLike} type={'default'}>
              {props.likesCount}❤️
            </Button>{' '}
          </div>
          <div className='shareBtn'>
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
