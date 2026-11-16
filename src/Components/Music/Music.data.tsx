import imgSrc3 from '@components/Music/assets/andromeda.png'
import imgSrc from '@components/Music/assets/artwork.jpg'
import imgSrc2 from '@components/Music/assets/artwork2.jpg'
import imgSrc5 from '@components/Music/assets/artwork3.jpg'
import imgSrc7 from '@components/Music/assets/blurredStars.png'
import song0 from '@components/Music/assets/Music/Augustin Garnier - Fallen Down.mp3'
import song1 from '@components/Music/assets/Music/LXST CXNTURY-Andromeda.mp3'
import song2 from '@components/Music/assets/Music/LXST CXNTURY-OSAKA.mp3'
import song3 from '@components/Music/assets/Music/LXST CXNTURY-VIOLENCE.mp3'
import song4 from '@components/Music/assets/Music/Maf1k-Sigma Phonk.mp3'
import song5 from '@components/Music/assets/Music/OXWAVE-BlurredStars.mp3'
import song6 from '@components/Music/assets/Music/Pachalbel - Canon in D.mp3'
import song7 from '@components/Music/assets/Music/Perry Como - Magic Moments.mp3'
import song8 from '@components/Music/assets/Music/VOJ, Narvent - Memory Reboot.mp3'
import imgSrc8 from '@components/Music/assets/snow.jpg'
import imgSrc4 from '@components/Music/assets/uni1.jpeg'
import imgSrc6 from '@components/Music/assets/uni2.jpg'
import imgSrc9 from '@components/Music/assets/uni3.jpeg'

export type Track = {
  title: string
  artist: string
  audioSrc: string
  image: string
  color: string
}

const tracks: Track[] = [
  {
    title: 'OSAKA',
    artist: 'LXST CXNTURY',
    audioSrc: song2,
    image: imgSrc,
    color: '#00aeb0',
  },
  {
    title: 'Canon in D',
    artist: 'Pachalbel',
    audioSrc: song6,
    image: imgSrc2,
    color: '#ffb77a',
  },
  {
    title: 'ANDROMEDA',
    artist: 'LXST CXNTURY',
    audioSrc: song1,
    image: imgSrc3,
    color: '#30367d',
  },
  {
    title: 'VIOLENSE',
    artist: 'LXST CXNTURY',
    audioSrc: song3,
    image: imgSrc4,
    color: '#955f91',
  },
  {
    title: 'Fallen Down',
    artist: 'Augustin Garnier',
    audioSrc: song0,
    image: imgSrc5,
    color: '#397c40',
  },
  {
    title: 'Sigma Fonk',
    artist: 'Maf1k',
    audioSrc: song4,
    image: imgSrc6,
    color: '#6e35b5',
  },
  {
    title: 'Blurred Stars',
    artist: 'OXWAVE',
    audioSrc: song5,
    image: imgSrc7,
    color: '#603e65',
  },
  {
    title: 'Magic Moments',
    artist: 'Perry Como',
    audioSrc: song7,
    image: imgSrc8,
    color: '#d3eaf2',
  },
  {
    title: 'Memory Reboot',
    artist: 'VOJ, Narvent',
    audioSrc: song8,
    image: imgSrc9,
    color: '#668ebc',
  },
]

export const tracksData = tracks
