import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { withAuthRedirect } from '../../Hoc/withAuthRedirect'
import useSound from 'use-sound' //для работы со звуком
import AudioControls from './AudioControls'
import tracks from './Music.data'

import './Music.scss'

type MusicProps = {
  auth: boolean
}

const Music = React.memo((props: MusicProps) => {
  const [trackIndex, setTrackIndex] = useState(0)
  const [seconds, setSeconds] = useState()
  const [isloading, setisLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const { title, artist, color, image, audioSrc } = tracks[trackIndex]
  const [play, { pause, stop, duration, sound }] = useSound(audioSrc)

  const toPrevTrack = () => {
    setIsPlaying(false)
    if (sound) {
      if (trackIndex - 1 < 0) {
        setTrackIndex(tracks.length - 1)
      } else {
        setTrackIndex(trackIndex - 1)
      }
    } else setisLoading(true)
  }

  const toNextTrack = () => {
    setIsPlaying(false)
    if (sound) {
      if (trackIndex < tracks.length - 1) {
        setTrackIndex(trackIndex + 1)
      } else {
        setTrackIndex(0)
      }
    } else setisLoading(true)
  }

  const playingButton = () => {
    setIsPlaying(false)
    if (isPlaying) {
      pause() // приостанавливаем воспроизведение звука
      setIsPlaying(false)
    } else {
      if (sound) {
        play() // воспроизводим аудиозапись
        setIsPlaying(true)
      }
    }
  }
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  })

  const sec = duration ?? 0 / 1000
  const min = Math.floor(sec / 60)
  const secRemain = Math.floor(sec % 60)
  const time = {
    min: min,
    sec: secRemain,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!sound) {
        setisLoading(true)
      } else {
        setisLoading(false)
        setSeconds(sound.seek([]) ?? '--') // устанавливаем состояние с текущим значением в секундах
        const min = Math.floor(sound.seek([]) / 60)
        const sec = Math.floor(sound.seek([]) % 60)
        setCurrTime({
          min,
          sec,
        })
      }
    }, 1000)
    return () => {
      clearInterval(interval)
      stop()
      console.log('UNMOUNTED')
    }
  }, [sound, stop])

  if (props.auth === false) return <Navigate to={'/login'} />
  return (
    <div>
      <div
        className={`mainContainer ${isPlaying ? 'playing' : 'idle'}`}
        style={{
          background: `linear-gradient(45deg, ${color} 20%, transparent 100%)`,
        }}
      >
        <div className="track-info">
          <img
            id="img"
            className={`artwork`}
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />

          <h2 className="title">{title}</h2>

          <h3 className="artist">{artist}</h3>

          {isloading && <label className="title">Loading ...</label>}

          {!isloading && (
            <>
              <AudioControls
                isPlaying={isPlaying}
                onPrevClick={toPrevTrack}
                onNextClick={toNextTrack}
                onPlayPauseClick={playingButton}
              />

              <div className="times">
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
                max={duration ?? 0 / 1000}
                className="progress"
                onChange={(e) => {
                  sound.seek([e.target.value])
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* <Visualizer audioSRC={audioSrc} color={color} mainActionRender={mainActionRender}/> */}
    </div>
  )
})

let MusicContainer = withAuthRedirect(Music)

export default MusicContainer
