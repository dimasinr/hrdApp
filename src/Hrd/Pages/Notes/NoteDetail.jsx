import React from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box, Skeleton, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SideBar from '../../Components/SideBar';
import { dataNotes } from './array';
import {Snackbar, Alert} from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
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

function NoteDetail() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[3]
    const [employee, setEmployee] = React.useState('')
    const [date_note, setDates] = React.useState('')
    const [notes, setNotes] = React.useState('')
    const [type_notes, setTypeNotes] = React.useState('')
    const [listNotes, setListNotes] = React.useState([])
    const [loading, setLoading] = React.useState(true)

     // snackbar
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [message, setMessage] = React.useState(false);

    const handleClose = () => {
      setSnack(false)
    };

    const getEmployee = () => {
        axios.get(`${BASE_URL}/api/note/employee-notes/${ids}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setEmployee(res.employee.pk)
          setDates(res.date_note)
          setTypeNotes(res.type_notes)
          setNotes(res.notes)
          console.log(res)
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployee(), [ids])

    const getListNotesEmployee = () => {
        axios.get(`${BASE_URL}/api/note/list-notes/?employee_id=${employee}`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setListNotes(res)
          setLoading(false)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getListNotesEmployee(), [employee])
    
      const handleRowClick = (params) => {
        navigate(`/notes/detail/${params.row.id}`)
      };

      const editNotes = async e => {
        try{
            const formData = new FormData();
            formData.append("employee", employee);
            formData.append("date_note", date_note);
            formData.append("notes", notes);
            formData.append("type_notes", type_notes);
           await axios({
                method: 'put',
                url:`${BASE_URL}/api/note/employee-notes/${ids}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
         
           setStatus("info")
           setMessage("Data Berhasil diubah")
           getListNotesEmployee()
           getEmployee()
           setSnack(true)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setStatus("error")
                setMessage("Data Gagal diubah")
            }
        }
    };

    const delNotes = async e => {
      try{
        const formData = new FormData();
        formData.append("employee", employee);
        formData.append("date_note", date_note);
        formData.append("notes", notes);
        formData.append("type_notes", type_notes);
         await axios({
              method: 'post',
              url:`${BASE_URL}/api/note/delete/`,
              data: formData,
              headers: {
                  "Authorization" : `Token ${USER_TOKEN}`
                }
          })
         navigate('/notes')
         setSnack(true)
         setStatus("info")
         setMessage("Data Berhasil dihapus")
      }catch(error){
          if( error.response &&
              error.response.status >= 400 &&
              error.response.status <= 500
              ){
              setSnack(true)
              setStatus("error")
              setMessage("Gagal Menghapus data")
          }
          console.log(error)
      }
  };

  const [employees, setEmployees] = React.useState([])
  const getEmployees = () => {
    axios.get(`${BASE_URL}/users/employee/search/`,{
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

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setDates(dated.slice(1, 11))
  }

  const handleChange = (event) => {
    setEmployee(event.target.value);
  };

  const changeNotes = (event) => {
    setTypeNotes(event.target.value);
  };

  console.log(employees)

  return (
    <React.Fragment>
        {/* <Navbars /> */}
        <div className="d-flex">
        <SideBar />
          <div id="image__background" style={{ marginTop:'62px' }}>
            <div className='color_bar'>
                <span></span>
                <span></span>
                <span></span>
            </div>
              <main className="p-3 ">
                  <div className='d-flex justify-content-center'>
                      <Col md={12} sm={12}>
                          <div className="card shadow_card" style={{ border:'none', borderRadius:'12px' }}>
                              <div className="card-body">
                                      <button onClick={() => navigate('/notes')} className="d-flex align-items-center btn">
                                          <ArrowBackIos />
                                          <h5 style={{ marginTop:'5px'}}>Detail Karyawan</h5>
                                      </button>

                                      <Col md={12} className='mb-2 text-secondary d-flex'>
                                        <Col md={12} className="mt-2">
                                          <div className="d-flex justify-content-between">
                                            <Box sx={{ mr:2 }}>
                                                <FormControl fullWidth sx={{ mt: 2, mr:2, maxWidth: 190}}>
                                                    <InputLabel id="employee-label">Nama Karyawan</InputLabel>
                                                    <Select
                                                    labelId="employee"
                                                    id="employee"
                                                    value={employee}
                                                    onChange={handleChange}
                                                    label="Employee"
                                                    >
                                                        {employees && employees.map((emp, index) => {
                                                            return(
                                                                <MenuItem key={index} value={emp.pk}>{emp.name}</MenuItem>
                                                            )
                                                        })}
                                                    
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth sx={{ mt: 2, maxWidth: 190, mr:1 }}>
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Catatan"
                                                    value={new Date(date_note)}
                                                    onChange={(newValue) => {
                                                        convDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:2 }} {...params} />}
                                                    />
                                                </LocalizationProvider>
                                                {/* <TextField value={date_note} onChange={e => setDates(e.target.value)} label='Tanggal Catatan' sx={{ mt:3, mr:1 }}  /> */}
                                               
                                            </Box>
                                            <Box sx={{ mt:3 }}>
                                              <button onClick={editNotes} className='btn text-primary'>Ubah Notes <Edit /></button>
                                              <button onClick={delNotes} className='btn text-danger'><Delete /></button>
                                            </Box>
                                          </div>
                                          <Box sx={{ maxWidth:460 }}>
                                          <TextField 
                                                value={notes} 
                                                onChange={e => setNotes(e.target.value)} 
                                                label='Catatan' 
                                                sx={{ mt:3, mr:1 }}  
                                                multiline
                                                fullWidth
                                                rows={4} 
                                                />
                                          </Box>
                                          <Box sx={{ mt:3 }}>
                                          <span className='mt-4'><h5>List Catatan Karyawan ini</h5></span>
                                          <div style={{ height: 400, width: '100%' }}>
                                          <DataGrid
                                          rows={listNotes}
                                          columns={columns}
                                          pageSize={5}
                                          rowsPerPageOptions={[5]}
                                          getRowId={(row) => row.id}
                                          onRowClick={handleRowClick}
                                          components={{
                                              LoadingOverlay: LoadingSkeleton,
                                            }}
                                            loading={loading}
                                          />
                                          </div>
                                          </Box>
                                        </Col>

                                      </Col>

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
                  </div>
              </main>
          </div>

        </div>
    </React.Fragment>
  )
}

export default NoteDetail