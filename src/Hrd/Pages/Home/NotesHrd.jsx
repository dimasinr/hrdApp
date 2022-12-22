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

function NotesHrd() {

    const location = useLocation()
    const navigate = useNavigate()
    const ids = location.pathname.split('/')[1]
    console.log(ids)
    const [perizinan, setPerizinan] = React.useState('')
    const [start_dates, setStartDates] = React.useState('')
    const [end_dates, setEndDates] = React.useState('')
    const [employees, setEmployess] = React.useState('')
    const [list_pengajuan, setListPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
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
                                      <button className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Tambah</button>
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
                </div>
            </main>
        </div>
    </React.Fragment>
  )
}

export default NotesHrd