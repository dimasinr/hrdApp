import React from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box, Skeleton, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
// import Navbars from '../../../Components/Navbars'
import { ArrowBackIos, Delete, Edit } from '@mui/icons-material';
// import { Skeleton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import Swal from 'sweetalert2';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SideBar from '../../Components/SideBar';

const columns = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'employee_name', headerName: 'Nama Karyawan', width: 190 },
  { field: 'date_note', headerName: 'Tanggal Catatan', width: 180 },
  { field: 'type_notes', headerName: 'Type', width: 120 },
  { field: 'notes', headerName: 'Notes', width: 520 },
];

// sadafa
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

function NotesHrdDetail() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[2]
    const [name, setName] = React.useState([])
    const [date_note, setDates] = React.useState([])
    const [notes, setNotes] = React.useState([])
    const [type_notes, setTypeNotes] = React.useState([])
    const [listNotes, setListNotes] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    // const [jenis, setJenis] = useState('ditangguhkan');
    // const [reason, setReason] = useState('kuliah');
    // const [start_date, setStartDate] = useState(new Date());
    // const [end_date, setEndDate] = useState(new Date());
    // const [back_date, setBackDate] = useState(new Date());

    // const handleChange = (event) => {
    //     setJenis(event.target.value);
    // };

    // const tanggal_awal = start_date.toISOString().slice(0,10)
    // const tanggal_akhir = end_date.toISOString().slice(0,10)
    // const masuk_kembali = back_date.toISOString().slice(0,10)

    const getEmployee = () => {
        axios.get(`${BASE_URL}/notes/employee/${ids}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setName(res.employee_name)
          setDates(res.date_note)
          setTypeNotes(res.type_notes)
          setNotes(res.notes)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployee(), [ids])

    const getListNotesEmployee = () => {
        axios.get(`${BASE_URL}/notes/list/?employee_name=${name}`,{
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
      React.useEffect(() => getListNotesEmployee(), [name])
    
      const handleRowClick = (params) => {
        navigate(`/detail-perizinan/${params.row.id}`)
      };

      const editNotes = async e => {
        try{
            const formData = new FormData();
            formData.append("employee_name", name);
            formData.append("date_note", date_note);
            formData.append("notes", notes);
            formData.append("type_notes", type_notes);
           await axios({
                method: 'put',
                url:`${BASE_URL}/notes/employee/${ids}/`,
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
           getListNotesEmployee()
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

    const delNotes = async e => {
      try{
         await axios({
              method: 'delete',
              url:`${BASE_URL}/notes/employee/${ids}/`,
              headers: {
                  "Authorization" : `Token ${USER_TOKEN}`
                }
          })
          Swal.fire({
              icon: 'success',
              title: `Data Berhasil dihapus`,
              showConfirmButton: false,
              timer: 1500
            })
         navigate('/notes')
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
    axios.get(`${BASE_URL}/users/employees/?limit=50&offset=0`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setEmployees(res.results)
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
    setName(event.target.value);
  };

  const changeNotes = (event) => {
    setTypeNotes(event.target.value);
  };

  const dataNotes = [
    {
      'id' : 1,
      'name' : 'catatan'
    },
    {
      'id' : 2,
      'name' : 'masuk'
    },
    {
      'id' : 3,
      'name' : 'tidak masuk'
    },
    {
      'id' : 4,
      'name' : 'cuti'
    },
    {
      'id' : 5,
      'name' : 'izin'
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
                                  {/* <div className="card-title"> */}
                                      <button onClick={() => navigate('/notes')} className="d-flex align-items-center btn">
                                          <ArrowBackIos />
                                          <h5>Detail Karyawan</h5>
                                      </button>
                                      {/* </div> */}
                                      {/* <Col md={3}>
                                          <div className="d-flex justify-content-between">
                                            <button onClick={() => navigate('/home')} className={ids === 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>List Pengajuan Karyawan</button>
                                            <button onClick={() => navigate('/notes')}  className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Notes HRD</button>
                                          </div>
                                      </Col> */}

                                      <Col md={12} className='mb-2 text-secondary d-flex'>
                                        <Col md={12} className="mt-2">
                                          <div className="d-flex justify-content-between">
                                            <Box sx={{ mr:2 }}>
                                                {/* <TextField value={name} disabled label='Nama karyawan' sx={{ mt:3, mr:1 }}  /> */}
                                                <FormControl fullWidth sx={{ mt: 3, maxWidth: 650}}>
                                                    <InputLabel id="role-label">Nama Karyawan</InputLabel>
                                                    <Select
                                                    labelId="role"
                                                    id="role"
                                                    value={name}
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
                                                <FormControl fullWidth sx={{ mt: 3, maxWidth: 190, mr:1 }}>
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
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <MobileDatePicker
                                                    label="Tanggal Catatan"
                                                    value={new Date(date_note)}
                                                    onChange={(newValue) => {
                                                        convDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField variant='outlined' sx={{ mt:3 }} {...params} />}
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
                  </div>
              </main>
          </div>

        </div>
    </React.Fragment>
  )
}

export default NotesHrdDetail