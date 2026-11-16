import type { User } from 'types/components'

import { NavLink } from 'react-router-dom'
import { Pagination, theme } from 'antd'

import { followAPI } from '@src/Api/apiRequest'
import userPhoto from '@src/Images/userPhoto.png'

import './users.scss'

type UsersProps = {
  users: User[]
  pageSize: number
  totalUsersCount: number
  currentPage: number
  onPageChanged: (page: number) => void
  followingInProgress: number[]
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  togglefollowingProgress: (isFollowing: boolean, userId: number) => void
}

const Users = (props: UsersProps): JSX.Element => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const onChange = (page: number) => {
    props.onPageChanged(page)
  }
  return (
    <div>
      <div>
        <Pagination
          showSizeChanger={false}
          showQuickJumper
          onChange={onChange}
          defaultPageSize={props.pageSize}
          defaultCurrent={1}
          total={props.totalUsersCount}
          showTotal={(total) => `${total} users`}
        />
      </div>
      {props.users.map((u) => (
        <div
          style={{
            margin: '12px 8px',
            padding: 12,
            // minHeight: 'auto',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          key={u.id}
        >
          {' '}
          <hr />
          <span>
            <div className='usersItem'>
              <div>
                <NavLink to={'/profile/' + u.id}>
                  <img src={u.photos.small != null ? u.photos.small : userPhoto} alt={u.name} />
                </NavLink>
              </div>
              <div>
                <span>
                  Имя - <b>{u.name}</b>
                </span>{' '}
                <br />
                {/* <span>ID - {u.id} </span><br /> */}
                <span> Статус - {u.status || 'отсутствует'}</span>
              </div>
            </div>
            <div className='usersButton'>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.togglefollowingProgress(true, u.id)
                    followAPI.delete(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(u.id)
                      }
                      props.togglefollowingProgress(false, u.id)
                    })
                  }}
                >
                  Отписаться
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.togglefollowingProgress(true, u.id)
                    followAPI.post(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(u.id)
                      }
                      props.togglefollowingProgress(false, u.id)
                    })
                  }}
                >
                  Подписаться
                </button>
              )}
            </div>
          </span>
          <span></span>
        </div>
      ))}
    </div>
  )
}

export const UsersComponent = Users
