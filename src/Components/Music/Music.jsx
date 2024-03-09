import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import useSound from "use-sound"; //для работы со звуком
// import tracks from "./tracks";
import AudioControls from "./AudioControls";
import './Music.css'
import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork2.jpg";
import imgSrc3 from "./assets/andromeda.png";
import imgSrc4 from "./assets/uni1.jpeg";
import imgSrc5 from "./assets/artwork3.jpg";
import imgSrc6 from "./assets/uni2.jpg";
import imgSrc7 from "./assets/blurredStars.png";
import imgSrc8 from "./assets/snow.jpg";
import imgSrc9 from "./assets/uni3.jpeg";
import Preloader from "../Common/Preloader/preloader";
import song0 from './assets/Music/Augustin Garnier - Fallen Down.mp3'
import song1 from './assets/Music/LXST CXNTURY-Andromeda.mp3'
import song2 from './assets/Music/LXST CXNTURY-OSAKA.mp3'
import song3 from './assets/Music/LXST CXNTURY-VIOLENCE.mp3'
import song4 from './assets/Music/Maf1k-Sigma Phonk.mp3'
import song5 from './assets/Music/OXWAVE-BlurredStars.mp3'
import song6 from './assets/Music/Pachalbel - Canon in D.mp3'
import song7 from './assets/Music/Perry Como - Magic Moments.mp3'
import song8 from './assets/Music/VOJ, Narvent - Memory Reboot.mp3'
import song9 from './assets/Music/LXST CXNTURY-Andromeda.mp3'

// function importAll(r) {
//     return r.keys().map(r);
// }

// const importedSongs = importAll(require.context('../../Music', false, /\.(mp3)$/));
// const listOfsongs = importedSongs.map(s => s.replace(/.*\//, '').replace(/\..*3/, ''))
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
                // console.log(tag)
                // console.log(importedSongs)
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
        audioSrc: song2,
        image: imgSrc,
        color: "#00aeb0"
    },
    {
        title: "Canon in D",
        artist: "Pachalbel",
        audioSrc: song6,
        image: imgSrc2,
        color: "#ffb77a"
    },
    {
        title: "ANDROMEDA",
        artist: "LXST CXNTURY",
        audioSrc: song1,
        image: imgSrc3,
        color: "#30367d"
    },
    {
        title: "VIOLENSE",
        artist: "LXST CXNTURY",
        audioSrc: song3,
        image: imgSrc4,
        color: "#955f91"
    },
    {
        title: "Fallen Down",
        artist: "Augustin Garnier",
        audioSrc: song0,
        image: imgSrc5,
        color: "#397c40"
    },
    {
        title: "Sigma Fonk",
        artist: "Maf1k",
        audioSrc: song4,
        image: imgSrc6,
        color: "#6e35b5"
    },
    {
        title: "Blurred Stars",
        artist: "OXWAVE",
        audioSrc: song5,
        image: imgSrc7,
        color: "#603e65"
    },
    {
        title: "Magic Moments",
        artist: "Perry Como",
        audioSrc: song7,
        image: imgSrc8,
        color: "#d3eaf2"
    },
    {
        title: "Memory Reboot",
        artist: "VOJ, Narvent",
        audioSrc: song8,
        image: imgSrc9,
        color: "#668ebc"
    }

]
function unlockAudioContext(audioCtx) {
    if (audioCtx.state !== 'suspended') return;
    const b = document.body;
    const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
    events.forEach(e => b.addEventListener(e, unlock, false));
    function unlock() { audioCtx.resume().then(clean); }
    function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
}
const Backdrop = ({ activeColor, trackIndex, isPlaying }) => {
    useEffect(() => {
        document.documentElement.style.setProperty("--active-color", activeColor);
    }, [trackIndex, activeColor]);

    return <div className={`color-backdrop ${isPlaying ? "playing" : "idle"}`} />;
};

const Music = React.memo((props) => {

    const [trackIndex, setTrackIndex] = useState(0);
    const [seconds, setSeconds] = useState();
    const [isloading, setisLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const { title, artist, color, image, audioSrc } = tracks[trackIndex]
    const [play, { pause, stop, duration, sound }] = useSound(audioSrc);

    const toPrevTrack = () => {
        setIsPlaying(false)
        if (sound) {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1);
            } else {
                setTrackIndex(trackIndex - 1);

            }
        } else setisLoading(true)
    };
    const toNextTrack = () => {
        setIsPlaying(false)
        if (sound) {
            if (trackIndex < tracks.length - 1) {
                setTrackIndex(trackIndex + 1);
            } else {
                setTrackIndex(0);
            }
        } else setisLoading(true)
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
        console.log('Секунда воспроизведения')
        const interval = setInterval(() => {
            setisLoading(false)
            setSeconds(sound.seek([]) || ''); // устанавливаем состояние с текущим значением в секундах
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
                min,
                sec,
            });

        }, 1000);
        return (
            () => {
                clearInterval(interval)
                stop()
                console.log('UNMOUNTED')
            }
        )
    }, [sound]);

    const mainActionRender = ({ playingButton, _ }) => ({
        id: 'mainActionContainer',
        node: <button onClick={playingButton}>Play</button>
    });
    if (props.auth === false) return <Navigate to={'/login'} />
    return (<div>
        <div
            className={`mainContainer ${isPlaying ? "playing" : "idle"}`}
            style={{ background: `linear-gradient(45deg, ${color} 20%, transparent 100%)` }}
        >
            {/* <div
                className={`audio-player ${isPlaying ? "playing" : "idle"}`}
                style={{ background: `linear-gradient(45deg, ${color} 20%, transparent 100%)` }}
            > */}
            <div className="track-info">

                <img
                    id="img"
                    className={`artwork`}
                    src={image}
                    alt={`track artwork for ${title} by ${artist}`}
                />
                <h2 className="title">{title}</h2>
                <h3 className="artist">{artist}</h3>
                {!isloading && <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={playingButton}
                />}
                {isloading && <label className="title">Loading ...</label>}
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
        </div >

        {/* <Visualizer audioSRC={audioSrc} color={color} mainActionRender={mainActionRender}/> */}

    </div >
    );


})


let MusicContainer = withAuthRedirect(Music)


export default MusicContainer;
