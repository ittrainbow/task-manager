import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Login, Profile, Register, Reset, UserPage } from '../pages/auth'
import { Task, TaskList, TaskPage } from '../pages/tasks'
import { HeaderTab } from '../pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <HeaderTab />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
        <Route exact path="/dashboard" element={<UserPage />} />
        <Route exact path="/taskpage" element={<TaskPage />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  )
}
