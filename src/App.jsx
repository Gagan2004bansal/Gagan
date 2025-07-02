import Article from "./Components/Article";
import Contactus from "./Components/Contactus";
import Home from "./Components/Home"
import {Routes, Route} from "react-router-dom";
import Notes from "./Components/Notes";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/contact" element={<Contactus/>}/>
          <Route path="/article" element={<Article/>}/>
          <Route path="/notes" element={<Notes/>}/>
        </Routes>
    </>
  )
}

export default App
