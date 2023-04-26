import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, Login, Profile, Register, Recover } from '../pages/auth'
import { HeaderTab, Home } from '../pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <HeaderTab />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Recover />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/newtask" element={<Home />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
