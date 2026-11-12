/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

type RedirectComponentProps = {
  auth: boolean
  [key: string]: any
}

const mapStateToProps = (state: any) => ({
  auth: state.auth.isAuth,
})

export const withAuthRedirect = (Component: any) => {
  class RedirectComponent extends React.Component<RedirectComponentProps> {
    render() {
      if (!this.props.auth) return <Navigate to={'/login'} />
      return <Component {...this.props} />
    }
  }

  const connectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return connectedRedirectComponent
}
