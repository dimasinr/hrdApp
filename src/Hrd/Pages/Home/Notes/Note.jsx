import React, {useState} from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import SideBar from '../../../Components/SideBar'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination} from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { bulan } from '../Presence/utlis/arrayfuc'
import { tahun, dataNotes } from './array'
import { Table } from 'react-bootstrap'
import { Visibility } from '@mui/icons-material'
import { datesUpt } from '../../../../Components/utilsFunction/functionUtils'
import {Snackbar, Alert} from '@mui/material'

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

function Note() {

    const navigate = useNavigate()
    const [employees_name, setemployeesName] = useState('')
    const [note_dates, setNotesDate] = useState('')
    const [list_notes, setListNotes] = useState([])
    const [notes_paginate, setNotesPaginate] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [offSet, setOffSet] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [employee, setEmployee] = useState('')
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

    // snackbar
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleClose = () => {
      setSnack(false)
    };

     const getListPengajuan = () => {
      axios.get(`${BASE_URL}/api/note/employee-notes/?limit=10&offset=${offSet}&employee_name=${employees_name}&date_note=${note_dates}&bulan=${month}&tahun=${year}`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setListNotes(res.results)
        setNotesPaginate(res.count)
        setLoading(false)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getListPengajuan(), [offSet, employees_name, note_dates, year, month])

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
        formData.append("employee", employee);
        formData.append("date_note", tanggal);
        formData.append("type_notes", type_notes);
        formData.append("notes", notes_employee);
       await axios({
            method: 'post',
            url:`${BASE_URL}/api/note/employee-notes/`,
            data: formData,
            headers: {
                "Authorization" : `Token ${USER_TOKEN}`
              }
        })
        setOpen(false)
        setEmployee('')
        setSnack(true)
        setStatus('info')
        setMessage('Berhasil membuat notes')
        setTanggal(new Date().toISOString().slice(0,10))
        setNotesEmployee('')
        getListPengajuan()
    }catch(error){
        if( error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
            ){
            setStatus('error')
            setMessage(`${error.response.data.detail}`)
            setSnack(true)
            setOpen(false)
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
    setEmployee(event.target.value);
  };

  const changeNotes = (event) => {
    setTypeNotes(event.target.value);
  };

  const itemsPerPage = 15;
  const pageCount = Math.ceil(notes_paginate / itemsPerPage);

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
                                <div className="card-title">
                                    <h4>List Catatan</h4>
                                    <small className='text-secondary'>Klik tanda dibagian action untuk detail catatannya.</small>
                                </div>
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
                                      <button onClick={handleClickOpen} className='btn btn-primary'>Tambah</button>
                                      </Col>

                                    </div>

                                    {loading && loading ?
                                    <CircularProgress /> :
                                    <Col md={12}>
                                    <hr />
                                    <Table hover bordered responsive>
                                        <thead className='head_color_presence'>
                                        <tr>
                                            <th>NoteId</th>
                                            <th>Nama Karyawan</th>
                                            <th>Tanggal</th>
                                            <th>Tipe Catatan</th>
                                            <th>Catatan</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {list_notes.map((lnotes, index) => {
                                            return(
                                            <tr className='text_presence' key={index}>
                                                <td className='text_presence'>{lnotes.id ? lnotes.id : 0}</td>
                                                <td className='text_presence'>{lnotes.employee ? lnotes.employee && lnotes.employee.name : "ex karyawan"}</td>
                                                <td>{lnotes.date_note ? datesUpt(lnotes.date_note) : "Tidak ada tanggal"}</td>
                                                <td className='text_presence'>{lnotes.type_notes ? lnotes.type_notes : "Tidak ada"}</td>
                                                <td className='text_presence'>{lnotes.notes ? lnotes.notes : "Tidak ada"}</td>
                                                <td className='toOnc' onClick={() => {navigate(`/notes/detail/${lnotes.id}`)}}><Visibility /></td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
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
                                    </Col>
                                    }

                            </div>
                        </div>
                    </Col>
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
                              value={employee}
                              onChange={handleChange}
                              label="Roles"
                              >
                                  {employees && employees.map((rol, index) => {
                                      return(
                                          <MenuItem key={index} value={rol.pk}>{rol.name}</MenuItem>
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
                                          <MenuItem key={index} value={rol.value}>{rol.name.charAt(0).toUpperCase() + rol.name.slice(1)}</MenuItem>
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

export default Note