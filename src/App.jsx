import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TripDetails from "./pages/TripDetails"


function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trip-details" element={<TripDetails />} />
      </Routes>
    </div>
  )
}

export default App
