import React from 'react'
import ReactDOM from 'react-dom'
import { SamuraiJSAPP } from './app'

import store from './Redux/reduxStore'

import './index.css'

const rerenderPage = () => {
  ReactDOM.render(
    <React.StrictMode>
      <SamuraiJSAPP />
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

rerenderPage()
store.subscribe(rerenderPage)
