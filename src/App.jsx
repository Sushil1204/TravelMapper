import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import TripDetails from "./pages/TripDetails"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import VerifyAccount from "./pages/VerifyAccount"
import { useEffect, useState } from "react"
import AccountVerificationModal from "./components/AccountVerificationModal"
import Cookies from "js-cookie"
import { useMutation } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"
import ForgetPassword from "./pages/ForgetPassword"
import NotFound from "./pages/NotFound"

function App() {
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState();
  const user = Cookies.get('userData') && JSON.parse(Cookies.get('userData'))


  const Logout = useMutation({
    mutationKey: ['Logout'],
    mutationFn: async () => await account.deleteSession(
      'current'
    ),
    onSuccess: () => {
      navigate('/login')
    }
  })

  useEffect(() => {
    location.pathname != 'login' && user == undefined &&
      Logout.mutate()

    user != undefined && !user?.emailVerification &&
      setIsModalOpen(true)
  }, [])




  return (
    <>

      <Toaster />
      <div className="min-h-screen h-full  dark:bg-gray-900 dark:text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trip-details" element={<TripDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account-verification" element={<VerifyAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {location.pathname != '/login' && location.pathname != '/account-verification' && < AccountVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />}
      </div>
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4 text-center">
        <p>© 2024 TravelMapper, By Sushil Pundkar</p>
      </footer>
    </>
  )
}

export default App
