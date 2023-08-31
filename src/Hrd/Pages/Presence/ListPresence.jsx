import React,{useState, useEffect} from 'react'
import './presence.css'
import axios from 'axios'
import { Col } from 'react-bootstrap'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { CircularProgress } from '@mui/material'
import { TextField, Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Backdrop} from '@mui/material';
import SideBar from '../../Components/SideBar'
import { bulan } from './utlis/arrayfuc'
import { zeta, delta } from './utlis/utlis'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { HRTableComponents } from '../../../Karyawan/Components/Table/EmployeeTableComponents'
import { StyledPagination } from '../../../Karyawan/Components/Pagination/PaginationEmployee'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListPresence() {

  const [search_name, setSearchName] = useState([])
  const [search_month, setSearchMonth] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [openWfh, setOpenWfh] = useState(false)
  const [loadingBut, setLoadingBut] = useState('Tambah')

  const [employee_id, setEmployeeName] = React.useState('')
  const [working_hour, setWorkingHour] = React.useState('')
  const [lembur_hour, setLemburHour] = React.useState('')
  const [dates, setDates] = React.useState(new Date().toISOString().slice(0,10))
  const keterangan = ""

  const [start_date, setStartDate] = useState(new Date().toISOString().slice(0,10))
  const [end_date, setEndDate] = useState(new Date().toISOString().slice(0,10))

  const [employeeS, setEmployeeS] = useState([])
  const [list_presence, setListPresence] = useState([])
  const [presence_paginate, setPresencePaginate] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0)

  // snackbar
  const [snack, setSnack] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [message, setMessage] = React.useState(false);

  const handleClose = () => {
    setSnack(false)
  };

  const getListPresence = () => {
    axios.get(`${BASE_URL}/api/presence/employees/?limit=15&offset=${offSet}&employee=${search_name}&months=${search_month}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })  
    .then((response) => {
      const res = response.data
      setPresencePaginate(res)
      setListPresence(res.results)
      setLoading(false)
      console.log(res)
      window.scrollTo({ top: 0, behavior: 'smooth' });

    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPresence(), [search_name, offSet, search_month])

  const itemsPerPage = 15;
  const pageCount = Math.ceil(presence_paginate.count / itemsPerPage);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClickOpenWFH = () => {
    setOpenWfh(!openWfh);
  };

  const getEmployeeData = () => {
    axios.get(`${BASE_URL}/users/employee/search/?active=True`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setEmployeeS(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getEmployeeData(), [])

  const jam_masuk = delta(working_hour)
  const jam_keluar = zeta(working_hour)

  const lembur_start = delta(lembur_hour)
  const lembur_end = zeta(lembur_hour)

  const addNewAttendance = async e => {
  try{
      const formData = new FormData();
      formData.append("employee", employee_id);
      formData.append("working_date", dates);
      if(working_hour !== ''){
        formData.append("start_from", jam_masuk);
        formData.append("end_from", jam_keluar);
      }
      if(lembur_hour !== ''){
        formData.append("lembur_start", lembur_start);
        formData.append("lembur_end", lembur_end);
      }
      formData.append("ket", keterangan)
     const res = await axios({
          method: 'post',
          url:`${BASE_URL}/api/presence/employees/`,
          data: formData,
          headers: {
              "Authorization" : `Token ${USER_TOKEN}`
            }
      })
      setOpen(false)
      setMessage(`${res.data.message}`)
      setStatus('info')
      setSnack(true)
      setLoadingBut('simpan')
      getListPresence()
      console.log(res)
      }catch(error){
          if( error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
              ){
              setLoadingBut('Tambah')
              setOpen(false)
              setMessage(`${error.response.data.message}`)
              setStatus('info')
              setSnack(true)
              getListPresence()
              console.log(error)
          }
      }
    };

  const addNewAttendanceWFH = async e => {
      try{
          const formData = new FormData();
          formData.append("user_id", employee_id);
          formData.append("start_date", start_date);
          formData.append("end_date", end_date);
         const res = await axios({
              method: 'post',
              url:`${BASE_URL}/api/presence/generate-wfh/`,
              data: formData,
              headers: {
                  "Authorization" : `Token ${USER_TOKEN}`
                }
          })
          setOpen(false)
          setMessage(`${res.data.message}`)
          setStatus('info')
          setSnack(true)
          setLoadingBut('simpan')
          getListPresence()
          console.log(res)
          }catch(error){
              if( error.response &&
                  error.response.status >= 400 &&
                  error.response.status <= 500
                  ){
                  setLoadingBut('Tambah')
                  setOpen(false)
                  setMessage(`${error.response.data.message}`)
                  setStatus('info')
                  setSnack(true)
                  getListPresence()
                  console.log(error)
              }
          }
        };

    const loadAttendance =() =>{
    setLoadingBut('loading ...')
    addNewAttendance()
    }

    const loadAttendanceWFH =() =>{
      setLoadingBut('loading ...')
      addNewAttendanceWFH()
      }

    const convDate = (newdate) => {
      let event = new Date(newdate);
      let dated = JSON.stringify(event);
      setDates(dated.slice(1, 11))
    }

    const convDateStartWFH = (newdate) => {
      let event = new Date(newdate);
      let dated = JSON.stringify(event);
      setStartDate(dated.slice(1, 11))
    }

    const convDateEndWFH = (newdate) => {
      let event = new Date(newdate);
      let dated = JSON.stringify(event);
      setEndDate(dated.slice(1, 11))
    }

    const handleGend = (event) => {
      setSearchMonth(event.target.value);
    };

    const handleChanged = (event) => {
      setEmployeeName(event.target.value);
    };

  return (
    <React.Fragment>
    <div className="d-flex">
    <SideBar />
      <div id="image__background">
          <main className="container" style={{ marginTop:'74px' }}>
            <div className="col-md-12 mt-4">
              <div className="card mb-4" style={{ borderRadius:'10px', border:'none' }}>
                <div className="card-body">
                 <div className="card-title">
                    <h4>List Absensi Karyawan</h4>
                    <small className='text-secondary'>Klik tanda dibagian action untuk detail absensinya.</small>
                  </div>
                  <Col md={12} className='mb-2 text-secondary d-flex justify-content-between align-items-center'>
                    <Box sx={{ display: 'flex' }}>
                        <TextField placeholder='Nama Lengkap' sx={{ mt:3, mr:2, mb:1 }} value={search_name} onChange={e => setSearchName(e.target.value)} />
                        <FormControl sx={{ mr:1, mt:3, minWidth: 220 }}>
                          <InputLabel id="tahun-label">Pilih bulan</InputLabel>
                          <Select
                          // variant='standard'
                          labelId="Tahun"
                          id="Tahun"
                          value={search_month}
                          onChange={handleGend}
                          label="Tahun"
                          >
                              {bulan && bulan.map((div, index) => {
                                  return(
                                      <MenuItem value={div.value} key={index}>{div.month}</MenuItem>
                                  )
                              })}
                          
                          </Select>
                      </FormControl>
                        {/* <TextField placeholder='Pilih Bulan' sx={{ mt:3 }} value={searchMonth} onChange={e => setSearchMonth(e.target.value)} /> */}
                      </Box>
                     
                      <Box>
                      <button onClick={handleClickOpenWFH} className='btn btn-primary' style={{ marginLeft:'5px' }}>Tambah Data WFH</button>
                      <button onClick={handleClickOpen} className='btn btn-primary' style={{ marginLeft:'5px' }}>Tambah Data</button>
                      </Box>
                    </Col>
                 
                <hr />
                  {loading && loading ?
                    <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                  >
                  <CircularProgress color="inherit" /></Backdrop> : 
                        <HRTableComponents tableData={list_presence} link={`/employee/absensi`} />
                  }
                  <StyledPagination
                        count={pageCount}
                        page={currentPage + 1}
                        onChange={(event, page) => {
                          setCurrentPage(page - 1)
                          setOffSet(page*itemsPerPage-15)
                        }}
                        variant="outlined"
                        shape="rounded"
                        // size="large"
                      />
                      <hr />

                </div>
              </div>
            </div>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClickOpen}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Tambah Data Karyawan"}</DialogTitle>
              <DialogContent sx={{ width:520 }}>
                <DialogContentText id="alert-dialog-slide-description">
                  <Box sx={{ mt:2, display:'flex' }}>
                    <FormControl sx={{ mr:1, minWidth: 220 }}>
                        <InputLabel id="division-label">Nama Karyawan</InputLabel>
                        <Select
                        labelId="division"
                        id="division"
                        value={employee_id}
                        onChange={handleChanged}
                        label="Divisi"
                        >
                            {employeeS && employeeS.map((emp, index) => {
                                return(
                                    <MenuItem value={emp.pk} key={index}>{emp.name}</MenuItem>
                                )
                            })}
                        
                        </Select>
                    </FormControl>
                    {/* <TextField value={employee_id} fullWidth onChange={e => setEmployeeName(e.target.value)} sx={{ mr:1 }} label='Nama Karyawan' /> */}
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Working Date"
                          inputFormat="DD MMMM YYYY"
                          value={new Date(dates)}
                          onChange={(newValue) => {
                              convDate(newValue);
                          }}
                          renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
                          />
                      </LocalizationProvider>
                  </Box>

                  <Box sx={{ mt:2, mb:2, display:'flex' }}>
                    <TextField value={working_hour} fullWidth onChange={e => setWorkingHour(e.target.value)} sx={{ mr:1 }} label='Jam Kerja' />
                  </Box>
                  <small className='text-secondary mt-2'>(opsional jika ingin input lembur manual)</small>
                  <Box sx={{ display:'flex' }}>
                    <TextField value={lembur_hour} fullWidth onChange={e => setLemburHour(e.target.value)} sx={{ mr:1 }} label='Jam Lembur' />
                  </Box>
                
                  
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickOpen}>Tutup</Button>
                <Button onClick={loadAttendance}>{loadingBut && loadingBut}</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openWfh}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClickOpenWFH}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Tambah Data Karyawan WFH"}</DialogTitle>
              <DialogContent sx={{ width:520 }}>
                  <Box sx={{ mt:2}}>
                    <FormControl fullWidth sx={{ mr:1, minWidth: 220 }}>
                        <InputLabel id="division-label">Nama Karyawan</InputLabel>
                        <Select
                        fullWidth
                        labelId="division"
                        id="division"
                        value={employee_id}
                        onChange={handleChanged}
                        label="Divisi"
                        >
                            {employeeS && employeeS.map((emp, index) => {
                                return(
                                    <MenuItem  value={emp.pk} key={index}>{emp.name}</MenuItem>
                                )
                            })}
                        
                        </Select>
                    </FormControl>
                    {/* <TextField value={employee_id} fullWidth onChange={e => setEmployeeName(e.target.value)} sx={{ mr:1 }} label='Nama Karyawan' /> */}
                  </Box>
                  <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Start WFH"
                          inputFormat="DD MMMM YYYY"
                          value={new Date(start_date)}
                          onChange={(newValue) => {
                              convDateStartWFH(newValue);
                          }}
                          renderInput={(params) => <TextField sx={{ mt: 2}} fullWidth variant='outlined' {...params} />}
                          />
                      </LocalizationProvider>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="End WFH"
                          inputFormat="DD MMMM YYYY"
                          value={new Date(end_date)}
                          onChange={(newValue) => {
                              convDateEndWFH(newValue);
                          }}
                          renderInput={(params) => <TextField sx={{ mt: 2}} fullWidth variant='outlined' {...params} />}
                          />
                      </LocalizationProvider>
                  </Box>

              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickOpenWFH}>Tutup</Button>
                <Button onClick={loadAttendanceWFH}>{loadingBut && loadingBut}</Button>
              </DialogActions>
            </Dialog>

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
             
          </main>
      </div>
    </div>
</React.Fragment>
  )
}
