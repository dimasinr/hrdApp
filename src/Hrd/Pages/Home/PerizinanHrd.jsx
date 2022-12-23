import React from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'
import Navbars from '../../../Components/Navbars'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { ArrowBackIos } from '@mui/icons-material';
// import { Skeleton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';

const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'employee_name', headerName: 'Nama Karyawan', width: 230 },
    { field: 'jatah_cuti', headerName: 'Jatah Cuti', width: 230 },
    { field: 'sisa_cuti', headerName: 'Sisa Cuti', width: 230 },
    { field: 'tanggal_cuti', headerName: 'Terakhir Mengambil Cuti', width: 290 },
    { field: 'start_date', headerName: 'Mulai Cuti', width: 230 },
    { field: 'end_date', headerName: 'Akhir Cuti', width: 230 },
    { field: 'notes', headerName: 'Notes', width: 230 },
];

const list_pengajuan = [
    {'id':1, 'employee_name' : 'dimas', 'jatah_cuti':12, 'sisa_cuti':11, 'tanggal_cuti': '2022-12-15', 'start_date':'2022-12-15', 'end_date': '2022-12-20', 'notes': ''},
    {'id':2, 'employee_name' : 'dimas', 'jatah_cuti':12, 'sisa_cuti':10, 'tanggal_cuti': '2022-12-23', 'start_date':'2022-12-23', 'end_date': '2022-12-28', 'notes': ''},
]

// const LoadingSkeleton = () => (
//     <Box
//       sx={{
//         height: 'max-content',
//       }}
//     >
//       {[...Array(1)].map((_, index) => (
//         <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} key={index} />
//       ))}
//     </Box>
//   );

function PerizinanHrd() {

    const navigate = useNavigate()
    const location = useLocation()
    const ids = location.pathname.split('/')[2]
    const [name, setName] = React.useState([])
    const [jatah_cuti, setJatahCuti] = React.useState([])
    const [sisa_cuti, setSisaCuti] = React.useState([])
    const [last_cuti, setLastCuti] = React.useState([])

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
          setJatahCuti(res.jatah_cuti)
          setSisaCuti(res.sisa_cuti)
          setLastCuti(res.start_date)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployee(), [])
    

  return (
    <React.Fragment>
        <Navbars />
        <div id="image__background">
            <main className="p-3 ">
                <div className='d-flex justify-content-center'>
                    <Col md={12} sm={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'12px' }}>
                            <div className="card-body">
                                <div className="card-title mb-3">
                                    <button onClick={() => navigate(-1)} className="d-flex align-items-center btn">
                                        <ArrowBackIos />
                                        <h5>Detail Karyawan</h5>
                                    </button>
                                    </div>
                                <Col md={3}>
                                    <div className="d-flex justify-content-between">
                                      {/* <button onClick={() => navigate('/home')} className={ids === 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>List Pengajuan Karyawan</button> */}
                                      {/* <button className={ids !== 'home' ? 'btn btn-secondary' : 'btn btn-primary'}>Notes HRD</button> */}
                                    </div>
                                </Col>

                                    <Col md={12} className='mb-2 text-secondary d-flex'>
                                      <Col md={12} className="mt-2">
                                        <Box sx={{ mr:2 }}>
                                            <TextField value={name} onChange={e => setName(e.target.value)} label='Nama karyawan' sx={{ mt:3, mr:1 }}  />
                                            <TextField value={sisa_cuti} onChange={e => setSisaCuti(e.target.value)} label='Sisa Cuti' sx={{ mt:3, mr:1 }}  />
                                        </Box>
                                        <Box sx={{ mb:2 }}>
                                            <TextField value={jatah_cuti} onChange={e => setJatahCuti(e.target.value)} label='Jatah Cuti' sx={{ mt:3, mr:1 }}  />
                                            <TextField value={last_cuti} onChange={e => setLastCuti(e.target.value)} label='Terakhir Cuti' sx={{ mt:3, mr:1 }}  />
                                        </Box>
                                        <Box>
                                        <span className='mt-4'><h5>List Cuti Karyawan</h5></span>
                                        <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                        rows={list_pengajuan}
                                        columns={columns}
                                        pageSize={7}
                                        rowsPerPageOptions={[7]}
                                        getRowId={(row) => row.id}
                                        // onRowClick={handleRowClick}
                                        // components={{
                                        //     LoadingOverlay: LoadingSkeleton,
                                        //   }}
                                        //   loading={loading}
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
    </React.Fragment>
  )
}

export default PerizinanHrd