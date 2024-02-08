import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import useSound from "use-sound"; //для работы со звуком
// import tracks from "./tracks";
import AudioControls from "./AudioControls";
import './Music.css'
import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork.jpg";
import imgSrc3 from "./assets/artwork3.jpg";
import song from './assets/Music/LXST CXNTURY-OSAKA.mp3'
function importAll(r) {
    return r.keys().map(r);
}
const importedSongs = importAll(require.context('../../Music', false, /\.(mp3)$/));
const listOfsongs = importedSongs.map(s => s.replace(/.*\//, '').replace(/\..*3/, ''))
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsmediatags/3.9.5/jsmediatags.min.js";
script.async = true;
document.body.appendChild(script);

const Test = () => {
    const jsmediatags = window.jsmediatags;
    const onLoad = (e) => {

        jsmediatags.read(e.target.files[0], {
            onSuccess: function (tag) {
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String = '';
                for (let i = 0; i < data.length; i++)
                    base64String += String.fromCharCode(data[i])
                document.querySelector('#songImg').style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                document.querySelector('#title').textContent = tag.tags.title
                document.querySelector('#artist').textContent = tag.tags.artist
                console.log(tag)
                console.log(importedSongs)
            },
            onError: function (error) {
                // handle error
                console.log(error);
            }
        });

    }

    return <div>
        <input type="file" name="" id="inputMP3" accept=".mp3" onChange={onLoad} />
        <div id='songImg'> </div>
        <p id='title'></p>
        <p id="artist"></p>

    </div>
}
let tracks = [
    {
        title: "OSAKA",
        artist: "LXST CXNTURY",
        audioSrc: importedSongs[2],
        image: imgSrc,
        color: "#00aeb0"
    },
    {
        title: "Canon in D",
        artist: "Pachalbel",
        audioSrc: importedSongs[6],
        image: imgSrc2,
        color: "#ffb77a"
    },
    {
        title: "ANDROMEDA",
        artist: "LXST CXNTURY",
        audioSrc: importedSongs[1],
        image: imgSrc3,
        color: "#5f9fff"
    }

]
const Music = (props) => {

    const [trackIndex, setTrackIndex] = useState(0);
    const [seconds, setSeconds] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const { title, artist, color, image, audioSrc } = tracks[trackIndex]
    const [play, { pause, stop, duration, sound }] = useSound(audioSrc);

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);

        }
    };


    const toNextTrack = () => {
        setIsPlaying(false)
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    const playingButton = () => {
        setIsPlaying(false)
        if (isPlaying) {
            pause(); // приостанавливаем воспроизведение звука
            setIsPlaying(false);
        } else {
            if (sound) {
                play(); // воспроизводим аудиозапись
                setIsPlaying(true);
            }

        }
    };


    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
    });
    const sec = duration / 1000;
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    const time = {
        min: min,
        sec: secRemain
    }

    useEffect(() => {
        // setSoundEnabled(true)

        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]) || ''); // устанавливаем состояние с текущим значением в секундах
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);
        return (
            () => {
                clearInterval(interval)
                stop()
                console.log('UNMOUNTED')
            }
        )
    }, [sound]);

    const jsmediatags = window.jsmediatags;

    const testing = () => {
        jsmediatags.read('', {
            onSuccess: function (tag) {
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String = '';
                for (let i = 0; i < data.length; i++)
                    base64String += String.fromCharCode(data[i])
                document.querySelector('#songImg').style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                document.querySelector('#title').textContent = tag.tags.title
                document.querySelector('#artist').textContent = tag.tags.artist
                console.log(tag)
                console.log(importedSongs)
            },
            onError: function (error) {
                // handle error
                console.log(error);
            }
        })
    };
    const onLoad = (e) => {
        jsmediatags.read(e.target.files[0], {
            onSuccess: function (tag) {
                const data = tag.tags.picture.data;
                const format = tag.tags.picture.format;
                let base64String = '';
                for (let i = 0; i < data.length; i++)
                    base64String += String.fromCharCode(data[i])
                document.querySelector('#songImg').style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`
                document.querySelector('#title').textContent = tag.tags.title
                document.querySelector('#artist').textContent = tag.tags.artist
                console.log(tag)
            },
            onError: function (error) {
                // handle error
                console.log(error);
            }
        });

    }
    if (props.auth === false) return <Navigate to={'/login'} />
    return (<div className="mainContainer">
        <div
            className={`audio-player ${isPlaying ? "playing" : "idle"}`}
            style={{ background: `linear-gradient(45deg, ${color} 20%, transparent 100%)` }}
        >
            <div className="track-info">
                <img
                    className="artwork"
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="title">{title}</h2>
                <h3 className="artist">{artist}</h3>

                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={playingButton}
                />
                <div className='times'>
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>
                <input
                    type="range"
                    value={seconds || 0}
                    step="1"
                    min="0"
                    default="0"
                    max={duration / 1000}
                    className="progress"
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
        </div>
        <div className="liftOfSongs"></div>
        {/* <div>{tracks.map(e => <p>{e.artist} - {e.title}</p>)}</div> */}
        <div>
            <input type="file" name="" id="inputMP3" accept=".mp3" onChange={onLoad} />
            <div id='songImg'> </div>
            <p id='title'></p>
            <p id="artist"></p>

        </div>
    </div >
    );
}
let MusicContainer = withAuthRedirect(Music)
// const Music = (props) => {
//     // let listOfsongs = importedSongs.map(s => s.replace(/.*\//, '').replace(/\..*3/, '')).map(s => <Player nameOfSong={s} key={s} {'../Music/' + s + '.mp3'} />)
//     // {props.nameOfSong.replace(/.*\//, '').replace(/\..*3/, '').replace(/-.*/, '')} вырезал из компонента players 2, это название песни
//     // const listOfsongs = importedSongs.map(s => <Player2
//     //     songPath={s}
//     //     nameOfSong={s}
//     //     key={s} />)
//     if (props.auth === false) return <Navigate to={'/login'} />
//     return <div 
//     className={`mainContainer ${isPlaying ? "playing" : "idle"}`}
//     >
//         <Player2
//             songPath={importedSongs}
//             nameOfSong={importedSongs[0]}
//             />

//     </div>
// }

export default MusicContainer;
