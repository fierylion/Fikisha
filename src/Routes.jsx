import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/Homepage'
import DonorPage from './pages/Donor'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Register'
import NgoPage from './pages/Ngos'


const RoutesPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route
            path='/donor'
            element={
              <ProtectedRoute>
                <DonorPage />
              </ProtectedRoute>
            }
          />
          <Route path='/ngo' element={<NgoPage />} />
        </Routes>
      </Router>
    </React.Suspense>
  )
}

export default RoutesPage
