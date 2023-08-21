import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/Homepage'
import DonorPage from './pages/Donor'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Register'
import NgoPage from './pages/Ngos'
import CustomerOrder from './pages/CustomerOrder'
import OrderDetails from './pages/OrderDetails'
import AgentDetails from './pages/AgentDetails'
import TestMap from './pages/TestMap'
const RoutesPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          <Route
            path='/customer'
            element={
              <ProtectedRoute type={'customer'}>
                <DonorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/customer/order'
            element={
              <ProtectedRoute type={'customer'}>
                <CustomerOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path='/customer/order/details'
            element={
              <ProtectedRoute type={'customer'}>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/test'
            element={
              <TestMap/>
            }
          />
          <Route
            path='/agent'
            element={
              <ProtectedRoute type={'agent'}>
                <NgoPage />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path='/agent/orders'
            element={
              <ProtectedRoute type={'agent'}>
                <AgentDetails />{' '}
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </React.Suspense>
  )
}

export default RoutesPage
