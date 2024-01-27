import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../Images/userPhoto.png';
import U from './users.module.css'
import { followAPI } from '../../Api/apiRequest';
import { v1 } from 'uuid'
import { Pagination, theme } from 'antd';
import { hover } from '@testing-library/user-event/dist/hover';
const Users = (props) => {
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const onChange = (page) => {
        props.onPageChanged(page);
    };
    return (<div >
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
        {props.users.map(u => <div
            style={{
                margin: '12px 8px',
                padding: 12,
                // minHeight: 'auto',
                background: colorBgContainer,
                borderRadius: borderRadiusLG
            }}
            key={v1()}> <hr />
            <span>
                <div className={U.item}>
                    <div><NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}></img></NavLink>
                    </div>
                    <div>
                        <span>Имя - <b>{u.name}</b></span> <br />
                        {/* <span>ID - {u.id} </span><br /> */}
                        <span> Статус - {u.status || 'отсутствует'}</span>
                    </div>
                </div>
                <div className={U.button}>
                    {u.followed
                        ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.togglefollowingProgress(true, u.id)
                            followAPI.delete(u.id).then(data => {
                                if (data.resultCode === 0) { props.unfollow(u.id) }
                                props.togglefollowingProgress(false, u.id)
                            })
                        }}>Отписаться</button>
                        : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                            props.togglefollowingProgress(true, u.id)
                            followAPI.post(u.id).then(data => {
                                if (data.resultCode === 0) { props.follow(u.id) }
                                props.togglefollowingProgress(false, u.id)
                            })
                        }}>Подписаться</button>}
                </div>
            </span>
            <span>


            </span>
        </div >)
        }
    </div >)
}

export default Users;