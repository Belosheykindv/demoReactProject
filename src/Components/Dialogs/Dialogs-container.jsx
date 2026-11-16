import { connect } from 'react-redux'
import { DialogsComponent } from './DialogsC'
import { compose } from 'redux'

import { withAuthRedirect } from '../../Hoc/withAuthRedirect'

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export const DialogsContainerComponent = compose(connect(mapStateToProps, {}), withAuthRedirect)(DialogsComponent)
