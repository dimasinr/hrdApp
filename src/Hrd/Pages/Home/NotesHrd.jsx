import React, {useState} from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Swal from 'sweetalert2'
import SideBar from '../../Components/SideBar'

const columns = [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'employee_name', headerName: 'Nama Karyawan', width: 190 },
      { field: 'date_note', headerName: 'Tanggal Catatan', width: 180 },
      { field: 'type_notes', headerName: 'Type', width: 120 },
      { field: 'notes', headerName: 'Notes', width: 520 },
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

function NotesHrd() {

    const navigate = useNavigate()
    const [employees_name, setemployeesName] = useState('')
    const [note_dates, setNotesDate] = useState('')
    const [list_pengajuan, setListPengajuan] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);

    const [employeName, setEmployeName] = useState('')
    const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0,10))
    const [type_notes, setTypeNotes] = useState('catatan')
    const [notes_employee, setNotesEmployee] = useState('')
  
    const [year, setYear] = useState('')
    const [month, setSearchMonth] = useState('')
    
    const handleYear = (event) => {
      setYear(event.target.value);
    };

    const handleClickOpen = () => {
      setOpen(!open);
    };

    const handleMonth = (event) => {
      setSearchMonth(event.target.value);
    };

    
    // const getListPengajuan = () => {
    //   axios.get(`${BASE_URL}/users/employee/?sisa_cuti=${perizinan}&tanggal_cuti=${note_dates}&jatah_cuti=${end_dates}&employee_name=${employees}`,{
    //     headers: {
    //       "Authorization" : 'Token ' + USER_TOKEN
    //     }
    //   })
    //   .then((response) => {
    //     const res = response.data
    //     setListPengajuan(res)
    //     setLoading(false)
    //     console.log(res)
    //   })
    // }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // React.useEffect(() => getListPengajuan(), [perizinan, note_dates, end_dates, employees])
  
  //   function merge(array1, array2, prop) {
  //     return array2.map(function (item2) {
  //         var item1 = array1.find(function (item1) {
  //             return item1[prop] === item2[prop];
  //         });
  //         return Object.assign({}, item1, item2);
  //     });
  // }
  
  // const ca = merge(dataCharts, list_pengajuan, 'index');

     const getListPengajuan = () => {
      axios.get(`${BASE_URL}/notes/list/?employee_name=${employees_name}&date_note=${note_dates}&bulan=${month}&tahun=${year}`,{
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
    React.useEffect(() => getListPengajuan(), [employees_name, note_dates, year, month])
  

    const handleRowClick = (params) => {
      navigate(`/detail-notes/${params.row.id}`)
    };

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setNotesDate(dated.slice(1, 11))
  }

  const convDated = (xdate) => {
    let event = new Date(xdate);
    let dated = JSON.stringify(event);
    setTanggal(dated.slice(1, 11))
  }

  const addNewNotes = async e => {
    try{
        const formData = new FormData();
        formData.append("employee_name", employeName);
        formData.append("date_note", tanggal);
        formData.append("type_notes", type_notes);
        formData.append("notes", notes_employee);
       await axios({
            method: 'post',
            url:`${BASE_URL}/notes/employee/`,
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
        setEmployeName('')
        setTanggal(new Date().toISOString().slice(0,10))
        setNotesEmployee('')
        getListPengajuan()
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

  const [employees, setEmployees] = React.useState([])
  const getEmployees = () => {
    axios.get(`${BASE_URL}/users/employee/name/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setEmployees(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getEmployees(), [])

  const handleChange = (event) => {
    setEmployeName(event.target.value);
  };

  const changeNotes = (event) => {
    setTypeNotes(event.target.value);
  };


  const dataNotes = [
    {
      'id' : 1,
      'name' : 'catatan',
      'value' : 'catatan'
    },
    {
      'id' : 2,
      'name' : 'masuk',
      'value' : 'masuk'
    },
    {
      'id' : 3,
      'name' : 'tidak masuk',
      'value' : 'tidak masuk'
    },
    {
      'id' : 4,
      'name' : 'cuti',
      'value' : 'cuti'
    },
    {
      'id' : 5,
      'name' : 'izin',
      'value' : 'ijin'
    },
    {
      'id' : 6,
      'name' : 'sakit'
    },
    {
      'id' : 7,
      'name' : 'lembur'
    },
  ]

  const tahun = [
    {
      'id':0,
      'year': '',
      'name': 'all year'
    },
    {'id': 1,
    'year' : 2022,
    'name': '2022'
  },
    {
      'id':2,
      'year' : 2023,
      'name': '2023'
    },
      {
        'id':3,
        'year' : 2024,
        'name': '2024'
      },
        {
          'id':4,
          'year' : 2025,
          'name': '2024'
        }
  ]

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


  return (
    <React.Fragment>
        <div className="d-flex">
        <SideBar />
        <div id="image__background">
            <main className="container" style={{ marginTop:'74px' }}>
                <div className='d-flex justify-content-center'>
                    <Col md={12} sm={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                            <div className="card-body">
                                    <div className="d-flex justify-content-between">
                               
                                    <Col md={11} className='mb-2 text-secondary d-flex'>
                                      <TextField placeholder='Cari Nama Karyawan' sx={{ mt:3 }} value={employees_name} onChange={e => setemployeesName(e.target.value)} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                            label="Tanggal Catatan"
                                            value={new Date(note_dates)}
                                            onChange={(newValue) => {
                                              convDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField variant='outlined' sx={{ ml:1, mr:1, mt:3 }} {...params} />}
                                            />
                                        </LocalizationProvider>
                                        <FormControl sx={{ mr:1, mt:3, minWidth: 220 }}>
                                          <InputLabel id="bulan-label">Pilih bulan</InputLabel>
                                          <Select
                                          // variant='standard'
                                          labelId="Bulan"
                                          id="Bulan"
                                          value={month}
                                          onChange={handleMonth}
                                          label="Bulan"
                                          >
                                              {bulan && bulan.map((div, index) => {
                                                  return(
                                                      <MenuItem value={div.value} key={index}>{div.month}</MenuItem>
                                                  )
                                              })}
                                          
                                          </Select>
                                      </FormControl>
                                      <FormControl sx={{ mr:1, mt:3, minWidth: 220 }}>
                                          <InputLabel id="tahun-label">Pilih Tahun</InputLabel>
                                          <Select
                                          // variant='standard'
                                          labelId="Tahun"
                                          id="Tahun"
                                          value={year}
                                          onChange={handleYear}
                                          label="Tahun"
                                          >
                                              {tahun && tahun.map((div, index) => {
                                                  return(
                                                      <MenuItem value={div.year} key={index}>{div.name}</MenuItem>
                                                  )
                                              })}
                                          
                                          </Select>
                                      </FormControl>

                                    </Col>
                                     <Col md={4}>
                                      {/* <button onClick={() => navigate('/home')} className={ids === 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>List Pengajuan Karyawan</button> */}
                                      {/* <button className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Notes HRD</button> */}
                                      <button onClick={handleClickOpen} className='btn btn-primary'>Tambah</button>
                                      </Col>

                                    </div>

                                    <Col md={12}>
                                       <div style={{ height: 660, width: '100%' }}>
                                        <DataGrid
                                        rows={list_pengajuan}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
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
                    <DialogTitle>{"Tambah Data Notes"}</DialogTitle>
                    <DialogContent sx={{ width:520 }}>
                      <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ }}>
                          <FormControl fullWidth sx={{ mt: 3, minWidth: 120 }}>
                              <InputLabel id="role-label">Nama Karyawan</InputLabel>
                              <Select
                              labelId="role"
                              id="role"
                              value={employeName}
                              onChange={handleChange}
                              label="Roles"
                              >
                                  {employees && employees.map((rol, index) => {
                                      return(
                                          <MenuItem key={index} value={rol.name}>{rol.name}</MenuItem>
                                      )
                                  })}
                              
                              </Select>
                          </FormControl>
                        </Box>
                        <Box sx={{ mt:2 }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <MobileDatePicker
                              label="Tanggal Catatan"
                              value={tanggal}
                              onChange={(valuese) => {
                                  convDated(valuese);
                              }}
                              renderInput={(params) => <TextField fullWidth variant='outlined' label='Tanggal Catatan' {...params} />}
                              />
                          </LocalizationProvider>
                        </Box>
                        <Box sx={{ }}>
                          <FormControl fullWidth sx={{ mt: 3, minWidth: 120 }}>
                              <InputLabel id="type-notes-label">Tipe Notes</InputLabel>
                              <Select
                              labelId="type-notes"
                              id="type-notes"
                              value={type_notes}
                              onChange={changeNotes}
                              label="Type Notes"
                              >
                                  {dataNotes && dataNotes.map((rol, index) => {
                                      return(
                                          <MenuItem key={index} value={rol.name}>{rol.name.charAt(0).toUpperCase() + rol.name.slice(1)}</MenuItem>
                                      )
                                  })}
                              
                              </Select>
                          </FormControl>
                        </Box>
                        <TextField 
                        fullWidth
                        value={notes_employee}
                        onChange={e => setNotesEmployee(e.target.value)}
                        id="notees"
                        multiline
                        rows={4} 
                        sx={{ mt:2 }} 
                        label='Notes'
                         />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={addNewNotes}>Tambah</Button>
                    </DialogActions>
                  </Dialog>
                </div>
            </main>
        </div>
        </div>
    </React.Fragment>
  )
}

export default NotesHrd