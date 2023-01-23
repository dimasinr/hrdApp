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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function DetailEmployee() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[3]
    const [name, setName] = React.useState([])
    const [email, setEmail] = React.useState([])
    const [username, setUsername] = React.useState([])
    const [nama_depan, setNamaDepan] = React.useState([])
    const [nama_belakang, setNamaBelakang] = React.useState([])
    const [roles, setRoles] = React.useState('')
    const [roles2, setRoles2] = React.useState([])
    const [division, setDivision] = React.useState('')
    const [division2, setDivision2] = React.useState([])
    const [sisa_cuti, setSisaCuti] = React.useState([])
    const [religion, setReligion] = React.useState([])
    const [gender, setGender] = React.useState([])
    const [date_join, setDateJoin] = React.useState(new Date().toISOString().slice(0,10))
    const [birth_date, setBirthDate] = React.useState(new Date().toISOString().slice(0,10))

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
          setDivision(res.division)
          setSisaCuti(res.sisa_cuti)
          setReligion(res.religion)
          setGender(res.gender)
          setDateJoin(res.employee_joined)
          setBirthDate(res.birth_date)
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

      const getDivisionUser = () => {
        axios.get(`${BASE_URL}/users/employees-division/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setDivision2(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getDivisionUser(), [])

      const handleChange = (event) => {
        setRoles(event.target.value);
      };

      const handleChanged = (event) => {
        setDivision(event.target.value);
      };
    
      const names = nama_depan+' '+nama_belakang

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
            formData.append("employee_joined", date_join);
            formData.append("division", division);
            formData.append("gender", gender);
            formData.append("religion", religion);
            formData.append("birth_date", birth_date);
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

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setDateJoin(dated.slice(1, 11))
  }

  const convDated = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setBirthDate(dated.slice(1, 11))
  }

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
                                                <TextField value={nama_depan} onChange={e => setNamaDepan(e.target.value)} label='Nama Depan' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={nama_belakang} onChange={e => setNamaBelakang(e.target.value)} label='Nama Belakang' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={username} onChange={e => setUsername(e.target.value)} id='username' label='Username' sx={{ mt:3, mr:1 }}  />
                                            </Box>
                                            <Box sx={{ mr:2 }}>
                                                <TextField value={email} onChange={e => setEmail(e.target.value)} id='email' label='Email' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={sisa_cuti} onChange={e => setSisaCuti(e.target.value)} type='number' label='Jatah Cuti' sx={{ mt:3, mr:1 }}  />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Masuk"
                                                    value={new Date(date_join)}
                                                    onChange={(newValue) => {
                                                        convDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3 }} {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                <FormControl sx={{ mt: 3, ml:1, minWidth: 220 }}>
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
                                                                <MenuItem value={rol.roles} key={index}>{rol.roles}</MenuItem>
                                                            )
                                                        })}
                                                   
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box sx={{ mr:2 }}>
                                                <TextField value={religion} onChange={e => setReligion(e.target.value)} label='Agama' sx={{ mt:3, mr:1 }}  />
                                                <TextField value={gender} onChange={e => setGender(e.target.value)} type='text' label='Jenis Kelamin' sx={{ mt:3, mr:1 }}  />
                                               
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Lahir"
                                                    value={new Date(birth_date)}
                                                    onChange={(newValue) => {
                                                      convDated(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3, mr:1 }} {...params} />}
                                                    />
                                                </LocalizationProvider>

                                                <FormControl sx={{ mt: 3, mr:1, minWidth: 220 }}>
                                                    <InputLabel id="division-label">Divisi</InputLabel>
                                                    <Select
                                                    labelId="division"
                                                    id="division"
                                                    value={division}
                                                    onChange={handleChanged}
                                                    label="Divisi"
                                                    >
                                                        {division2 && division2.map((div, index) => {
                                                            return(
                                                                <MenuItem value={div.division} key={index}>{div.division}</MenuItem>
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