import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, Login, Profile, Register, Recover } from '../pages/auth'
import { HeaderTab, Home } from '../pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <HeaderTab />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Recover />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newtask" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
