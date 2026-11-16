import headerImg from './Header.png'

import './Header.scss'

const Header = (): JSX.Element => {
  return (
    <header className='header'>
      <img src={headerImg} alt='Site header' />
    </header>
  )
}
export const HeaderComponent = Header
