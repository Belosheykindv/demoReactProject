import { connect } from 'react-redux'
import Dialogs from './DialogsC'
import { compose } from 'redux'

import { withAuthRedirect } from '../../Hoc/withAuthRedirect'

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export default compose(connect(mapStateToProps, {}), withAuthRedirect)(Dialogs)
