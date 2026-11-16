/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from 'react-redux'
import style from './Settings.module.css'
import { compose } from 'redux'
import { v1 } from 'uuid'

import { withAuthRedirect } from '../../Hoc/withAuthRedirect'
import { getRandomBeer } from '../../Redux/settingPageReducer'
import anonymBeer from '../../Images/anonymBeer.png'

import './Setting.css'

const BeerComp = (props: any) => {
  return (
    <div>
      <div className={style.buttonWrapper}>
        <button className={style.button} onClick={() => props.getRandomBeer()}>
          Получить случайное пиво!
        </button>
      </div>
      {!props.beer ? (
        <div>
          {props.beer.map((u: any) => (
            <div className={style.component} key={u.id}>
              <div>
                <img src={u.image_url || anonymBeer} />
              </div>
              <div>
                <ul>Название - {u.name}</ul>
                <ul>Описание - {u.description}</ul>
                <ul>В первые сварено - {u.first_brewed}</ul>
                <ul>
                  Обьём - {u.boil_volume.value} {u.boil_volume.unit}{' '}
                </ul>
                <ul>Заметки - {u.brewers_tips}</ul>
                <ul>
                  К каким блюдам подойдёт:{' '}
                  <ul>
                    {u.food_pairing.map((e: any) => (
                      <li key={v1()}>{e}</li>
                    ))}{' '}
                  </ul>
                </ul>
                <ul>
                  Ингредиеты:
                  <ul>
                    Хмель{' '}
                    {u.ingredients.hops.map((i: any) => (
                      <li key={v1()}>
                        {i.name}, Вкус - {i.attribute}, Добавить в стадии- {i.add}, кол-во{' '}
                        {i.amount.value} Кг
                      </li>
                    ))}
                  </ul>
                  <ul>
                    Солод -{' '}
                    {u.ingredients.malt.map((m: any) => (
                      <li key={v1()}>
                        {m.name}, кол-во - {m.amount.value} Кг
                      </li>
                    ))}
                  </ul>
                </ul>
                <ul>
                  Методы изготовления:
                  <ul>Ферментация - {u.method.fermentation.temp.value} ℃</ul>
                  <ul>
                    Мэш -{' '}
                    {u.method.mash_temp.map((t: any) => (
                      <span key={v1()}>
                        Продолжительность - {t.duration || '(неизвестно)'} , температура -{' '}
                        {t.temp.value} ℃
                      </span>
                    ))}
                  </ul>
                </ul>
                <ul>Нюанс - {u.method.twist || '(Отсутствует)'}</ul>
                <ul>Полезный совет при изготовлении - {u.brewers_tips}</ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div> {props.beer} Увы , Закончилось, автор бесплатного пивного API закрыл лавку</div>
      )}
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    beer: state.settings.beer,
  }
}

export const SettingsComponent = compose(connect(mapStateToProps, { getRandomBeer }), withAuthRedirect)(BeerComp)
