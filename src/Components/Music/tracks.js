import imgSrc from "./assets/artwork.jpg";
import imgSrc2 from "./assets/artwork.jpg";
import imgSrc3 from "./assets/artwork3.jpg";

function importAll(r) {
  return r.keys().map(r);
}
export const importedSongs = importAll(require.context('./assets/Music', false, /\.(mp3)$/));
// All of these artists are at https://pixabay.com/music/search/mood/laid%20back/

export default [
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
];
