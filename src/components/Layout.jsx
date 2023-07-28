import Navigation from './navigation/Navigation'
import Header from './header/Header'
import TodoSection from './todoSection/TodoSection'
import './layout.css'
import { useState } from 'react'

const Layout = () => {

  const [ showNav, setShowNav ] = useState(true)

  return (
    <div className={showNav ? 'layout' : 'layout hidden-nav'}>
       <div onClick={()=> setShowNav(true)} className={showNav ? 'nav__show-sidebar' : 'nav__show-sidebar active'}>
        <img src="./assets/icon-show-sidebar.svg" alt="show sidebar icon" />
      </div>
      <Navigation showNav={showNav} setShowNav={setShowNav}/>
      <Header />
      <TodoSection />
    </div>
  )
}

export default Layout