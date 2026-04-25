import React from 'react'
import { Toaster } from 'react-hot-toast'
import {Routes, Route, Navigate} from 'react-router-dom'
import Layout from './Pages/Layout'
import LoginLanding from './Pages/LoginLanding'
import Dashboard from './Pages/Dashboard'
import Employees from './Pages/Employees'
import Attendance from './Pages/Attendance'
import Leave from './Pages/Leave'
import Payslips from './Pages/Payslips'
import Settings from './Pages/Settings'
import PrintPayslip from './Pages/PrintPayslip'
import LoginForm from './Components/LoginForm'

const App = () => {
  return (
    <>
      <Toaster/>
      <Routes>
        <Route  path='/login' element={<LoginLanding/>}/>
        <Route  path='/login/admin' element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/>}/>
        <Route  path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to access your account"/>}/>
        <Route element={<Layout/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/employees' element={<Employees/>}/>
          <Route path='/attendance' element={<Attendance/>}/>
          <Route path='/leave' element={<Leave/>}/>
          <Route path='/payslips' element={<Payslips/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Route>
        <Route  path='/print/payslips/:id' element={<PrintPayslip/>}/>
        <Route path='*' element={<Navigate to='/dashboard' replace/>}/>
      </Routes>
    </>
  )
}

export default App
