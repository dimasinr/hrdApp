import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbars from '../../../Components/Navbars'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
// import Swal from 'sweetalert2'

const columns = [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'employee_name', headerName: 'Nama Karyawan', width: 230 },
      { field: 'jatah_cuti', headerName: 'Jatah Cuti', width: 230 },
      { field: 'sisa_cuti', headerName: 'Sisa Cuti', width: 230 },
      { field: 'tanggal_cuti', headerName: 'Terakhir Mengambil Cuti', width: 290 },
    //   { field: 'start_date', headerName: 'Mulai Cuti', width: 230 },
    //   { field: 'end_date', headerName: 'Akhir Cuti', width: 230 },
      { field: 'notes', headerName: 'Notes', width: 230 },
  ];
  console.log(columns)
  
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

    const location = useLocation()
    const navigate = useNavigate()
    const ids = location.pathname.split('/')[1]
    const [perizinan, setPerizinan] = React.useState('')
    const [start_dates, setStartDates] = React.useState('')
    const [end_dates, setEndDates] = React.useState('')
    const [employees, setEmployess] = React.useState('')
    const [list_pengajuan, setListPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [open, setOpen] = React.useState(false);

    const [employeName, setEmployeName] = React.useState('')
    const [jatah_cuti, setJatahCuti] = React.useState('')
    const [sisa_cuti, setSisaCuti] = React.useState('')
    const [tanggal, setTanggal] = React.useState(new Date())
    const [notes_employee, setNotesEmployee] = React.useState('')

    const handleClickOpen = () => {
      setOpen(!open);
    };

    
    const getListPengajuan = () => {
      axios.get(`${BASE_URL}/notes/list/?sisa_cuti=${perizinan}&tanggal_cuti=${start_dates}&jatah_cuti=${end_dates}&employee_name=${employees}`,{
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
    React.useEffect(() => getListPengajuan(), [perizinan, start_dates, end_dates, employees])
  
    const handleRowClick = (params) => {
      navigate(`/detail-perizinan/${params.row.id}`)
    };

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setStartDates(dated.slice(1, 11))
  }

  const convDated = (xdate) => {
    let event = new Date(xdate);
    let dated = JSON.stringify(event);
    setTanggal(dated.slice(1, 11))
  }

//   const addNewTreatment = async e => {
//     try{
//         const formData = new FormData();
//         formData.append("employee_name", employeName);
//         formData.append("jatah_cuti", jatah_cuti);
//         formData.append("sisa_cuti", sisa_cuti);
//         formData.append("tanggal_cuti", tanggal);
//         formData.append("catatan", notes_employee);
//        await axios({
//             method: 'post',
//             url:`${BASE_URL}/notes/employee-cuti/`,
//             data: formData,
//             headers: {
//                 "Authorization" : `Token ${USER_TOKEN}`
//               }
//         })
//         Swal.fire({
//             icon: 'success',
//             title: `Data Berhasil dibuat`,
//             showConfirmButton: false,
//             timer: 1500
//           })
//         navigate(-1)
//     }catch(error){
//         if( error.response &&
//             error.response.status >= 400 &&
//             error.response.status <= 500
//             ){
//                 Swal.fire({
//                     icon: 'error',
//               title: 'Oops...',
//               text: `${error.response.data.detail}`
//             })
//         }
//     }
// };


  return (
    <React.Fragment>
        <Navbars />
        <div id="image__background">
            <main className="p-3 ">
                <div className='d-flex justify-content-center'>
                    <Col md={12} sm={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'12px' }}>
                            <div className="card-body">
                                <div className="card-title mb-3"><h5>Hallo, Selamat Datang</h5></div>
                                <Col md={4}>
                                    <div className="d-flex justify-content-between">
                                      <button onClick={() => navigate('/home')} className={ids === 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>List Pengajuan Karyawan</button>
                                      <button className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Notes HRD</button>
                                      <button onClick={handleClickOpen} className='btn btn-primary'>Tambah</button>
                                    </div>
                                </Col>

                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                      <Col md={9} className="mt-2">
                                      <TextField placeholder='Cari Sisa Cuti' sx={{ mt:3 }} value={perizinan} onChange={e => setPerizinan(e.target.value)} />
                                      <TextField placeholder='Cari Jatah Cuti' sx={{ mt:3, ml:1 }} value={end_dates} onChange={e => setEndDates(e.target.value)} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                            label="Tanggal Terakhir Mengambil Cuti"
                                            value={new Date(start_dates)}
                                            onChange={(newValue) => {
                                                convDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField variant='outlined' sx={{ ml:1, mt:3 }} {...params} />}
                                            />
                                        </LocalizationProvider>
                                      </Col>
                                      <Col md={2}>
                                        <TextField placeholder='Cari Nama Karyawan' sx={{ mt:3 }} value={employees} onChange={e => setEmployess(e.target.value)} />
                                      </Col>



                                    </Col>


                                    {list_pengajuan.employee_name}
                                    <Col md={12}>
                                       <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                        rows={list_pengajuan}
                                        columns={columns}
                                        pageSize={7}
                                        rowsPerPageOptions={[7]}
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
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ mt:2 }}>
                          <TextField value={employeName} onChange={e => setEmployeName(e.target.value)} sx={{ mr:1 }} label='Nama Employee' />
                          <TextField value={jatah_cuti} onChange={e => setJatahCuti(e.target.value)} label='Jatah Cuti' />
                        </Box>
                        <Box sx={{ mt:2 }}>
                          <TextField value={sisa_cuti} onChange={e => setSisaCuti(e.target.value)} sx={{ mr:1 }} label='Sisa Cuti' />
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <MobileDatePicker
                              label="Tanggal Terakhir Mengambil Cuti"
                              value={tanggal}
                              onChange={(valuese) => {
                                  convDated(valuese);
                              }}
                              renderInput={(params) => <TextField variant='outlined' label='Terakhir Mengambil Cuti' {...params} />}
                              />
                          </LocalizationProvider>
                        </Box>
                        <TextField 
                        fullWidth
                        value={notes_employee}
                        onChange={e => setNotesEmployee(e.target.value)}
                        id="notees"
                        multiline
                        rows={4} 
                        sx={{ mt:2 }} 
                        label='notes'
                         />
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={handleClickOpen}>Tambah</Button>
                    </DialogActions>
                  </Dialog>
                </div>
            </main>
        </div>
    </React.Fragment>
  )
}

export default NotesHrd