import { NavLink } from 'react-router-dom'

import './Navbar.scss'

type NavbarProps = {
  isAuth: boolean
  login: string | null
  logout: () => void
}

const Navbar = (props: NavbarProps): JSX.Element => {
  // let userElements = props.users.map(p => <DialogItem userId={p.id} imgSrc={p.imgSrc} name={p.name} key={p.id} />);
  return (
    <nav className='navbar'>
      <div className='navbarFriends'>
        {' '}
        {props.isAuth ? (
          <div>
            {' '}
            {props.login} <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <NavLink to='/login'>Логин</NavLink>
        )}{' '}
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/profile'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Профили
        </NavLink>
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/dialogs'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Сообщения
        </NavLink>
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/chat'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Чат
        </NavLink>
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/music'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Музыка
        </NavLink>
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/settings'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Настройки
        </NavLink>
      </div>
      <div className='navbarItem'>
        {' '}
        <NavLink
          to='/users'
          className={(navData) => (navData.isActive ? 'navbarActive' : 'navbarItem')}
        >
          Пользователи
        </NavLink>
      </div>
      <div className='navbar'>Тут будет реклама</div>
      {/* {props.isAuth
      ? <div className='navbarFriends'> Друзья{userElements}</div>
      : null} */}
    </nav>
  )
}
export const NavbarComponent = Navbar
