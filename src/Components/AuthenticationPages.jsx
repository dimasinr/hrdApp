import React,{useContext} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function AuthenticationPages() {

  const navigate = useNavigate()
  const backdrop_active = true
  const user = useContext(AuthContext);
  const roles = user.user.roles
  console.log(roles)

  React.useEffect(() => {
      if(user !== null){
        const interval = setInterval(() => {
          navigate('/home')
        }, 4000);
        return () => clearInterval(interval);
      }
  })

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop_active}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default AuthenticationPages