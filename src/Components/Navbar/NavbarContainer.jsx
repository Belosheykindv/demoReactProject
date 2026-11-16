import { connect } from 'react-redux'
import { NavbarComponent } from './Navbar'

import { logout } from '../../Redux/authReducer'

class NavbarContainer extends React.Component {
  render() {
    return <NavbarComponent {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  users: state.profilePage.users,
})

export const NavbarContainerComponent = connect(mapStateToProps, { logout })(NavbarContainer)
