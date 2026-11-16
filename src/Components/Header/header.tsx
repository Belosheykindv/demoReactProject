import H from './Header.module.css'
import headerImg from './Header.png'

const Header = (): JSX.Element => {
  return (
    <header className={H.header}>
      <img src={headerImg} alt='Site header' />
    </header>
  )
}
export const HeaderComponent = Header
