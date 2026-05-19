import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  navigate('/')

  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        'http://localhost:8081/api/auth/login',
        {
          email,
          password
        }
      )

      localStorage.setItem("token", response.data)

      console.log(response.data)

      alert('Login Successful')

    } catch (error) {

      console.log(error)

      alert('Invalid Credentials')
    }
  }

  return (
    <div className="login-container">

      <h1>Login</h1>

      <form className="login-form" onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  )
}

export default Login