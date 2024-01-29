import React, { useEffect, useState } from "react";
import useSound from "use-sound"; //для работы со звуком
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons"; // для кастомизации иконок
import s from './player.module.css'

const Player = (props) => {
    const [soundEnabled, setSoundEnabled] = useState(false)
    const [seconds, setSeconds] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [play, { pause, stop, duration, sound }] = useSound(props.songPath, { soundEnabled });
    const playingButton = () => {
        if (isPlaying) {
            pause(); // приостанавливаем воспроизведение звука
            setIsPlaying(false);
        } else {
            play(); // воспроизводим аудиозапись
            setIsPlaying(true);
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
        setSoundEnabled(true)
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([])); // устанавливаем состояние с текущим значением в секундах
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

    return (
        <div className={s.songContainer}>
            <div style={{ flex: 1 }}>
                {!isPlaying
                    ? (
                        <button className={s.playButton} onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "#2398f1" }}>
                                <AiFillPlayCircle />
                            </IconContext.Provider>
                        </button>)
                    : (
                        <button className={s.playButton} onClick={playingButton}>
                            <IconContext.Provider value={{ size: "3em", color: "#2398f1" }}>
                                <AiFillPauseCircle />
                            </IconContext.Provider>
                        </button>
                    )}
            </div>
            <div style={{ flex: 1 }}>
                <img className={s.musicCover} src="https://w7.pngwing.com/pngs/486/405/png-transparent-musical-note-computer-icons-notes-angle-rectangle-monochrome.png" />
            </div>
            <div className={s.nameContainer} style={{ flex: 3 }}>
                <div><b>{props.nameOfSong.replace(/.*\//, '').replace(/\..*3/, '').replace(/-.*/, '')}</b></div>
                <div>{props.nameOfSong.replace(/.*\//, '').replace(/\..*3/, '').replace(/.*-/, '')}</div>
            </div>

            <div style={{ flex: 5 }}>
                <div>
                    <div className={s.time}>
                        <p>
                            {currTime.min}:{currTime.sec}
                        </p>
                        <p>
                            {time.min}:{time.sec}
                        </p>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration / 1000}
                        default="0"
                        value={seconds || 0}
                        className={s.timeline}
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Player