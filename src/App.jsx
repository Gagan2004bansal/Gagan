import Article from "./Components/Article";
import Contactus from "./Components/Contactus";
import Home from "./Components/Home"
import { Routes, Route } from "react-router-dom";
import Notes from "./Components/Notes";
import MLAdminEditor from "./Components/MLAdminEditor";
import MLDetail from "./Components/MLDetail";
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/article" element={<Article />} />
        <Route path="/certifications" element={<Notes />} />


        {/* <Route path="/ml" element={<MachineLearning />} /> */}
        <Route path="/ml/:slug" element={<MLDetail />} />

        {/* Hidden Admin Pages */}
        <Route path="/admin/ml/new" element={<MLAdminEditor />} />
        <Route path="/admin/ml/:slug/edit" element={<MLAdminEditor />} />

        <Analytics/>

      </Routes>
    </>
  )
}

export default App
