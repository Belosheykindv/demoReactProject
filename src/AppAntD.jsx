import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './Redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import { Suspense } from 'react';
// import Header from './Components/Header/header';
import { NavLink } from 'react-router-dom';
import { logout } from './Redux/authReducer'
// import ProfileContainer from './Components/Profile/profileContainer';
import { Route, Routes } from 'react-router-dom';
import BeerComp from './Components/Settings/Settings';
// import DialogsContainer from './Components/Dialogs/Dialogs-container';
// import UsersContainer from './Components/Users/usersContainer';
import MusicContainer from './Components/Music/Music';
import Login from './Components/Login/login';
import Login2 from './Components/Login/loginRFF'
import ToDO from './Components/ToDO/todo'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from './Hoc/withRouter';
import { initializedApp } from './Redux/appReducer';
import Preloader from './Components/Common/Preloader/preloader';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import HookForm from './Components/HookFrom/hookForm';

// import { ChatPage } from './Pages/Chat/chatPage';

const { Header, Sider, Content } = Layout;
const ProfileContainer = React.lazy(() => import('./Components/Profile/profileContainer'));
const DialogsContainer = React.lazy(() => import('./Components/Dialogs/Dialogs-container'));
const UsersContainer = React.lazy(() => import('./Components/Users/usersContainer'));
const ChatPage = React.lazy(() => import('./Pages/Chat/chatPage'))
// const MusicContainer = React.lazy(() => import('./Components/Music/Music'))

const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  useEffect(() => {
    props.initializedApp();
  }, [])
  if (!props.store.app.initialize) {
    return <Preloader />
  } else
    return (
      <Layout
        className={`${collapsed ? 'app-wrapper-on' : 'app-wrapper-off'}`}
      >
        <Sider trigger={null} collapsible collapsed={collapsed}
        >
          <Menu
            theme="dark"
            mode="inline"
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
              }
            ]} />
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
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            {props.isAuth
              ? <span>{props.store.auth.login} <button onClick={props.logout}>Log out</button></span>
              : <NavLink to='/login'>Логин</NavLink>}

          </Header >
          <Content
            id='content'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >

            <Routes>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId"
                  element={<ProfileContainer />} />
              </Route>
              <Route path='chat' element={<ChatPage />} />
              <Route path='/music' element={<MusicContainer />} />
              <Route path='/settings' element={<BeerComp />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/todo' element={<ToDO />} />
              <Route path='/login' element={<Login2 />} />
              <Route path='/login2' element={<Login />} />
              <Route path='/hookForm' element={<HookForm />} />
              <Route path='/' element={<Login2 />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', fontSize: 30 }}>
            Частная компания - OOO "Сошл - нетворк"
          </Footer>
        </Layout>

      </Layout >
    );

}
const mapStateToProps = (state) => ({
  initialize: state.app.initialize,
  ownerId: state.auth.id,
  isAuth: state.auth.isAuth
})
let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializedApp, logout }))(App);
const SamuraiJSAPP = (props) => {
  return <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<Preloader />}>
        <AppContainer
          store={store.getState()}
          dispatch={store.dispatch.bind(store)} />
      </Suspense>
    </HashRouter>
  </Provider>
}
export default SamuraiJSAPP