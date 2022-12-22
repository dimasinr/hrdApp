import React from 'react'
import { Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbars from '../../../Components/Navbars'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import runOneSignal from '../../../oneSignal/oneSignal'

const columns = [
      { field: 'id', headerName: 'Id', width: 70 },
      { field: 'employee_name', headerName: 'Bagian', width: 130 },
      { field: 'division', headerName: 'Bagian', width: 130 },
      { field: 'permission_type', headerName: 'Jenis Ijin', width: 130 },
      { field: 'reason', headerName: 'Alasan', width: 130 },
      { field: 'start_date', headerName: 'Tanggal Awal', width: 130 },
      { field: 'end_date', headerName: 'Tanggal Akhir', width: 130 },
      { field: 'return_date', headerName: 'Masuk Kembali', width: 130 },
      { field: 'permission_pil', headerName: 'Izin Atasan', width: 130 },
      { field: 'suspended_start', headerName: 'Awal Ditangguhkan', width: 130 },
      { field: 'suspended_end', headerName: 'Akhir Ditangguhkan', width: 130 },
      { field: 'reason_rejected', headerName: 'Alasan ditolak', width: 130 },
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

function HomeHrd() {

    const location = useLocation()
    const navigate = useNavigate()
    const ids = location.pathname.split('/')[1]
    console.log(ids)
    const [open, setOpen] = React.useState(false)
    const [perizinan, setPerizinan] = React.useState('')
    const [start_dates, setStartDates] = React.useState('')
    const [end_dates, setEndDates] = React.useState('')
    const [employees, setEmployess] = React.useState('')
    const [list_pengajuan, setListPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    const getListPengajuan = () => {
      axios.get(`${BASE_URL}/petitions/pengajuan/?permission_type=${perizinan}&start_date=${start_dates}&end_date=${end_dates}&employee_name=${employees}`,{
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
  
    // const handleRowClick = (params) => {
    //   navigate(`/perizinan/${params.row.id}`)
    // };

    const handleChange = (event) => {
      setPerizinan(event.target.value);
  };

  const handled = () => {
    setOpen(!open);
  };

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setStartDates(dated.slice(1, 11))
  }

  const convDates = (newdates) => {
    let event = new Date(newdates);
    let dated = JSON.stringify(event);
    setEndDates(dated.slice(1, 11))
  }

  React.useEffect(() => {
    runOneSignal();
  },[])

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
                                <Col md={3}>
                                    <div className="d-flex justify-content-between">
                                      <button className={ids === 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>List Pengajuan Karyawan</button>
                                      <button onClick={() => navigate('/notes')} className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Notes HRD</button>
                                    </div>
                                </Col>

                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                      <Col md={9} className="mt-2">
                                        <FormControl sx={{ mr: 1, mt:1, minWidth: 120 }}>
                                          <InputLabel id="demo-controlled-open-select-label">Perizinan</InputLabel>
                                          <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handled}
                                            onOpen={handled}
                                            value={perizinan}
                                            label="Age"
                                            onChange={handleChange}
                                          >
                                            <MenuItem value={'ijin'}>Ijin</MenuItem>
                                            <MenuItem value={'sakit'}>Sakit</MenuItem>
                                            <MenuItem value={'cuti'}>Cuti</MenuItem>
                                            <MenuItem value={'lembur'}>Lembur</MenuItem>
                                            <MenuItem value={''}>All</MenuItem>
                                          </Select>
                                        </FormControl>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                            label="Tanggal Awal"
                                            value={new Date(start_dates)}
                                            onChange={(newValue) => {
                                                convDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField variant='outlined' sx={{ mr:1, mt:1 }} {...params} />}
                                            />
                                            <MobileDatePicker
                                            label="Tanggal Berakhir"
                                            value={new Date(end_dates)}
                                            onChange={(newValue) => {
                                                convDates(newValue);
                                            }}
                                            renderInput={(params) => <TextField variant='outlined' sx={{ mt:1 }} {...params} />}
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
                                        // onRowClick={handleRowClick}
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

export default HomeHrd