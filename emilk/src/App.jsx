import { BrowserRouter, Routes, Route } from "react-router-dom";
import Presentation from './pages/Presentation'
import Galleries from './pages/Galleries'
import Experiences from './pages/Experiences'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import LiquidChrome from './components/LiquidChrome/LiquidChrome'
import Photogrid from './pages/Photogrid'
import ScrollToHash from './components/ScrollToHash'
import Changement from './pages/Changement'
import './App.css'
import "./i18n/i18n"; // très important, ça initialise la traduction

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={
          <>
            <Presentation />
            <Galleries />
            <Experiences />
            <Contact />
          </>
        } />
        <Route path="/gallery/cafe" element={<Photogrid folder="cafe" />} />
        <Route path="/gallery/matcha" element={<Photogrid folder="matcha" />} />
        <Route path="/gallery/latte" element={<Photogrid folder="latte" />} />
        <Route path="/changement" element={<Changement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
