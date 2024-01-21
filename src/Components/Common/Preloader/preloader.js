import React from "react"
import loadingGif from '../../../Images/loading.gif';
import p from './preloader.module.css'
let Preloader = (props) => {
    return <div className={p.preloader}>
        <img src={loadingGif} />
    </div>
}
export default Preloader;