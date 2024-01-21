import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToProps = (state) => ({
    auth: state.auth.isAuth
})
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.auth) return <Navigate to={'/login'} />
            return (
                <Component {...this.props} />
            )
        }
    }
    let connectedRedirectComponent = connect(mapStateToProps)(RedirectComponent);
    return connectedRedirectComponent;
}