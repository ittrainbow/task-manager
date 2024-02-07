import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, Login, Profile, Register } from '../pages'
import { HeaderTab, Home } from '../pages'
import { useSelector } from 'react-redux'
import { selectLoading } from '../redux/selectors'
import { Loader } from '../UI'

export const Router = () => {
  const loading = useSelector(selectLoading)
  return (
    <BrowserRouter>
      <HeaderTab />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          {/* <Route path="/reset" element={<Recover />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newtask" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
