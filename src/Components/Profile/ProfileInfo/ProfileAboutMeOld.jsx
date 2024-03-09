import React, { useState } from 'react';
import S from './ProfileInfo.module.css'
import styles from "../../Common/FormControls/formControls.module.css"
import { maxLengthCreator, required } from '../../../Utils/Validators/validators';
import { Form } from 'react-final-form';
import { Field } from 'react-final-form';
import { FormCreate, Input, createField } from '../../Common/FormControls/formControls';
import { FORM_ERROR } from 'final-form'
const maxLength14 = maxLengthCreator(14)
const maxLength30 = maxLengthCreator(30)

const Contact = ({ contactTitle, contactValue }) => {
  return <div> <b>{contactTitle}</b>: {contactValue} </div>
}
const ProfileForm = ({ updateAboutMe, profile, editModeOff, error }) => {
  const onSubmit = async (values) => {
    await updateAboutMe(values)
    editModeOff()
  }
  return <div>
    <Form
      onSubmit={onSubmit}
      initialValues={profile}
      render={({ handleSubmit, form, submitError }) => (

        <form onSubmit={handleSubmit}>
          {console.log('ОШИБКА SUBmIT - ', submitError)}
          <div> Кто я <Field
            name={'fullName'}
            component={FormCreate}
            validate={(required, maxLength14)}
            fieldType={'input'} />
          </div>
          <div> В поисках работы - <Field
            name={'lookingForAJob'}
            component={FormCreate}
            type={'checkbox'}
            fieldType={'input'} />
          </div>
          <div> Место работы - <Field
            name={'lookingForAJobDescription'}
            validate={(required, maxLength14)}
            component={FormCreate}
            fieldType={'input'} />
          </div>
          <div> Обо мне -  <Field
            name={'aboutMe'}
            component={FormCreate}
            validate={(required, maxLength30)}
            fieldType={'input'} />
          </div>
          <div> <b>Контакты: </b>{Object.keys(profile.contacts).map((key) => {
            return <div key={key} className={S.contact}> {key}
              <Field
                name={'contacts.' + key}
                component={FormCreate}
                fieldType={'input'}
                placeholder={'Введите ваш - ' + key}
              />  </div>
          })}</div>
          {error && <div className={styles.formSummaryError}> {error},{console.log('ОШИБКА - ', error)} </div>}
          {submitError && <div className={styles.formSummaryError}> {submitError},{console.log('ОШИБКА - ', error)} </div>}
          <button>Сохранить</button>
        </form>)}
    />
  </div>

}
const Profile = ({ profile, userId, editModeOn }) => {
  return <div>
    <div><b>Кто я - </b>{profile.fullName}</div>
    <div><b>Обо мне - </b> {profile.aboutMe}</div>
    <div><b>В поисках работы - </b>{profile.lookingForAJob ? "Да" : "Нет"}</div>
    <div><b>Место работы - </b>{profile.lookingForAJobDescription}</div>
    <div><b>Контакты: </b>{Object.keys(profile.contacts).map((contactTitle) => {
      return <div className={S.contact} key={contactTitle}><Contact contactTitle={contactTitle} contactValue={profile.contacts[contactTitle] || 'Отсутствует'} /> </div>
    })}</div>
    {!userId && <button onClick={editModeOn}>Редактировать</button>}
  </div>

}
export const ProfileAboutMe = ({ profile, ownerId, updateAboutMe, userId, key }) => {
  const [editMode, setEditMode] = useState(false);
  return <div>
    {!editMode ? <Profile key={key} profile={profile} userId={userId} editModeOn={() => { setEditMode(true) }} />
      : <ProfileForm key={key} profile={profile} updateAboutMe={updateAboutMe} editModeOff={() => { setEditMode(false) }} />}
  </div>
}