import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import Player from "../../AudioPlayer/player";
import s from './Music.module.css'

function importAll(r) {
    return r.keys().map(r);
}
const importedSongs = importAll(require.context('../../Music', false, /\.(mp3)$/));

const Music = (props) => {
    // let listOfsongs = importedSongs.map(s => s.replace(/.*\//, '').replace(/\..*3/, '')).map(s => <Player nameOfSong={s} key={s} {'../Music/' + s + '.mp3'} />)
    let listOfsongs = importedSongs.map(s => <Player
        songPath={s}
        nameOfSong={s}
        key={s} />)
    if (props.auth === false) return <Navigate to={'/login'} />
    return <div className={s.mainContainer}>
        {listOfsongs}
    </div>
}

let MusicContainer = withAuthRedirect(Music)

export default MusicContainer;
