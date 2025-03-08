import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router'
import Landing from './pages/landing'
import FoodPreview from './pages/food-preview'
import Available from './pages/available'

// console.log(data)
function App() {
  const [count, setCount] = useState(0)
  const data = fetch('/api/data').then((res) => res.json()).then((data) => console.log(data))
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/food-preview" element={<FoodPreview />} />
      <Route path="/available" element={<Available />} />
    </Routes>
  )
}

export default App
