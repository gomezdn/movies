import { Routes, Route } from 'react-router-dom'
import Main from './components/Trending'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
    </Routes>
  )
}