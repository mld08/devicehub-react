import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Cart from './components/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="h-full">
      <div class="min-h-full">
        <Header />
        <Cart />
      </div>
      <Footer />
    </div>

  )
}


export default App
