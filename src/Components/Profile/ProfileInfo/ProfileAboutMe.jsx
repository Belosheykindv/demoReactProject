import React, { useState } from 'react';
import Preloader from '../../Common/Preloader/preloader';
import S from './ProfileInfo.module.css'
import styles from "../../Common/FormControls/formControls.module.css"
import { maxLengthCreator, required } from '../../../Utils/Validators/validators';
import { Field, reduxForm } from 'redux-form';
import { FormCreate, Input, createField } from '../../Common/FormControls/formControls';
import { updateAboutMe } from '../../../Redux/profilePage-reducer';
import { connect } from 'react-redux';
import ProfileFuncStatus from '../ProfileStatus';

const maxLength14 = maxLengthCreator(14)
const maxLength30 = maxLengthCreator(30)
const maxLength40 = maxLengthCreator(40)

export const ProfileAboutMe = ({ profile, ownerId, updateAboutMe, userId, key, status, updateUserProfileStatus }) => {
  const [editMode, setEditMode] = useState(false);
  return <div>
    {!editMode
      ? <div> <Profile key={key} profile={profile} userId={userId} editModeOn={() => { setEditMode(true) }} status={status} updateUserProfileStatus={updateUserProfileStatus} ownerId={ownerId} /></div>
      : <div><ProfileForm key={key} profile={profile} updateAboutMe={updateAboutMe} editModeOff={() => { setEditMode(false) }} /></div>}
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div> <b>{contactTitle}</b>: {contactValue} </div>
}

const Profile = ({ profile, userId, editModeOn, key, ownerId, status, updateUserProfileStatus }) => {
  return <div>
    {!userId && <label htmlFor="editAboutMe">Редактировать</label>}
    {!userId && <button onClick={editModeOn} id='editAboutMe' style={{ 'opacity': 0 }}>Редактировать</button>}
    <div><ProfileFuncStatus
      key={key}
      userId={userId}
      ownerId={ownerId}
      status={status}
      updateUserProfileStatus={updateUserProfileStatus} /></div>
    <div><b>Кто я - </b>{profile.fullName}</div>
    <div><b>Обо мне - </b> {profile.aboutMe}</div>
    <div><b>В поисках работы - </b>{profile.lookingForAJob ? "Да" : "Нет"}</div>
    <div><b>Место работы - </b>{profile.lookingForAJobDescription}</div>
    <div><b>Контакты: </b>{Object.keys(profile.contacts).map((contactTitle) => {
      return <div key={contactTitle} className={S.contact}><Contact contactTitle={contactTitle} contactValue={profile.contacts[contactTitle] || 'Отсутствует'} /> </div>
    })}</div>

  </div>

}
const ProfileForm = ({ updateAboutMe, profile, editModeOff }) => {

  const onSubmit = (formData) => {
    updateAboutMe(formData).then(() => {
      editModeOff()
    });
  }
  return <ProfileReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile} />
}
const ProfileFormData = ({ handleSubmit, profile, error }) => {
  return <form onSubmit={handleSubmit}>
    <div >
      <div className={S.aboutMeBlock}>
        <div className={S.key}>Кто я
        </div>
        <div className={S.field}>
          <Field name={'fullName'} component={FormCreate} validate={[required, maxLength14]} fieldType={'input'} />
        </div>
      </div>
      <div className={S.aboutMeBlock}>
        <div className={S.key}> Ищу работу - </div>
        <div className={S.field}>
          <Field name={'lookingForAJob'} component={FormCreate} type={'checkbox'} fieldType={'input'} />
        </div>
      </div>
      <div className={S.aboutMeBlock}>
        <div className={S.key}>Место работы -</div>
        <div className={S.field}>
          <Field name={'lookingForAJobDescription'} validate={[required, maxLength14]} component={FormCreate} fieldType={'input'} /></div>
      </div>
      <div className={S.aboutMeBlock}>
        <div className={S.key}> Обо мне - </div>
        <div className={S.field}>
          <Field name={'aboutMe'} component={FormCreate} validate={[required, maxLength30]} fieldType={'input'} /></div>
      </div>
    </div>
    <div >
      <b>Контакты: </b>{Object.keys(profile.contacts).map((key) => {
        return <div key={key} className={S.contact}>
          <div className={S.key}>
            {key}
          </div>
          <div className={S.field}>
            <Field validate={[maxLength40]} name={'contacts.' + key} component={FormCreate} fieldType={'input'} placeholder={'Введите ваш - ' + key} />
          </div>
        </div>
      })}
    </div>
    {error && <div className={styles.formSummaryError}> {error} </div>}
    <button>Сохранить</button>
  </form>
}
const ProfileReduxForm = reduxForm({ form: 'aboutMe', enableReinitialize: true })(ProfileFormData)


