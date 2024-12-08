import Article from "./Components/Article";
import Contactus from "./Components/Contactus";
import Home from "./Components/Home"
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contactus/>}/>
          <Route path="/article" element={<Article/>}/>
        </Routes>
    </>
  )
}

export default App
