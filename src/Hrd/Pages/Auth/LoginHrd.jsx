import React,{useState, useContext} from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../fetch/fetch'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext'

function LoginHrd() {

  const navigate = useNavigate()

  const [ credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined,
  });
  const { dispatch, error} = useContext(AuthContext);

  const handleChange = (e) =>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  }

  const LoginUser = async (e) =>{
     e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post(`${BASE_URL}/api-auth/`, credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
            console.log(res.data.data)
            localStorage.setItem("user_token", res.data.data.token)
            localStorage.setItem("user_id", res.data.data.user_id)
            localStorage.setItem("name", res.data.data.name)
            localStorage.setItem("roles", res.data.data.roles)
            navigate("/home")
            window.location.reload()
        }catch(err){
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.detail })
        console.log(err.response)
        }
  }
  
  return (
    <div style={{ height:'100vh', backgroundColor:'rgb(21, 36, 105)', display:'flex', justifyContent:'center', alignItems:'center' }}>
       <Col md={4}>
        <div className="card shadow-card" style={{ border:'none', borderRadius:'12px' }}>
          <div className="card-body">
            <div className="card-title"><h5>Login HRD</h5></div>
            <Box sx={{ mt:1, mb:2 }}>
              <TextField fullWidth type='text' onChange={handleChange} id='username' variant='standard' label='Username' />
              <TextField fullWidth type='password' onChange={handleChange} id='password' variant='standard' label='Password' />
            </Box>
            <div className="d-flex justify-content-between mb-3">
              <Link to='/' style={{ textDecoration:'none' }}>
                <small>Lupa Password</small>
              </Link>
              <button className='btn btn-primary' onClick={LoginUser}>Login</button>
              {error && error}
            </div>
          </div>
        </div>
       </Col>
    </div>  )
}

export default LoginHrd