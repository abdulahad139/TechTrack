import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Auth/login"
import Signup from "./components/Auth/signup"
import Reset from "./components/Auth/reset"
import Home from "./pages/home.jsx"
import Roadmaps from "./pages/roadmaps.jsx"
import Courses from "./pages/courses.jsx"
import RoadmapDetails from "./pages/roadmapdetails.jsx"

export default function App() {
  return(
    <>
    <Router>
      <div className="App">
        <div className="content">
            <Routes>
              <Route path="/" element={<Login/>}></Route>
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="/reset" element={<Reset/>}></Route>
              <Route path="/homepage" element={<Home/>}></Route>
              <Route path="/roadmaps" element={<Roadmaps/>}></Route>
              <Route path="/roadmaps/:roadmap" element={<RoadmapDetails/>}></Route>
              <Route path="/courses" element={<Courses/>}></Route>
              <Route path="*" element={<h1>404 NOT FOUND</h1>}></Route>
            </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}


