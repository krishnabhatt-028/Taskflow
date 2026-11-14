import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [status, setStatus] = useState('Checking server...')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/health`)
      .then((res) => setStatus(res.data.message))
      .catch(() => setStatus('Server is NOT connected'))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600">TaskFlow</h1>
        <p className="mt-3 text-slate-600">{status}</p>
      </div>
    </div>
  )
}

export default App