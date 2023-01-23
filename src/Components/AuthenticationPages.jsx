import React,{useContext} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';

function AuthenticationPages() {

  const navigate = useNavigate()
  const user = useContext(AuthContext);
  const roles = user.user.roles
  console.log(roles)

  React.useEffect(() => {
      if(user !== null){
        navigate('/home')
      }
  })

  return (
    <div>AuthenticationPages</div>
  )
}

export default AuthenticationPages