import type { IRootStore } from '@redux/reduxStore'

import { connect } from 'react-redux'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import { compose } from 'redux'

import { DialogsComponent } from '@components/Dialogs/DialogsC'

const mapStateToProps = (state: ReturnType<IRootStore>) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

export const DialogsContainerComponent = compose(
  connect(mapStateToProps, {}),
  withAuthRedirect,
)(DialogsComponent)
