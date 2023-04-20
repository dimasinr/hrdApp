import React,{useState, useEffect} from 'react'
import SideBar from '../../Components/SideBar'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField } from '@mui/material';
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select, FormControl, MenuItem} from '@mui/material';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

  const columns = [
      { field: 'id', headerName: 'Att Id', width: 70 },
      { field: 'employee_name', headerName: 'Nama Karyawan', width: 140 },
      { field: 'working_date', headerName: 'Tanggal Hari Kerja', width: 150 },
      { field: 'days', headerName: 'Hari', width: 110 },
      { field: 'start_from', headerName: 'Masuk Kerja', width: 120 },
      { field: 'end_from', headerName: 'Pulang Kerja', width: 120 },
      { field: 'working_hour', headerName: 'Total Jam Kerja', width: 120 },
      { field: 'lembur_start', headerName: 'Mulai Lembur', width: 120 },
      { field: 'lembur_end', headerName: 'Selesai Lembur', width: 120 },
      { field: 'lembur_hour', headerName: 'Total Jam Lembur', width: 120 },
  ];
  
  const LoadingSkeleton = () => (
    <Box
      sx={{
        height: 'max-content',
      }}
    >
      {[...Array(1)].map((_, index) => (
        <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} key={index} />
      ))}
    </Box>
  );

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function AbsensiByEmployee() {

  const navigate = useNavigate()
  const [list_pengajuan, setListPengajuan] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [loadingBut, setLoadingBut] = useState('Tambah')


  const [employee_names, setEmployeeName] = React.useState('')
  const [working_hour, setWorkingHour] = React.useState('')
  const [lembur_hour, setLemburHour] = React.useState('')
  const [dates, setDates] = React.useState(new Date().toISOString().slice(0,10))

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const [searchEmployee, setSearchEmployee] = useState('')
  const [searchMonth, setSearchMonth] = useState('')

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/attendance/employee-sea/?employee_name=${searchEmployee}&months=${searchMonth}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setListPengajuan(res)
      setLoading(false)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [searchEmployee, searchMonth])

  const [employeeS, setEmployeeS] = useState([])
  const getEmployeeData = () => {
    axios.get(`${BASE_URL}/users/employee/search/?name=${searchEmployee}`,{
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
  useEffect(() => getEmployeeData(), [searchEmployee])


  const handleRowClick = (params) => {
    navigate(`/employee/absensi/${params.row.id}`)
  };

  function delta(x){
    let deltaX = x.toString()
    const data = deltaX.slice(0,5)
    const zer = deltaX.slice(0,1)
    if(zer === '0'){
      return deltaX.slice(1,5).replace(':', '')
    }else{
      return data.replace(':', '')
    }
  }

  function zeta(x){
    let deltaX = x.toString()
    let lent = x.length
    const yVar = lent-5
    const data = deltaX.slice(yVar, lent)
    const zer = data.slice(0,1)
      if(zer === '0'){
        return data.slice(1,5).replace(':', '')
      }else{
        return data.replace(':', '')
      }
  }


  const jam_masuk = delta(working_hour)
  const jam_keluar = zeta(working_hour)

  const lembur_start = delta(working_hour)
  const lembur_end = delta(working_hour)

  const addNewAttendance = async e => {
  try{
      const formData = new FormData();
      formData.append("employee_name", employee_names);
      formData.append("working_date", dates);
      if(working_hour !== ''){
        formData.append("start_from", jam_masuk);
        formData.append("end_from", jam_keluar);
      }
      if(lembur_hour !== ''){
        formData.append("lembur_start", lembur_start);
        formData.append("lembur_end", lembur_end);
      }
     await axios({
          method: 'post',
          url:`${BASE_URL}/attendance/employees/`,
          data: formData,
          headers: {
              "Authorization" : `Token ${USER_TOKEN}`
            }
      })
      setOpen(false)
      Swal.fire({
          icon: 'success',
          title: `Data Berhasil dibuat`,
          showConfirmButton: false,
          timer: 1500
        })
        setLoadingBut('simpan')
        getListPengajuan()
      }catch(error){
          if( error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
              ){
                  Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                // text: `${error.response.data.detail}`
              })
              setLoadingBut('Tambah')
              setOpen(false)
              getListPengajuan()
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

    const handleChanged = (event) => {
      setEmployeeName(event.target.value);
    };

    const bulan = [
      {
        'month': 'All',
        'value': ''
      },
      {
        'month': 'Januari',
        'value': 1
      },
      {
        'month': 'Febuari',
        'value': 2
      },
      {
        'month': 'Maret',
        'value': 3
      },
      {
        'month': 'April',
        'value': 4
      },
      {
        'month': 'Mei',
        'value': 5
      },{
        'month': 'Juni',
        'value': 6
      },
      {
        'month': 'Juli',
        'value': 7
      },
      {
        'month': 'Agustus',
        'value': 8
      },
      {
        'month': 'September',
        'value': 9
      },
      {
        'month': 'Oktober',
        'value': 10
      },
      {
        'month': 'November',
        'value': 11
      },
      {
        'month': 'Desember',
        'value': 12
      }
  
    ]

    const handleGend = (event) => {
      setSearchMonth(event.target.value);
    };

return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
        <main className="container mt-2">
                <div className='d-flex justify-content-center'>
                    <Col md={12} sm={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                            <div className="card-body">
                                <div className="card-title">
                                  <h4>Absensi Karyawan</h4>
                                </div>
                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                      <Box>
                                        <TextField placeholder='Nama Lengkap' sx={{ mt:3, mr:2, mb:1 }} value={searchEmployee} onChange={e => setSearchEmployee(e.target.value)} />
                                        <FormControl sx={{ mr:1, mt:3, minWidth: 220 }}>
                                          <InputLabel id="tahun-label">Pilih bulan</InputLabel>
                                          <Select
                                          // variant='standard'
                                          labelId="Tahun"
                                          id="Tahun"
                                          value={searchMonth}
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
                                      <button className='btn btn-primary'>Search Pages</button>
                                        {/* <TextField placeholder='Pilih Bulan' sx={{ mt:3 }} value={searchMonth} onChange={e => setSearchMonth(e.target.value)} /> */}
                                      </Box>
                                      <button onClick={handleClickOpen} className='btn btn-primary' style={{ height:'35px' }}>Tambah Data</button>
                                    </Col>
                                    
                                    <Col md={12}>
                                       <div style={{ height: 1280, width: '100%' }}>
                                        <DataGrid
                                        rows={list_pengajuan}
                                        columns={columns}
                                        pageSize={31}
                                        rowsPerPageOptions={[31]}
                                        getRowId={(row) => row.id}
                                        onRowClick={handleRowClick}
                                        components={{
                                            LoadingOverlay: LoadingSkeleton,
                                          }}
                                          loading={loading}
                                        />
                                        </div>
                                    </Col>
                            </div>
                        </div>
                    </Col>
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
                              value={employee_names}
                              onChange={handleChanged}
                              label="Divisi"
                              >
                                  {employeeS && employeeS.map((emp, index) => {
                                      return(
                                          <MenuItem value={emp.name} key={index}>{emp.name}</MenuItem>
                                      )
                                  })}
                              
                              </Select>
                          </FormControl>
                          {/* <TextField value={employee_names} fullWidth onChange={e => setEmployeeName(e.target.value)} sx={{ mr:1 }} label='Nama Karyawan' /> */}
                          
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
                          <TextField disabled value={lembur_hour} fullWidth onChange={e => setLemburHour(e.target.value)} sx={{ mr:1 }} label='Jam Lembur' />
                        </Box>
                     
                       
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={loadAttendance}>{loadingBut && loadingBut}</Button>
                    </DialogActions>
                  </Dialog>
                </div>
            </main>
        </div>
    </div>
  )
}

export default AbsensiByEmployee