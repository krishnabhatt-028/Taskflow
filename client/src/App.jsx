import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [status, setStatus] = useState('Checking server...')
  const [details, setDetails] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    axios
      .get(`${apiUrl}/health`)
      .then((res) => setStatus(res.data.message))
      .catch((err) => {
        setStatus('Server is NOT connected')
        setDetails(err.message)
      })
  }, [apiUrl])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600">TaskFlow</h1>
        <p className="mt-3 text-slate-600">{status}</p>
        <p className="mt-2 text-sm text-red-500">{details}</p>
        <p className="mt-2 text-xs text-slate-400">API URL: {String(apiUrl)}</p>
      </div>
    </div>
  )
}

export default App