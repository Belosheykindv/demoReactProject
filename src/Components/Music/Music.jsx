import React from "react";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";

const Music = (props) => {

    if (props.auth === false) return <Navigate to={'/login'} />
    return <div>
        <Song songName='Serega pirat 1' />
        <Song songName='Serega pirat 2' />
    </div>

}
let MusicContainer = withAuthRedirect(Music)
const Song = (props) => {
    return <div>
        <span>{props.songName}</span>
    </div>

}

export default MusicContainer;
