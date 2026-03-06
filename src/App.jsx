import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Homepage from './components/Homepage'
import Acceptance from './components/Acceptance'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/celebrate" element={<Homepage />} />
      <Route path="/accepted" element={<Acceptance />} />
    </Routes>
  )
}

export default App
