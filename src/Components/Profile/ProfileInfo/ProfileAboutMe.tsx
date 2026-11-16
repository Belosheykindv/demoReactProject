/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormCreate } from '@components/Common/FormControls'

import '@components/Common/FormControls/formControls.scss'

import { ProfileStatusComponent } from '@components/Profile/ProfileStatus'
import { maxLengthCreator, required } from '@utils/Validators/validators'

import './ProfileInfo.scss'
import './ProfileAboutMe.scss'

const maxLength14 = maxLengthCreator(14)
const maxLength30 = maxLengthCreator(30)
const maxLength40 = maxLengthCreator(40)

export const ProfileAboutMe = ({ profile, updateAboutMe, userId, key }: any) => {
  const [editMode, setEditMode] = useState(false)
  return (
    <div>
      {!editMode ? (
        <div>
          {' '}
          <Profile
            key={key}
            profile={profile}
            userId={userId}
            editModeOn={() => {
              setEditMode(true)
            }}
          />
        </div>
      ) : (
        <div>
          <ProfileForm
            key={key}
            profile={profile}
            updateAboutMe={updateAboutMe}
            editModeOff={() => {
              setEditMode(false)
            }}
          />
        </div>
      )}
    </div>
  )
}

const Contact = ({
  contactTitle,
  contactValue,
}: {
  contactTitle: string
  contactValue: string
}) => {
  return (
    <div>
      {' '}
      <b>{contactTitle}</b>: {contactValue}{' '}
    </div>
  )
}

const Profile = ({
  profile,
  userId,
  editModeOn,
}: {
  profile: any
  userId: number
  editModeOn: () => void
}) => {
  return (
    <div>
      {!userId && <label htmlFor='editAboutMe'>Редактировать</label>}
      {!userId && (
        <button onClick={editModeOn} id='editAboutMe' style={{ opacity: 0 }}>
          Редактировать
        </button>
      )}
      <div>
        <ProfileStatusComponent />
      </div>
      <div>
        <b>Кто я - </b>
        {profile.fullName}
      </div>
      <div>
        <b>Обо мне - </b> {profile.aboutMe}
      </div>
      <div>
        <b>В поисках работы - </b>
        {profile.lookingForAJob ? 'Да' : 'Нет'}
      </div>
      <div>
        <b>Место работы - </b>
        {profile.lookingForAJobDescription}
      </div>
      <div>
        <b>Контакты: </b>
        {Object.keys(profile.contacts).map((contactTitle) => {
          return (
            <div key={contactTitle} className='contact'>
              <Contact
                contactTitle={contactTitle}
                contactValue={profile.contacts[contactTitle] || 'Отсутствует'}
              />{' '}
            </div>
          )
        })}
      </div>
    </div>
  )
}
const ProfileForm = ({
  updateAboutMe,
  profile,
  editModeOff,
}: {
  updateAboutMe: (formData: any) => Promise<void>
  profile: any
  editModeOff: () => void
}) => {
  const onSubmit = (formData: any) => {
    updateAboutMe(formData).then(() => {
      editModeOff()
    })
  }
  return <ProfileReduxForm onSubmit={onSubmit} initialValues={profile} profile={profile} />
}
const ProfileFormData = ({
  handleSubmit,
  profile,
  error,
}: {
  handleSubmit: (formData: any) => void
  profile: any
  error: string
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className='aboutMeBlock'>
          <div className='key'>Кто я</div>
          <div className='field'>
            <Field
              name={'fullName'}
              component={FormCreate}
              validate={[required, maxLength14]}
              fieldType={'input'}
            />
          </div>
        </div>
        <div className='aboutMeBlock'>
          <div className='key'> Ищу работу - </div>
          <div className='field'>
            <Field
              name={'lookingForAJob'}
              component={FormCreate}
              type={'checkbox'}
              fieldType={'input'}
            />
          </div>
        </div>
        <div className='aboutMeBlock'>
          <div className='key'>Место работы -</div>
          <div className='field'>
            <Field
              name={'lookingForAJobDescription'}
              validate={[required, maxLength14]}
              component={FormCreate}
              fieldType={'input'}
            />
          </div>
        </div>
        <div className='aboutMeBlock'>
          <div className='key'> Обо мне - </div>
          <div className='field'>
            <Field
              name={'aboutMe'}
              component={FormCreate}
              validate={[required, maxLength30]}
              fieldType={'input'}
            />
          </div>
        </div>
      </div>
      <div>
        <b>Контакты: </b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className='contact'>
              <div className='key'>{key}</div>
              <div className='field'>
                <Field
                  validate={[maxLength40]}
                  name={'contacts.' + key}
                  component={FormCreate}
                  fieldType={'input'}
                  placeholder={'Введите ваш - ' + key}
                />
              </div>
            </div>
          )
        })}
      </div>
      {error && <div className='formSummaryError'> {error} </div>}
      <button>Сохранить</button>
    </form>
  )
}
const ProfileReduxForm = reduxForm<any, { profile: any }>({
  form: 'aboutMe',
  enableReinitialize: true,
})(ProfileFormData)
