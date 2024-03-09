import reportWebVitals from './reportWebVitals';
// import store from './Redux/State';
import store from './Redux/reduxStore';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSAPP from './AppAntD';

// export function useSelector(){
//     selector(state),
//     equalityFn: (left,right)=> boolean
// }
let rerenderPage = () => {
    ReactDOM.render(
        <React.StrictMode>
            <SamuraiJSAPP />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderPage();
store.subscribe(rerenderPage);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();