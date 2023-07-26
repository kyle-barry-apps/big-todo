import Navigation from './navigation/Navigation'
import Header from './header/Header'
import TodoSection from './todoSection/TodoSection'
import './layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <Navigation />
      <Header />
      <TodoSection />
    </div>
  )
}

export default Layout