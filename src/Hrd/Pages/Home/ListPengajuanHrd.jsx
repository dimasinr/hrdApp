import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, ROLES } from '../../../fetch/fetch'
import {  FormControl, InputLabel, Select, MenuItem, TextField, Backdrop, CircularProgress } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import runOneSignal from '../../../oneSignal/oneSignal'
import SideBar from '../../Components/SideBar'
import { SubmissionTableComponents } from '../../../Karyawan/Components/Table/EmployeeTableComponents'

function ListPengajuanHrd() {

    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const [perizinan, setPerizinan] = React.useState('')
    const [start_dates, setStartDates] = React.useState('')
    const [end_dates, setEndDates] = React.useState('')
    const [employees, setEmployess] = React.useState('')
    const [list_pengajuan, setListPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    const getListPengajuan = () => {
      axios.get(`${BASE_URL}/api/submission/employees/?permission_type=${perizinan}&start_date=${start_dates}&end_date=${end_dates}&employee_name=${employees}`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setListPengajuan(res.results)
        setLoading(false)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getListPengajuan(), [perizinan, start_dates, end_dates, employees])
  
    const handleChange = (event) => {
      setPerizinan(event.target.value);
  };

  const handled = () => {
    setOpen(!open);
  };

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setStartDates(dated.slice(1, 11))
  }

  const convDates = (newdates) => {
    let event = new Date(newdates);
    let dated = JSON.stringify(event);
    setEndDates(dated.slice(1, 11))
  }

  React.useEffect(() => {
    runOneSignal();
  },[])

  if(ROLES === 'employee' || ROLES === 'atasan' ){
    localStorage.clear()
    navigate('/')
  }

  return (
    <React.Fragment>
        <div className="d-flex">
        <SideBar />
         <div  id="image__background">
         <main className="container" style={{ marginTop:'75px'}}>
                <div className='mt-4'>
                <Col md={12} sm={12}>
                            <div className="card shadow_card" style={{ border:'none', borderRadius:'12px' }}>
                                <div className="card-body">
                                    {ROLES === 'hrd' || ROLES === 'superuser' ? 
                                    <React.Fragment>
                                    <h5>List Pengajuan</h5>

                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                          <Col md={9} className="mt-2">
                                            <FormControl sx={{ mr: 1, mt:1, minWidth: 120 }}>
                                              <InputLabel id="demo-controlled-open-select-label">Perizinan</InputLabel>
                                              <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={open}
                                                onClose={handled}
                                                onOpen={handled}
                                                value={perizinan}
                                                label="Age"
                                                onChange={handleChange}
                                              >
                                                <MenuItem value={'ijin'}>Ijin</MenuItem>
                                                <MenuItem value={'sakit'}>Sakit</MenuItem>
                                                <MenuItem value={'cuti'}>Cuti</MenuItem>
                                                <MenuItem value={'lembur'}>Lembur</MenuItem>
                                                <MenuItem value={''}>All</MenuItem>
                                              </Select>
                                            </FormControl>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDatePicker
                                                label="Tanggal Awal"
                                                value={new Date(start_dates)}
                                                onChange={(newValue) => {
                                                    convDate(newValue);
                                                }}
                                                renderInput={(params) => <TextField variant='outlined' sx={{ mr:1, mt:1 }} {...params} />}
                                                />
                                                <MobileDatePicker
                                                label="Tanggal Berakhir"
                                                value={new Date(end_dates)}
                                                onChange={(newValue) => {
                                                    convDates(newValue);
                                                }}
                                                renderInput={(params) => <TextField variant='outlined' sx={{ mt:1 }} {...params} />}
                                                />
                                            </LocalizationProvider>
                                          </Col>
                                          <Col md={2}>
                                            <TextField placeholder='Cari Nama Karyawan' sx={{ mt:3 }} value={employees} onChange={e => setEmployess(e.target.value)} />
                                          </Col>

                                        </Col>
                                        <hr />

                                        <Col md={12}>
                                          {loading && loading ? 
                                             <Backdrop
                                             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                             open={loading}
                                           >
                                           <CircularProgress color="inherit" /></Backdrop> :
                                        <SubmissionTableComponents tableData={list_pengajuan} link='/perizinan/detail' />
                                        }
                                        </Col>
                                    </React.Fragment>
                                    :
                                    <div className="d-flex justify-content-center">Anda Login Sebagai {ROLES}. Anda tidak dapat mengakses fitur di menu HR</div>
                                    }

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

export default ListPengajuanHrd