import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import { Button } from "antd";
import { getRandomBeer } from '../../Redux/settingPageReducer'
import { compose } from "redux";
import { connect } from "react-redux";
import style from './Settings.module.css'
import anonymBeer from '..//../Images/anonymBeer.png'
import { v1 } from 'uuid'
import './Setting.css';
const BeerComp = (props) => {
    return <div>
        <div className={style.buttonWrapper}><button className={style.button} onClick={() => props.getRandomBeer()} >Получить случайное пиво!</button></div>
        {props.beer.map(u =>
            <div className={style.component} key={u.id}>
                <div><img src={u.image_url || anonymBeer} /></div>
                <div>
                    <ul>Название - {u.name}</ul>
                    <ul>Описание - {u.description}</ul>
                    <ul>В первые сварено - {u.first_brewed}</ul>
                    <ul>Обьём - {u.boil_volume.value} {u.boil_volume.unit} </ul>
                    <ul>Заметки - {u.brewers_tips}</ul>
                    <ul>К каким блюдам подойдёт: <ul>{u.food_pairing.map(e => <li key={v1()} >{e}</li>)} </ul></ul>
                    <ul>Ингредиеты:
                        <ul>Хмель {u.ingredients.hops.map(i =>
                            <li key={v1()}>{i.name}, Вкус - {i.attribute}, Добавить в стадии- {i.add}, кол-во {i.amount.value} Кг</li>)}
                        </ul>
                        <ul>Солод - {u.ingredients.malt.map(m => <li key={v1()}>{m.name}, кол-во - {m.amount.value} Кг</li>)}
                        </ul>
                    </ul>
                    <ul>Методы изготовления:
                        <ul>
                            Ферментация - {u.method.fermentation.temp.value} ℃
                        </ul>
                        <ul>
                            Мэш - {u.method.mash_temp.map(t => <span key={v1()}>Продолжительность - {t.duration || '(неизвестно)'} , температура - {t.temp.value} ℃</span>)}
                        </ul>
                    </ul>
                    <ul>Нюанс - {u.method.twist || '(Отсутствует)'}</ul>
                    <ul>Полезный совет при изготовлении - {u.brewers_tips}</ul>
                </div>
            </div>)}
    </div>
}
// const Settings = (props) => {
//     if (props.auth === false) return <Navigate to={'/login'} />
//     return <div>
//         <SelectedSetting selectedSection='Account settings' />
//         <SelectedSetting selectedSection='Security settings' />
//         <SelectedSetting selectedSection='Other settings' />
//     </div>

// }
// const SelectedSetting = (props) => {
//     return <div>
//         <span>{props.selectedSection}</span>
//     </div>
// }
let mapStateToProps = (state) => {
    return {
        beer: state.settings.beer
    }
}

// let SettingsContainer = withAuthRedirect(Settings);
export default compose(
    connect(mapStateToProps,
        { getRandomBeer }), withAuthRedirect)

    (BeerComp)
// export default SettingsContainer