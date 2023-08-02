import { useContext, useState } from 'react'
import Navigation from './navigation/Navigation'
import Header from './header/Header'
import TodoSection from './todoSection/TodoSection'
import { ModalContext } from '../contexts/ModalContext'
import './layout.css'
import AddBoard from './modals/AddBoard/AddBoard'
import DeleteBoard from './modals/DeleteBoard/DeleteBoard'
import EditBoard from './modals/EditBoard/EditBoard'

const Layout = () => {

  const { modal } = useContext(ModalContext)
  const [ showNav, setShowNav ] = useState(true)

  return (
    <>
    {modal === 'editBoard' ? <EditBoard /> : null}
    {modal === 'addBoard' ? <AddBoard /> : null}
    {modal === 'deleteBoard' ? <DeleteBoard /> : null}
    {modal && <div className='overlay'></div>}
    <div className={showNav ? 'layout' : 'layout hidden-nav'}>
       <div onClick={()=> setShowNav(true)} className={showNav ? 'nav__show-sidebar' : 'nav__show-sidebar active'}>
        <img src="./assets/icon-show-sidebar.svg" alt="show sidebar icon" />
      </div>
      <Navigation showNav={showNav} setShowNav={setShowNav}/>
      <Header />
      <TodoSection />
    </div>
    </>
  )
}

export default Layout