import React from 'react'
import ReactDOM from 'react-dom'
import store from '@redux/reduxStore'
import { SamuraiJSAPP } from '@src/app'

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
