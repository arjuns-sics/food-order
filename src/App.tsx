import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Landing from './pages/landing'
import FoodPreview from './pages/food-preview'
import Available from './pages/available'
import IndexLayout from './layouts/index-layout'
import Login from './pages/login'
import Register from './pages/register'
import Cart from './pages/cart'
import Profile from './pages/profile'
import Checkout from './pages/checkout'

// console.log(data)
function App() {
  const [count, setCount] = useState(0)
  const data = fetch('/api/data').then((res) => res.json()).then((data) => console.log(data))
  return (
    <Routes>
      <Route path="/" element={<IndexLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/food-preview" element={<FoodPreview />} />
        <Route path="/available" element={<Available />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App
