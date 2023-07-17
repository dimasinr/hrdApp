import React,{useState} from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { BASE_URL, USER_TOKEN } from '../fetch/fetch'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
function ChangePassword() {

    const navigate = useNavigate()
    const [old_password, setOldPassword] = useState([])
    const [new_password1, setNewPassword1] = useState([])
    const [new_password2, setNewPassword2] = useState([])
    const [show, setShow] = useState(false)

    const showVisibility = () => {
        setShow(!show)
    }

    const changePasswordEmployee = async e => {
        try{
            const formData = new FormData();
            formData.append("old_password", old_password);
            formData.append("new_password1", new_password1);
            formData.append("new_password2", new_password2);

            const res = await axios({
                method: 'post',
                url:`${BASE_URL}/users/employee/change-password/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 2000
              })
            navigate('/home')
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                        title: `Gagal`,
                        text: `${error.response.data.message}`,
                        showConfirmButton: false,
                        timer: 2500
                      })
                      console.log(error)
            }
        }
      };
return (
    <div id='image__backgrounds' className='d-flex'>
        <SideBar />
        <main className="container" style={{ marginTop:'80px' }}>
            <div className="card shadow-card" style={{border:"none", borderRadius:"12px"}}>
                <div className="card-body">
                    <h5>Ubah Password</h5>
                    <br />
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between">
                            <div className="col-md-4">
                                <TextField value={old_password} onChange={e => setOldPassword(e.target.value)} type={show ? 'text' : 'password'} label='Old Password' />
                            </div>
                            <div className="col-md-4">
                                <TextField value={new_password1} onChange={e => setNewPassword1(e.target.value)} type={show ? 'text' : 'password'} label='New Password' />
                            </div>
                            <div className="col-md-4">
                                <TextField value={new_password2} onChange={e => setNewPassword2(e.target.value)} type={show ? 'text' : 'password'} label='Verify New Password' />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="d-flex justify-content-between flex-wrap">
                        <button onClick={() => {
                            showVisibility()
                        }} className="btn text-primary text-bold">
                            Reveal Password
                        </button>
                        <button onClick={() => {
                            changePasswordEmployee()
                        }} className="btn text-primary">
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ChangePassword