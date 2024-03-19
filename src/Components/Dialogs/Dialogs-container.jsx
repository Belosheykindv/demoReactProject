
import { connect } from "react-redux";
import Dialogs from "./DialogsC";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}


export default compose(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(Dialogs);