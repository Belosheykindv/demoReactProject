import React from "react";
import { NavLink } from "react-router-dom";
import s from './DialogItem.module.css';

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return <div className={s.dialogsItems}>
        <img src={props.imgSrc}></img>
        <NavLink to={path} className={navData => navData.isActive ? s.active : s.dialogsItems}>
        <div>{props.name}</div>
        </NavLink>
    </div>
}
export default DialogItem;