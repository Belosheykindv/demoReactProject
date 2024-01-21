import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../Images/userPhoto.png';
import U from './users.module.css'
import { followAPI } from '../../Api/apiRequest';
import { v1 } from 'uuid'

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let curP = props.currentPage;
    let curPF = ((curP - 3) < 0) ? 0 : curP - 3;
    let curPL = curP + 2;
    let slicedPages = pages.slice(curPF, curPL)

    return (<div >
        <div>
            <span onClick={() => { props.onPageChanged(1) }}>Начало</span>
            {slicedPages.map(p => {
                return <span
                    key={v1()}
                    className={props.currentPage === p ? U.selectedPage : undefined}
                    onClick={() => props.onPageChanged(p)}
                >  {p} - </span>
            })}
            <span onClick={() => { props.onPageChanged(pagesCount) }}>Конец</span>
        </div>
        {
            props.users.map(u => <div key={v1()}>
                <span>
                    <div className={U.item}>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}></img>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.togglefollowingProgress(true, u.id)
                                followAPI.delete(u.id).then(data => {
                                    if (data.resultCode === 0) { props.unfollow(u.id) }
                                    props.togglefollowingProgress(false, u.id)
                                })
                            }}>отписаться</button>
                            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                props.togglefollowingProgress(true, u.id)
                                followAPI.post(u.id).then(data => {
                                    if (data.resultCode === 0) { props.follow(u.id) }
                                    props.togglefollowingProgress(false, u.id)
                                })
                            }}>подписаться</button>}
                    </div>
                </span>
                <span>
                    <span><div>АйДи = {u.id}</div> </span>
                    <span> <div>Имя - {u.name}</div> <div>Статус - {u.status || 'отсутствует'}</div></span>
                    <span><div>Город - u.location</div> </span>

                </span>
            </div >)
        }
    </div >)
}

export default Users;