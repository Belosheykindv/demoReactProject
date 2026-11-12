import React from 'react'
import { default as Play } from './assets/play.svg'
import { default as Pause } from './assets/pause.svg'
import { default as Next } from './assets/next.svg'
import { default as Prev } from './assets/prev.svg'

import './Music.scss'

type AudioControlsProps = {
  isPlaying: boolean
  onPlayPauseClick: (val?: boolean) => void
  onPrevClick: () => void
  onNextClick: () => void
}

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: AudioControlsProps) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <Prev />
    </button>

    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick()}
        aria-label="Play"
      >
        <Play />
      </button>
    )}

    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <Next />
    </button>
  </div>
)

export default AudioControls
