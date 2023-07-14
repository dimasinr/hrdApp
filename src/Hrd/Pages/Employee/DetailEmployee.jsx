import React, { useState } from 'react'
import SideBar from '../../Components/SideBar';
import { Col } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'
import { ArrowBackIos, Delete, VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import Swal from 'sweetalert2';
import {InputLabel, MenuItem, Select,FormControl, FormControlLabel, Checkbox} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {Snackbar, Alert} from '@mui/material';
import { HRTableNotesComponents, SubmissionTableComponents } from '../../../Karyawan/Components/Table/EmployeeTableComponents';

function DetailEmployee() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[3]
    const yearToday = new Date().getFullYear()

    const [user_id, setUserId] = React.useState(0)
    const [employee_code, setEmployeeCode] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [nama_depan, setNamaDepan] = React.useState('')
    const [nama_belakang, setNamaBelakang] = React.useState('')
    const [roles, setRoles] = React.useState("")
    const [roles2, setRoles2] = React.useState([])
    const [division, setDivision] = React.useState("")
    const [division2, setDivision2] = React.useState([])
    const [sisa_cuti, setSisaCuti] = React.useState(0)
    const [religion, setReligion] = React.useState([])
    const [gender, setGender] = React.useState('Laki-Laki')
    const [date_join, setDateJoin] = React.useState(new Date().toISOString().slice(0,10))
    const [date_ended, setDateEnded] = React.useState(new Date().toISOString().slice(0,10))
    const [birth_date, setBirthDate] = React.useState(new Date().toISOString().slice(0,10))
    const [awal_kontrak, setAwalKontrak] = React.useState(new Date().toISOString().slice(0,10))
    const [akhir_kontrak, setAkhirKontrak] = React.useState(new Date().toISOString().slice(0,10))
    const [contract_time, setContractTime] = React.useState([])
    const [active_user, setActiveUser] = React.useState(true)

    const [notes_cuti, setNotesCuti] = React.useState([])
    const [submission_cuti, setSubmissionCuti] = React.useState([])

    const [visib, setVisib] = useState("password");
    const [rest, setRest] = useState(false)
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    const getEmployee = () => {
        axios.get(`${BASE_URL}/users/employees/${ids}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setUserId(res.pk)
          setEmployeeCode(res.employee_code)
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
          setDateEnded(res.employee_ended)
          setBirthDate(res.birth_date)
          setAwalKontrak(res.contract_start)
          setAkhirKontrak(res.contract_end)
          setContractTime(res.contract_time)
          setActiveUser(res.is_active)
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
          setRoles2(res.results)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getRolesEmployee(), [])

      const getUserDataCuti = () => {
        axios.get(`${BASE_URL}/users/employee/cuti/${user_id}/${yearToday}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setNotesCuti(res.notes_cuti)
          setSubmissionCuti(res.submission_cuti)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getUserDataCuti(), [user_id, yearToday])

      const getDivisionUser = () => {
        axios.get(`${BASE_URL}/users/employees-division/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setDivision2(res.results)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getDivisionUser(), [])

      const handleChange = (event) => {
        setRoles(event.target.value);
      };

      const handleChangeActive = () => {
        setActiveUser(!active_user);
      };

      const handleChanged = (event) => {
        setDivision(event.target.value);
      };

      const handleGend = (event) => {
        setGender(event.target.value);
      };
          
      const editEmployee = async e => {
        try{
            const formData = new FormData();
            formData.append("employee_code", employee_code);
            formData.append("email", email);
            formData.append("username", username);
            formData.append("first_name", nama_depan);
            formData.append("last_name", nama_belakang);
            formData.append("is_active", active_user);
            formData.append("roles", roles);
            formData.append("sisa_cuti", sisa_cuti);
            formData.append("employee_joined", date_join);
            if(active_user !== true){
              formData.append("employee_ended", date_ended);
            }
            formData.append("division", division);
            formData.append("gender", gender);
            formData.append("religion", religion);
            formData.append("birth_date", birth_date);
            formData.append("contract_start", awal_kontrak);
            formData.append("contract_end", akhir_kontrak);
           await axios({
                method: 'put',
                url:`${BASE_URL}/users/employees/${ids}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            setStatus("info")
            setMessage("Data Karyawan Berhasil diubah")
            setSnack(true)
            getEmployee()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setStatus("info")
                setMessage( `${error.response.data.detail}`)
                setSnack(true)
            }
        }
    };

    const delEmployee = () =>{
      Swal.fire({
        title: 'Apakah Kamu yakin untuk menghapus data ini?',
        text: "data ini tidak bisa dikembalikan lagi",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteEmployee()
        }
      })
    }

    const deleteEmployee = async e => {
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
          text: "Data Karyawan Berhasil dihapus"})
         navigate('/list-karyawan')
      }catch(error){
          if( error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
              ){
                setStatus("info")
                setMessage(`${error.response.data.detail}`)
                setSnack(true)
          }
      }
  };

  const [urlData, setUrlData] = useState([])
  const resetPasswordEmployee = async e => {
    try{
        const formData = new FormData();
        formData.append("email", email);
      const res = await axios({
            method: 'post',
            url:`${BASE_URL}/api/reset-password/`,
            data: formData,
            headers: {
                "Authorization" : `Token ${USER_TOKEN}`
              }
        })
        setStatus("info")
        setMessage("Password Karyawan Berhasil reset silahkan input password baru")
        setSnack(true)
        setUrlData(res.data.Message)
        setRest(true)
    }catch(error){
        if( error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
            ){
              setStatus("info")
              setMessage(`${error.response.data.detail}`)
              setSnack(true)
        }
    }
};

const [password_new, setPasswordNew] = useState('')
const postNewPassword = async e => {
  try{
      const formData = new FormData();
      formData.append("password", password_new);
    const res =  await axios({
          method: 'patch',
          url:`${BASE_URL}${urlData}`,
          data: formData,
          headers: {
              "Authorization" : `Token ${USER_TOKEN}`
            }
      })

      console.log(res)
      setStatus("info")
      setMessage("Password Karyawan Berhasil diubah")
      setSnack(true)
      setRest(false)
  }catch(error){
      if( error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
          ){
            setStatus("error")
            setMessage("Error")
            setSnack(true)
      }
  }
};

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setDateJoin(dated.slice(1, 11))
  }

  const convDateEnd = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setDateEnded(dated.slice(1, 11))
  }

  const convDated = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setBirthDate(dated.slice(1, 11))
  }

  const AwalKontrak = (newdate) => {
    let event = new Date(newdate);
    let date = JSON.stringify(event);
    setAwalKontrak(date.slice(1, 11))
  }

  const AkhirKontrak = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setAkhirKontrak(dated.slice(1, 11))
  }

  const handleClose = () => {
    setSnack(false)
  };

  const genderEmployee = [
    {'id': 1,
    'name' : 'Laki-Laki'
  },
    {
      'id':2,
      'name' : 'Perempuan'}
  ]

  const showPassword = () => {
    setVisib("text")
  }
  const hiddenPassword = () => {
      setVisib("password")
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
                          <div className="card shadow-card" style={{ border:'none', borderRadius:'12px' }}>
                              <div className="card-body">
                                      <button onClick={() => navigate(-1)} className="d-flex align-items-center btn">
                                          <ArrowBackIos />
                                          <h5 style={{ marginTop:'7px'}}>Detail Karyawan</h5>
                                      </button>

                                      <Col md={12} className='mb-2 text-secondary d-flex'>
                                        <Col md={12}>
                                          <div className="row">
                                            <Box sx={{ mr:2 }}>
                                                {/* <TextField value={name ? name : names} disabled id='name' label='Nama karyawan' sx={{ mt:3, mr:1 }}  /> */}
                                                <TextField value={employee_code} onChange={e => setEmployeeCode(e.target.value)} label='Employee Code' sx={{ mt:3, mr:1 }} variant='outlined' />
                                                <TextField value={nama_depan} onChange={e => setNamaDepan(e.target.value)} label='Nama Depan' sx={{ mt:3, mr:1 }} variant='outlined' />
                                                <TextField value={nama_belakang} onChange={e => setNamaBelakang(e.target.value)} label='Nama Belakang' sx={{ mt:3, mr:1 }} variant='outlined' />
                                                <TextField value={username} onChange={e => setUsername(e.target.value)} id='username' label='Username' sx={{ mt:3, mr:1 }} variant='outlined' />
                                            </Box>
                                            <Box sx={{ mr:2 }}>
                                                <TextField value={email} onChange={e => setEmail(e.target.value)} id='email' label='Email' sx={{ mt:3, mr:1 }} variant='outlined' />
                                                <TextField value={sisa_cuti} onChange={e => setSisaCuti(e.target.value)} type='number' label='Sisa Cuti' sx={{ mt:3, mr:1 }} variant='outlined' />
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Masuk"
                                                    inputFormat="DD MMMM YYYY"
                                                    value={new Date(date_join)}
                                                    onChange={(newValue) => {
                                                        convDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3 }} {...params} />}
                                                    />
                                                    {active_user !== true ? 
                                                    <MobileDatePicker
                                                    label="Berhenti Bekerja"
                                                    inputFormat="DD MMMM YYYY"
                                                    value={new Date(date_ended)}
                                                    onChange={(newValue) => {
                                                      convDateEnd(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3, ml:1 }} {...params} />}
                                                    /> : null
                                                    }
                                                </LocalizationProvider>
                                                <FormControl sx={{ mt: 3, ml:1, minWidth: 220 }}>
                                                    <InputLabel id="role-label" variant='outlined'>Roles</InputLabel>
                                                    <Select
                                                    variant='outlined'
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
                                                <TextField value={religion} onChange={e => setReligion(e.target.value)} variant='outlined' label='Agama' sx={{ mt:3, mr:1 }}  />
                                                <FormControl sx={{ mt: 3, mr:1, minWidth: 220 }}>
                                                    <InputLabel id="jenkel-label">Jenis Kelamin</InputLabel>
                                                    <Select
                                                    variant='outlined'
                                                    labelId="Jenis Kelamin"
                                                    id="Jenis Kelamin"
                                                    value={gender}
                                                    onChange={handleGend}
                                                    label="Jenis Kelamin"
                                                    >
                                                        {genderEmployee && genderEmployee.map((div, index) => {
                                                            return(
                                                                <MenuItem value={div.name} key={index}>{div.name}</MenuItem>
                                                            )
                                                        })}
                                                   
                                                    </Select>
                                                </FormControl>
                                                {/* <TextField value={gender} onChange={e => setGender(e.target.value)} type='text' label='Jenis Kelamin' sx={{ mt:3, mr:1 }}  /> */}
                                               
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Lahir"
                                                    inputFormat="DD MMMM YYYY"
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
                                                    variant='outlined'
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

                                            <Box sx={{ mr:2 }}>
                                                
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Awal Kontrak"
                                                    inputFormat="DD MMMM YYYY"
                                                    value={new Date(awal_kontrak)}
                                                    onChange={(newValue) => {
                                                      AwalKontrak(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3, mr:1 }} {...params} />}
                                                    />
                                                </LocalizationProvider>

                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Akhir Kontrak"
                                                    inputFormat="DD MMMM YYYY"
                                                    value={new Date(akhir_kontrak)}
                                                    onChange={(newValue) => {
                                                      AkhirKontrak(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3, mr:1 }} {...params} />}
                                                    />
                                                </LocalizationProvider>

                                                <TextField value={contract_time} variant='outlined' label='Lama Kontrak' sx={{ mt:3, mr:1 }}  />
                                                <FormControlLabel sx={{ mt:4, ml:1 }} onChange={handleChangeActive} control={active_user ? <Checkbox checked /> : <Checkbox />} label={active_user ? "Karyawan aktif" : "Karyawan aktif"} />
                                            </Box>

                                            <Box sx={{ mt:2}}>
                                              <button className='btn text-primary' onClick={resetPasswordEmployee}>Reset Password User</button>
                                              {rest === true ?
                                              <Box sx={{ mt:2}}>
                                                <Box sx={{ display:'flex' }}>
                                                  <TextField label='Password baru' onChange={e => setPasswordNew(e.target.value)} value={password_new} sx={{ mr:2 }} type={visib} />
                                                  <span onClick={visib === "password" ? showPassword : hiddenPassword} className="field-icon">
                                                    {visib === "password" ?
                                                        <Visibility style={{ color: "#80848C"}} /> : (
                                                            <VisibilityOff style={{ color: "#80848C"}} />
                                                        )
                                                    }
                                                    </span>
                                                </Box>
                                                  <Box>
                                                    <button className='btn btn-primary mt-2' onClick={postNewPassword}>Reset Password</button>
                                                  </Box>
                                              </Box>
                                              : null}
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
                          <div className="card shadow-card mt-2" style={{ border:'none', borderRadius:'12px' }}>
                            <div className="card-body">
                              <h5 className='card-title'>Pengajuan Cuti {nama_depan + ' ' + nama_belakang} &nbsp; {yearToday}</h5>
                              <SubmissionTableComponents tableData={submission_cuti && submission_cuti} link='/perizinan/detail' />
                            </div>
                          </div>
                          <div className="card shadow-card mt-2" style={{ border:'none', borderRadius:'12px' }}>
                            <div className="card-body">
                              <h5 className='card-title'>Notes Cuti {nama_depan + ' ' + nama_belakang} &nbsp; {yearToday} </h5>
                              <HRTableNotesComponents tableData={notes_cuti && notes_cuti} link={`/notes/detail`} />
                            </div>
                          </div>
                          <Snackbar
                            anchorOrigin={{ vertical : 'top', horizontal: 'right' }}
                            open={snack}
                            onClose={handleClose}
                            autoHideDuration={6000}
                            // key={vertical + horizontal}
                          >
                          <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                            {message && message}
                          </Alert>
                        </Snackbar>
                      </Col>
                  </div>
              </main>
          </div>

        </div>
    </React.Fragment>
  )
}

export default DetailEmployee