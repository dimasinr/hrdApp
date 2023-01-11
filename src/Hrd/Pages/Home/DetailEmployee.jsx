import React from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'
import { ArrowBackIos, Delete } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import Swal from 'sweetalert2';
import SideBar from '../../Components/SideBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DetailEmployee() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[3]
    const [name, setName] = React.useState([])
    const [email, setEmail] = React.useState([])
    const [username, setUsername] = React.useState([])
    const [nama_depan, setNamaDepan] = React.useState([])
    const [nama_belakang, setNamaBelakang] = React.useState([])
    const [roles, setRoles] = React.useState([])
    const [roles2, setRoles2] = React.useState([])
    const [sisa_cuti, setSisaCuti] = React.useState([])

    const getEmployee = () => {
        axios.get(`${BASE_URL}/users/employees/${ids}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setName(res.name)
          setEmail(res.email)
          setUsername(res.username)
          setNamaDepan(res.first_name)
          setNamaBelakang(res.last_name)
          setRoles(res.roles)
          setSisaCuti(res.sisa_cuti)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployee(), [ids])

      const getRolesEmployee = () => {
        axios.get(`${BASE_URL}/users/employees-roles/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setRoles2(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getRolesEmployee(), [])

      const handleChange = (event) => {
        setRoles(event.target.value);
      };
    
      const names = nama_depan+' '+nama_belakang
      console.log(names)

      const editEmployee = async e => {
        try{
            const formData = new FormData();
            formData.append("name", names);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("first_name", nama_depan);
            formData.append("last_name", nama_belakang);
            formData.append("roles", roles);
            formData.append("sisa_cuti", sisa_cuti);
           await axios({
                method: 'put',
                url:`${BASE_URL}/users/employees/${ids}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            Swal.fire({
                icon: 'success',
                title: `Data Berhasil diubah`,
                showConfirmButton: false,
                timer: 1500
              })
            navigate(-1)
            getEmployee()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                  title: 'Oops...',
                  text: `${error.response.data.detail}`
                })
            }
        }
    };

    const delEmployee = async e => {
      try{
         await axios({
              method: 'delete',
              url:`${BASE_URL}/users/employees/${ids}/`,
              headers: {
                  "Authorization" : `Token ${USER_TOKEN}`
                }
          })
          Swal.fire({
              icon: 'success',
              title: `Data Karyawan Berhasil dihapus`,
              showConfirmButton: false,
              timer: 1500
            })
         navigate('/list-karyawan')
      }catch(error){
          if( error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
              ){
                  Swal.fire({
                      icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.detail}`
              })
          }
      }
  };


  return (
    <React.Fragment>
        {/* <Navbars /> */}
        <div className="d-flex">
        <SideBar />
          <div id="image__background" style={{ marginTop:'62px' }}>
              <main className="p-3 ">
                  <div className='d-flex justify-content-center'>
                      <Col md={12} sm={12}>
                          <div className="card shadow_card" style={{ border:'none', borderRadius:'12px' }}>
                              <div className="card-body">
                                      <button onClick={() => navigate(-1)} className="d-flex align-items-center btn">
                                          <ArrowBackIos />
                                          <h5>Detail Karyawan</h5>
                                      </button>

                                      <Col md={12} className='mb-2 text-secondary d-flex'>
                                        <Col md={12} className="mt-2">
                                          <div className="row">
                                            <Box sx={{ mr:2 }}>
                                                <TextField value={name ? name : names} disabled id='name' label='Nama karyawan' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={email} onChange={e => setEmail(e.target.value)} id='email' label='Email' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={username} onChange={e => setUsername(e.target.value)} id='username' label='Username' sx={{ mt:3, mr:1 }}  />
                                            </Box>
                                            <Box sx={{ mr:2 }}>
                                                <TextField value={nama_depan} onChange={e => setNamaDepan(e.target.value)} label='Nama Depan' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={nama_belakang} onChange={e => setNamaBelakang(e.target.value)} label='Nama Belakang' sx={{ mt:3, mr:1 }}  />
                                                {/* <TextField value={roles} onChange={e => setRoles(e.target.value)} label='Roles' sx={{ mt:3, mr:1 }}  /> */}
                                                <TextField value={sisa_cuti} onChange={e => setSisaCuti(e.target.value)} type='number' label='Jatah Cuti' sx={{ mt:3, mr:1 }}  />
                                            </Box>
                                            <Box sx={{ mr:2 }}>
                                                <FormControl sx={{ mt: 3, minWidth: 120 }}>
                                                    <InputLabel id="role-label">Roles</InputLabel>
                                                    <Select
                                                    labelId="role"
                                                    id="role"
                                                    value={roles}
                                                    onChange={handleChange}
                                                    label="Roles"
                                                    >
                                                        {roles2 && roles2.map((rol, index) => {
                                                            return(
                                                                <MenuItem value={rol.roles}>{rol.roles}</MenuItem>
                                                            )
                                                        })}
                                                   
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                          </div>
                                    
                                            <Box sx={{ mt:3, display:'flex', justifyContent: 'end' }}>
                                              <button onClick={editEmployee} className='btn text-primary'>Simpan</button>
                                              <button onClick={delEmployee} className='btn text-danger'><Delete /></button>
                                            </Box>
                                        </Col>

                                      </Col>

                              </div>
                          </div>
                      </Col>
                  </div>
              </main>
          </div>

        </div>
    </React.Fragment>
  )
}

export default DetailEmployee