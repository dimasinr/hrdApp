import React,{useState, useEffect} from 'react'
import './presence.css'
import axios from 'axios'
import { Table, Col } from 'react-bootstrap'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import { CircularProgress } from '@mui/material'
import { workHour, totalWorkHour, datesUpt, totalWorking, changeDayName } from '../../../../Components/utilsFunction/functionUtils'
import { TextField, Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material'
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import SideBar from '../../../Components/SideBar'
import { Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { bulan } from './utlis/arrayfuc'
import { zeta, delta } from './utlis/utlis'
import Swal from 'sweetalert2'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'end',
  borderRadius: '50%',
  marginTop: '1rem',
  borderColor: '#84B5E7',
  '& .MuiPaginationItem-root': {
    color: '#2C3E50',
    borderRadius: '50%',
    borderColor: '#84B5E7',

  },
  '& .Mui-selected': {
    backgroundColor: '#E3EEFA',
    color: '#1976D5',
  },
});


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListPresence() {

    const navigate = useNavigate()
  const [search_name, setSearchName] = useState([])
  const [search_month, setSearchMonth] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [loadingBut, setLoadingBut] = useState('Tambah')

  const [employee_names, setEmployeeName] = React.useState('')
  const [working_hour, setWorkingHour] = React.useState('')
  const [lembur_hour, setLemburHour] = React.useState('')
  const [dates, setDates] = React.useState(new Date().toISOString().slice(0,10))

  const [employeeS, setEmployeeS] = useState([])
  const [list_presence, setListPresence] = useState([])
  const [presence_paginate, setPresencePaginate] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0)

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
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPresence(), [search_name, offSet, search_month])

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
        getListPresence()
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
              getListPresence()
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
                    <h4>List Absensi Karyawan</h4>
                    <small className='text-secondary'>Klik tanda dibagian action untuk detail absensinya.</small>
                  </div>
                  <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
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
                      {/* <button className='btn btn-primary'>Search Pages</button> */}
                      <button onClick={handleClickOpen} className='btn btn-primary' style={{ marginLeft:'5px' }}>Tambah Data</button>
                      </Box>
                    </Col>
                 
                <hr />
                  {loading && loading ?
                    <CircularProgress /> : 
                    <Table hover bordered responsive>
                    <thead className='head_color_presence'>
                      <tr>
                        <th>Pid</th>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Hari Kerja</th>
                        <th>Mulai</th>
                        <th>Pulang</th>
                        <th>Total Jam</th>
                        <th>LemburS</th>
                        <th>LemburE</th>
                        <th>Total Jam Lembur</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list_presence.map((lpres, index) => {
                        return(
                          <tr className='text_presence' key={index}>
                              <td className='text_presence'>{lpres.id ? lpres.id : 0}</td>
                              <td className='text_presence'>{lpres.employee ? lpres.employee && lpres.employee.name : "ex karyawan"}</td>
                              <td>{lpres.working_date ? datesUpt(lpres.working_date) : "Tanggal tidak tertera"}</td>
                              <td>{lpres.days ? changeDayName(lpres.days) : "Hari tidak diketahui"}</td>
                              <td>{lpres.start_from ? workHour(lpres.start_from) : "-"}</td>
                              <td>{lpres.end_from ? workHour(lpres.end_from) : "-"}</td>
                              <td>{lpres.working_hour === 0 || lpres.working_hour > 0 ? totalWorking(lpres.working_hour) : "-"}</td>
                              <td>{lpres.lembur_start ? workHour(lpres.lembur_start) : "-"}</td>
                              <td>{lpres.lembur_end ? workHour(lpres.lembur_end) : "-"}</td>
                              <td>{lpres.lembur_hour === 0 || lpres.lembur_hour > 0 ? totalWorkHour(lpres.lembur_hour) : "-"}</td>
                              {/* <Link style={{ textDecoration:'none' }} to={`/employee/absensi/${lpres.id}`}> */}
                                <td className='toOnc' onClick={() => {navigate(`/employee/absensi/${lpres.id}`)}}><Visibility /></td>
                              {/* </Link> */}
                            </tr>
                        )
                      })}
                      
                    </tbody>
                  </Table>
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
                        value={employee_names}
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
             
          </main>
      </div>
    </div>
</React.Fragment>
  )
}
