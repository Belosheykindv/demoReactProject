import { connect } from 'react-redux'
import Navbar from './Navbar'

import { logout } from '../../Redux/authReducer'

class NavbarContainer extends React.Component {
  render() {
    return <Navbar {...this.props} />
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  users: state.profilePage.users,
})

export default connect(mapStateToProps, { logout })(NavbarContainer)
