import React from "react"
import loadingGif from '../../../Images/loading.gif';
import p from './preloader.module.css'
import { Flex, Spin } from "antd";
let Preloader = (props) => {
    return <Flex align="center" gap="middle">
        <Spin size="large" />
    </Flex>
    // <div className={p.preloader}>
    //     <img src={loadingGif} />
    // </div>
}
export default Preloader;