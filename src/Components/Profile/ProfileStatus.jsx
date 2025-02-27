
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileStatus, updateUserProfileStatus } from "../../Redux/profilePage-reducer";
import { connect } from "react-redux";
// class ProfileStatus extends React.Component {
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
//     activateEditMode = () => {
//         if (!this.props.userId) {
//             this.setState({
//                 editMode: true
//             })
//         }
//     }
//     deActivateEditMode = () => {
//         this.setState({
//             editMode: false
//         });
//         this.props.updateUserProfileStatus(this.state.status)
//     }
//     onStatusChange = (e) => {
//         this.setState({
//             status: e.currentTarget.value
//         })
//         console.log(this.state.status)
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.status !== this.props.status) {
//             this.setState({
//                 status: this.props.status
//             })
//         }
//     }
//     render() {
//         return (
//             <div>
//                 {!this.state.editMode &&
//                     <div>
//                         <span onClick={this.activateEditMode}><b>Статус -</b> {this.props.status || 'пусто'}</span>
//                     </div>}
//                 {this.state.editMode &&
//                     <div>
//                         <input
//                             onChange={this.onStatusChange}
//                             autoFocus={true}
//                             defaultValue={this.state.status}></input>
//                         <button onClick={this.deActivateEditMode}>Сохранить</button>
//                     </div>}
//             </div>

//         )
//     }
// }

const ProfileFuncStatus = (props) => {
    // console.log('Рэндер статус')
    const userStatus = useSelector(state => state.profilePage.profileStatus)
    // const userId = useSelector(state => state.auth.id)
    const userId = useParams()
    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(userStatus)
    const dispatch = useDispatch()
    const activateEditMode = () => {
        console.log('Эдит мод')
        if (!userId.userId) {
            setEditMode(true)
        }
    }
    const deActivateEditMode = () => {
        console.log('Эдит мод2')
        setEditMode(false)
        dispatch(updateUserProfileStatus(status))
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }
    // useEffect(() => { setStatus(props.status) }, [props.status])
    return <div>
        {!editMode &&
            <div>
                <span
                    onClick={activateEditMode}
                ><b>Статус - </b>{userStatus || 'пусто'}</span>
            </div>
        }
        {
            editMode &&
            <div >
                <input
                    onChange={onStatusChange}
                    autoFocus={true}
                    defaultValue={userStatus}></input>
                <button onClick={deActivateEditMode}>Сохранить</button>
            </div>
        }
    </div >
}
export default ProfileFuncStatus;