import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TaskManager from './pages/taskmanager.jsx'

function App() {
  

  return (
    <>
       <BrowserRouter>
      <>
        <Routes>
          <Route path='/' element={<TaskManager />} />
         
        </Routes>

      </>
    </BrowserRouter>
    </>
  )
}

export default App
