
import { addDialogMessageActionCreator } from "../../Redux/dialogPage-reducer";
import { connect } from "react-redux";
import Dialogs from "./DialogsC";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDialogMessage: (newMessageBody) => { dispatch(addDialogMessageActionCreator(newMessageBody)) },
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);