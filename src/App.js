import React from 'react';
import './App.css';
import Header from './Components/Header/header';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import ProfileContainer from './Components/Profile/profileContainer';
import { Route, Routes } from 'react-router-dom';
import MusicContainer from './Components/Music/Music';
import SettingsContainer from './Components/Settings/Settings';
import DialogsContainer from './Components/Dialogs/Dialogs-container';
// import Users from './Components/Users/Users';
import UsersContainer from './Components/Users/usersContainer';
import Login from './Components/Login/login';
import Login2 from './Components/Login/loginRFF';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from './Hoc/withRouter';
import { initializedApp } from './Redux/appReducer';
import Preloader from './Components/Common/Preloader/preloader';


class App extends Component {

  componentDidMount() {
    this.props.initializedApp();
  }
  render() {
    if (!this.props.initialize) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <Header />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs' element={<DialogsContainer />} />
            <Route path="/profile" element={<ProfileContainer />}>
              <Route path=":userId"
                element={<ProfileContainer />} />
            </Route>
            <Route path='/music' element={<MusicContainer />} />
            <Route path='/settings' element={<SettingsContainer />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/login' element={<Login />} />
            <Route path='/login2' element={<Login2 />} />
          </Routes>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  initialize: state.app.initialize,
  ownerId: state.auth.id
})
export default compose(
  withRouter,
  connect(mapStateToProps, { initializedApp }))(App);
