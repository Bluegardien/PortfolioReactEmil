import Presentation from './pages/Presentation'
import Galleries from './pages/Galleries'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import LiquidChrome from './components/LiquidChrome/LiquidChrome'
import './App.css'
import "./i18n/i18n"; // très important, ça initialise la traduction

function App() {

  return (

    <div className="snap-y snap-proximity overflow-y-scroll h-screen">
      <Navbar/>
      <Presentation/>
      <Galleries/>
      <Experiences/>
      <Contact/>
    </div>
  )
}

export default App
