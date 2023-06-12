import React,{useState, useContext} from 'react'
import { Col, Form } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, API_KEY } from '../../../fetch/fetch'
import axios from 'axios'
import { AuthContext } from '../../../Context/AuthContext'
import { VisibilityOff, Visibility } from '@mui/icons-material'
// import { nawastraIcon } from '../../../Components/images/images'
import './login.css'

function LoginHrd() {

  const navigate = useNavigate()

  const [ credentials, setCredentials ] = useState({
    username: undefined,
    password: undefined,
  });
  const { dispatch } = useContext(AuthContext);
  const [errors, setErrors] = useState('')
  const [visib, setVisib] = useState("password");


  const handleChange = (e) =>{
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
  }

  console.log(process.env.API_URL)

  const LoginUser = async (e) =>{
     e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res = await axios.post(`${BASE_URL}/api-auth/`, credentials,
            {
              headers:{
                'Authorization' : 'Token ' + API_KEY
              }
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.data });
            const rest = res.data.data
            console.log(rest)
            localStorage.setItem("user_token",rest.token)
            localStorage.setItem("user_id",rest.user_id)
            localStorage.setItem("name",rest.name)
            localStorage.setItem("roles",rest.roles)
            navigate("/authentication-user")
            window.location.reload()
        }catch(err){
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.detail })
        console.log(err.response)
        setErrors(err.response.data.error)
        }
  }

  const showPassword = () => {
    setVisib("text")
  }
  const hiddenPassword = () => {
      setVisib("password")
  }

  
  return (
    <React.Fragment>
        <div className='background_login'>
          <Col md={4}>
            <Form onSubmit={LoginUser}>
                <div className="card shadow-card h-login-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                    {/* <div className="d-flex justify-content-center">
                        <img src={nawastraIcon} className='image_login' alt="" />
                    </div> */}
                    <div className="card-title"><h5>Login</h5>
                    <small className="text-secondary">
                      Login dengan username & password yang sudah diberikan
                    </small>
                    </div>
                    <Box sx={{ mb:2 }}>
                      <TextField sx={{ }} fullWidth type='text' onChange={handleChange} id='username' variant='standard' label='Username' />
                      <TextField sx={{ mt:1, mb:2 }} fullWidth type={visib} onChange={handleChange} id='password' variant='standard' label='Password' />
                      <span onClick={visib === "password" ? showPassword : hiddenPassword} className="field-icon">
                        {visib === "password" ?
                            <Visibility style={{ color: "#80848C"}} /> : (
                                <VisibilityOff style={{ color: "#80848C"}} />
                            )
                        }
                        </span>
                    <small className='text-danger mb-1'>{errors && errors}</small>
                    </Box>
                    {/* <div className="d-flex justify-content-end mb-3"> */}
                      <button className='button_login mb-1' onClick={LoginUser}>Login</button>
                      {/* <button className='btn btn-primary' onClick={da}>das</button> */}
                      
                    {/* </div> */}
                  </div>
                </div>
            </Form>
          </Col>
        </div>
    </React.Fragment>  
  )
}

export default LoginHrd