/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense, useEffect, useState } from 'react'
import { connect, Provider } from 'react-redux'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import { compose } from 'redux'

import { PreloaderComponent } from '../Components/Common/Preloader/preloader'
import { HookFormComponent } from '../Components/HookFrom/hookForm'
import { LoginComponent } from '../Components/Login/login'
import { LoginRFFComponent } from '../Components/Login/loginRFF'
import { MusicComponent } from '../Components/Music/Music'
import { SettingsComponent } from '../Components/Settings/Settings'
// @ts-expect-error Settings is a JavaScript component without a declaration file.
import { TodoComponent } from '../Components/ToDO/todo'
import { withRouter } from '../Hoc/withRouter'
import { initializedApp } from '../Redux/appReducer'
import { logout } from '../Redux/authReducer'
import store from '../Redux/reduxStore'
import { Footer } from 'antd/es/layout/layout'

import './app.scss'

const { Header, Sider, Content } = Layout
// @ts-expect-error Settings is a JavaScript component without a declaration file.
const ProfileContainer = React.lazy(() => import('../Components/Profile/profileContainer').then((module) => ({ default: module.ProfileContainerComponent })))
// @ts-expect-error Settings is a JavaScript component without a declaration file.
const DialogsContainer = React.lazy(() => import('../Components/Dialogs/Dialogs-container').then((module) => ({ default: module.DialogsContainerComponent })))
// @ts-expect-error Settings is a JavaScript component without a declaration file.
const UsersContainer = React.lazy(() => import('../Components/Users/usersContainer').then((module) => ({ default: module.UsersContainerComponent })))
const ChatPage = React.lazy(() => import('../Pages/Chat/chatPage').then((module) => ({ default: module.ChatPageComponent })))

const App = (props: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  useEffect(() => {
    props.initializedApp()
  }, [])
  if (!props.store.app.initialize) {
    return <PreloaderComponent />
  } else
    return (
      <Layout className={`${collapsed ? 'app-wrapper-on' : 'app-wrapper-off'}`}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <NavLink to='/profile'>Профиль</NavLink>,
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: <NavLink to='/dialogs'>Сообщения</NavLink>,
              },
              {
                key: '3',
                icon: <UserOutlined />,
                label: <NavLink to='/hookForm'>Hook Form + RTK</NavLink>,
              },
              {
                key: '4',
                icon: <UserOutlined />,
                label: <NavLink to='/ToDO'>Список дел</NavLink>,
              },
              {
                key: '5',
                icon: <UserOutlined />,
                label: <NavLink to='/chat'>Чат (ws)</NavLink>,
              },
              {
                key: '6',
                icon: <UserOutlined />,
                label: <NavLink to='/music'>Музыка</NavLink>,
              },
              {
                key: '7',
                icon: <UserOutlined />,
                label: <NavLink to='/settings'>Пиво</NavLink>,
              },
              {
                key: '8',
                icon: <UserOutlined />,
                label: <NavLink to='/users'>Пользователи</NavLink>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            id='header'
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            {props.isAuth ? (
              <span>
                {props.store.auth.login} <button onClick={props.logout}>Log out</button>
              </span>
            ) : (
              <NavLink to='/login'>Логин</NavLink>
            )}
          </Header>
          <Content
            id='content'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/profile' element={<ProfileContainer />}>
                <Route path=':userId' element={<ProfileContainer />} />
              </Route>
              <Route path='chat' element={<ChatPage />} />
              <Route path='/music' element={<MusicComponent />} />
              <Route path='/settings' element={<SettingsComponent />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/todo' element={<TodoComponent />} />
              <Route path='/login' element={<LoginRFFComponent />} />
              <Route path='/login2' element={<LoginComponent />} />
              <Route path='/hookForm' element={<HookFormComponent />} />
              <Route path='/' element={<LoginRFFComponent />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', fontSize: 30 }}>
            Частная компания - OOO &quot;Сошл - нетворк&quot;
          </Footer>
        </Layout>
      </Layout>
    )
}

const mapStateToProps = (state: any) => ({
  initialize: state.app.initialize,
  ownerId: state.auth.id,
  isAuth: state.auth.isAuth,
})

const AppContainer = compose(withRouter, connect(mapStateToProps, { initializedApp, logout }))(App)

export const SamuraiJSAPP = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={<PreloaderComponent />}>
          <AppContainer store={store.getState()} dispatch={store.dispatch.bind(store)} />
        </Suspense>
      </HashRouter>
    </Provider>
  )
}
