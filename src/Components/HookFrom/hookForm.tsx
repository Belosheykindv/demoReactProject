import React, { FC, useEffect, useState } from "react";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { Istate, setFirstName, setSubmitData } from "../../Redux/hookFormReducer";
import { useForm, Controller, SubmitHandler, FieldValues } from "react-hook-form";
import { Button, Input } from "antd";
import S from './hookForm.module.css'
import { IRootStore } from "../../Redux/reduxStore";

const HookForm = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Istate>({ mode: "onChange" })
    const aboutInfo = useSelector((store: IRootStore) => store.hookForm)
    const dispatch = useDispatch()
    const onSubmit: SubmitHandler<Istate> = (data: Istate) => {
        dispatch(setSubmitData(data))
        reset()
    }
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className={S.inputBlock}>
                    <div className={S.elem}>
                        <div className={S.elemFieldName}>
                            Имя
                        </div>
                        <div className={S.elemField}>
                            <div className={S.errorField}>
                                {errors.firstName?.type === "pattern" && (
                                    <p role="alert"> (Без цифр пожалуйста)</p>
                                )}
                                {errors.firstName?.type === "maxLength" && (
                                    <p role="alert">Не больше 20-и символов</p>
                                )}
                            </div>
                            <div>
                                <Controller
                                    name="firstName"
                                    rules={{ required: true, pattern: /^[A-Za-zА-Яа-я]+$/i, maxLength: 20 }}
                                    control={control}
                                    aria-invalid={errors.firstName ? "true" : "false"}
                                    defaultValue={''}
                                    render={({ field }) => <Input placeholder="Введите данные"  {...field} />
                                    } />
                            </div>

                        </div>
                        <div className={S.elemOutput}>
                            {aboutInfo.firstName}
                        </div>
                    </div>
                    <div className={S.elem}>
                        <div className={S.elemFieldName}>
                            Фамилия

                        </div>
                        <div className={S.elemField}>
                            <div className={S.errorField}>{errors.lastName?.type === "required" && (
                                <p role="alert">(Введите фамилию)</p>
                            )}
                                {errors.lastName?.type === "pattern" && (
                                    <p role="alert">(Без цифр пожалуйста)</p>
                                )}
                                {errors.lastName?.type === "maxLength" && (
                                    <p role="alert">(Не больше 20-и символов)</p>
                                )}</div>
                            <div><Controller
                                name="lastName"
                                rules={{ required: true, pattern: /^[A-Za-zА-Яа-я]+$/i, maxLength: 20 }}
                                aria-invalid={errors.lastName ? "true" : "false"}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input placeholder="Введите данные"  {...field} />}
                            /></div>

                        </div>
                        <div className={S.elemOutput}>
                            {aboutInfo.lastName}
                        </div>
                    </div>
                    <div className={S.elem}>
                        <div className={S.elemFieldName}>
                            Адресс
                        </div>
                        <div className={S.elemField}>
                            <div className={S.errorField}>  {errors.adress?.type === "required" && (
                                <p role="alert">(Введите адрес)</p>
                            )}
                                {errors.adress?.type === "maxLength" && (
                                    <p role="alert">(Не больше 40-и символов)</p>
                                )}</div>
                            <div><Controller
                                name="adress"
                                rules={{ required: true, maxLength: 40 }}
                                aria-invalid={errors.adress ? "true" : "false"}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <Input placeholder="Введите данные"  {...field} />} />
                            </div></div>

                        <div className={S.elemOutput}>
                            {aboutInfo.adress}
                        </div>
                    </div>
                    <div className={S.elem}>
                        <div className={S.elemFieldName}>
                            Возраст

                        </div>
                        <div className={S.elemField}>
                            <div className={S.errorField}>{errors.age?.type === "required" && (
                                <p role="alert">(Введите возраст)</p>
                            )}
                                {errors.age?.type === "maxLength" && (
                                    <p role="alert">(Неужели тебе больше 100 лет?)</p>
                                )}
                                {errors.age?.type === "pattern" && (
                                    <p role="alert">(Внимание, только цифры)</p>
                                )}
                                {errors.age?.type === "min" && (
                                    <p role="alert">(Только старше 18-и)</p>
                                )}</div>
                            <div> <Controller
                                name="age"
                                rules={{ required: true, maxLength: 2, min: 18, pattern: /[0-9][0-9]/i }}
                                aria-invalid={errors.age ? "true" : "false"}
                                control={control}
                                // defaultValue=""
                                render={({ field }) => <Input placeholder="Введите данные" {...field} />} />
                            </div></div>
                        <div className={S.elemOutput} >
                            {aboutInfo.age}
                        </div>
                    </div>
                    <div className={S.submitInput}><Button type="primary" htmlType='submit' style={{ width: '120px' }} >Принять</Button></div>
                </div>
               
            </form>
            <div>
                Вывод данных из Store
                {<pre>
                    {JSON.stringify(aboutInfo, null, 2)}
                </pre>}
            </div>
        </div>
    )
}
export default compose(
    withAuthRedirect
)(HookForm);