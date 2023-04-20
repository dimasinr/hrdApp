import React,{useState, useEffect} from 'react'
import './presence.css'
import axios from 'axios'
import SideBar from '../../Hrd/Components/SideBar'
import { Col } from 'react-bootstrap'
import { BASE_URL, NAMES, USER_TOKEN } from '../../fetch/fetch'
import { CircularProgress } from '@mui/material'
import { TextField, Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert, Backdrop} from '@mui/material';
import { bulan } from './utlis/arrayfuc'
import { zeta, delta } from './utlis/utlis'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { EmployeeTableComponents } from '../Components/Table/EmployeeTableComponents'
import { StyledPagination } from '../Components/Pagination/PaginationEmployee'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SelfListPresence() {

  const [search_month, setSearchMonth] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [loadingBut, setLoadingBut] = useState('Tambah')

  const [employee_id, setEmployeeName] = React.useState('')
  const [working_hour, setWorkingHour] = React.useState('')
  const [lembur_hour, setLemburHour] = React.useState('')
  const [dates, setDates] = React.useState(new Date().toISOString().slice(0,10))
  const keterangan = ""

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
    axios.get(`${BASE_URL}/api/presence/employees/?limit=15&offset=${offSet}&months=${search_month}`,{
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
  useEffect(() => getListPresence(), [offSet, search_month])

  const itemsPerPage = 15;
  const pageCount = Math.ceil(presence_paginate.count / itemsPerPage);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const getEmployeeData = () => {
    axios.get(`${BASE_URL}/users/employee/search/`,{
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

    const loadAttendance =() =>{
    setLoadingBut('loading ...')
    addNewAttendance()
    }

    const convDate = (newdate) => {
      let event = new Date(newdate);
      let dated = JSON.stringify(event);
      setDates(dated.slice(1, 11))
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
                    <h4>List Absensi {NAMES}</h4>
                  </div>
                  <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                    <Box sx={{ display: 'flex' }}>
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
                      </Box>
                     
                    </Col>
                 
                <hr />
                  {loading && loading ?
                    <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                  >
                  <CircularProgress color="inherit" /></Backdrop> : 
                   <EmployeeTableComponents tableData={list_presence} />
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
                          <MobileDatePicker
                          label="Working Date"
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
