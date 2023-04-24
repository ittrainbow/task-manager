import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard, Login, Profile, Register, Reset } from '../pages/auth'
import { TaskPage } from '../pages/tasks'
import { HeaderTab, Home } from '../pages'

export const Router = () => {

  return (
    <BrowserRouter>
      <HeaderTab />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/taskpage" element={<TaskPage />} />
        <Route exact path="/newtask" element={<TaskPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
