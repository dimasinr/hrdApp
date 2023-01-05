import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import { TextField, Box, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material'
import Navbars from '../../../Components/Navbars'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { ArrowBackIos } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, USER_TOKEN, ROLES } from '../../../fetch/fetch';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

function DetailPerizinan() {

    console.log(ROLES)
    const location = useLocation()
    const navigate = useNavigate()
    const id = location.pathname.split('/')[3]
    const [jenis, setJenis] = useState('');
    const [reason, setReason] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [return_date, setReturnDate] = useState(new Date());
    const [permission_pi, setPermissionPi] = useState('');
    const [emp_id, setEmpId] = useState('');
    const [sisaCut, setSisaCut] = useState('');
    const [username, setUsername] = useState('');
    const [jumlah_hari, setJumlHari] = useState('');

    const [permission_pil, setPermissionPil] = useState('');
    const [reason_rejected, setReasonRejected] = useState(null);
    const [suspended_start, setSuspendedStart] = useState(new Date().toISOString().slice(0,10));
    const [suspended_end, setSuspendedEnd] = useState(new Date().toISOString().slice(0,10));

    const convDate = (newdate) => {
        let event = new Date(newdate);
        let dated = JSON.stringify(event);
        setSuspendedStart(dated.slice(1, 11))
      }
    
      const convDates = (newdates) => {
        let event = new Date(newdates);
        let dated = JSON.stringify(event);
        setSuspendedEnd(dated.slice(1, 11))
      }

    const handleChange = (event) => {
        setPermissionPil(event.target.value);
        setReasonRejected(null)
    };

    const [pengajuan, setPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    
    const getListPengajuan = () => {
      axios.get(`${BASE_URL}/petitions/employee/${id}/`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setPengajuan(res)
        setJenis(res.permission_type)
        setStartDate(res.start_date)
        setEndDate(res.end_date)
        setReturnDate(res.return_date)
        setReasonRejected(res.reason_rejected)
        setPermissionPil(res.permission_pil)
        setPermissionPi(res.permission_pil)
        setReason(res.reason)
        setJumlHari(res.jumlah_hari)
        setLoading(false)
        setEmpId(res.employee_id)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getListPengajuan(), [id])

    const getEmployees = () => {
        axios.get(`${BASE_URL}/users/employees/${emp_id}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setLoading(false)
          setSisaCut(res.sisa_cuti)
          setUsername(res.username)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployees(), [emp_id])
    
      console.log(sisaCut)

    function TotalCu(x,y){
        return x-y
    }

    console.log(TotalCu(sisaCut, 1))
    const cutiAkhir = TotalCu(sisaCut, 1)

    const perizinanAdm = async e => {
        try{
            const formData = new FormData();
            formData.append("permission_pil", permission_pil);
            if(permission_pil === "ditangguhkan"){
                formData.append("suspended_start", suspended_start);
                formData.append("suspended_end", suspended_end);
            }else if(permission_pil === 'ditolak'){
                formData.append("reason_rejected", reason_rejected);
            }else if(permission_pil === 'disetujui'){
                perizinanSisaCuti()
            }
            const res = await axios({
                method: 'put',
                url:`${BASE_URL}/petitions/employee/${id}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                showConfirmButton: false,
                timer: 1500
              })
            navigate(-1)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    console.log(error)
            }
        }
      };

    const perizinanSisaCuti = async e => {
        try{
            const formData = new FormData();
            formData.append("sisa_cuti", cutiAkhir);
            formData.append("username", username);
            const res = await axios({
                method: 'put',
                url:`${BASE_URL}/users/employees/${emp_id}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            console.log(res)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    console.log(error)
            }
        }
      };


  return (
    <React.Fragment>
        <Navbars />
        <div id="image__background">
            <main className="container">
                <div className="d-flex justify-content-center mt-4">
                    {loading && loading ? 
                    <span>loading ...</span>
                    : null}
                    <Col md={6}>
                        <div className="card shadow-card" style={{ border: 'none' }}>
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-between">
                                <Tooltip title='Back'>
                                    <button className='btn' onClick={() => navigate(-1)}>
                                        <ArrowBackIos />
                                    </button>
                                </Tooltip>
                                    <h5>FORMULIR PENGAJUAN CUTI/IZIN</h5>
                                <span>.</span>
                                </div>
                                <Box sx={{ mt:2, display:'flex' }}>
                                    <TextField fullWidth disabled sx={{ mr:2 }} value={pengajuan.employee_name} type="text" label='Nama' variant='filled' />
                                    <TextField fullWidth disabled value={pengajuan.division} type="text" label='Bagian' variant='filled' />
                                </Box>
                                <Box sx={{ mt:2, display: 'flex' }}>
                                    <span>Jenis Cuti/Izin</span> : &nbsp;
                                    <FormControl>
                                    <RadioGroup
                                        aria-labelledby="jenis"
                                        name="jenis"
                                        value={jenis}
                                        onChange={handleChange}
                                    >
                                        <Col md={8}>
                                            <FormControlLabel disabled value="ijin" control={<Radio />} label="Ijin" />
                                            <FormControlLabel disabled value="cuti" control={<Radio />} label="Cuti" />
                                            <FormControlLabel disabled value="lembur" control={<Radio />} label="Lembur" />
                                            <FormControlLabel disabled value="sakit" control={<Radio />} label="Sakit" />
                                        </Col>
                                    </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box sx={{ mt:1 }}>
                                    <TextField value={reason} onChange={e => setReason(e.target.value)} disabled fullWidth type="text" label='Alasan' variant='filled' />
                                </Box>
                                <Box sx={{ mt:2, display:'flex', justifyContent:'space-between' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                    label="Tanggal Awal"
                                    disabled
                                    value={start_date}
                                    onChange={(newparams) => {
                                        setStartDate(newparams)
                                    }}
                                    renderInput={(params) => <TextField variant='filled' disabled fullWidth {...params} />}
                                    />
                                    <span className='p-3'>s/d</span>
                                    <MobileDatePicker
                                    label="Tanggal Berakhir"
                                    disabled
                                    value={end_date}
                                    onChange={(params) => {
                                        setEndDate(params)
                                    }}
                                    renderInput={(params) => <TextField variant='filled' disabled fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                                </Box>

                                <Box sx={{ mt:1 }}>
                                    {/* <TextField value={jumlah_hari && jumlah_hari.jumlah_hari} disabled fullWidth type="number" label='Jumlah Hari Kerja' variant='filled' /> */}
                                    <TextField value={jumlah_hari} onChange={e => setJumlHari(e.target.value)} disabled fullWidth type="text" label='Jumlah Hari Kerja' variant='filled' />
                                </Box>

                                <Box sx={{ mt:2, mb:2 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                    label="Masuk Kembali Tanggal"
                                    disabled
                                    value={return_date}
                                    onChange={(newparams) => {
                                        setReturnDate(newparams)
                                    }}
                                    renderInput={(params) => <TextField variant='filled' disabled fullWidth {...params} />}
                                    />
                                </LocalizationProvider>
                                
                                </Box>
                                <span className='mt-2'>Persetujuan Atasan</span>
                                <Box sx={{ mt:2, display: 'flex' }}>
                                    <span>Disetujui/Ditolak</span> : &nbsp;
                                    <FormControl style={{ marginTop:'-8px', marginLeft:'15px' }}>
                                    <RadioGroup
                                        aria-labelledby="jenis"
                                        name="jenis"
                                        value={permission_pil}
                                        onChange={handleChange}
                                    >
                                        {permission_pi === 'disetujui' ?
                                        <Col md={8}>
                                        <FormControlLabel disabled value="disetujui" control={<Radio />} label="Disetujui" />
                                        <FormControlLabel disabled value="ditangguhkan" control={<Radio />} label="Ditangguhkan menjadi Tanggal" />
                                        <FormControlLabel disabled value="ditolak" control={<Radio />} label="Ditolak" />
                                    </Col>
                                    :
                                    <Col md={8}>
                                            <FormControlLabel value="disetujui" control={<Radio />} label="Disetujui" />
                                            <FormControlLabel value="ditangguhkan" control={<Radio />} label="Ditangguhkan menjadi Tanggal" />
                                            <FormControlLabel value="ditolak" control={<Radio />} label="Ditolak" />
                                        </Col>
                                        
                                        }
                                    </RadioGroup>
                                    </FormControl>
                                </Box>
                                {permission_pil === 'ditolak' ?
                                <TextField value={reason_rejected} onChange={e => setReasonRejected(e.target.value)} fullWidth variant='standard' label='Alasan' />
                                : null
                                }
                                {permission_pil === 'ditangguhkan' ? 
                                 <Box sx={{ mt:2, display:'flex', justifyContent:'space-between' }}>
                                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                                     <MobileDatePicker
                                     label="Tanggal Awal"
                                     disablePast
                                     value={new Date(suspended_start)}
                                     onChange={(newValue) => {
                                        convDate(newValue);
                                     }}
                                     renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                                     />
                                     <span className='p-3'>s/d</span>
                                     <MobileDatePicker
                                     label="Tanggal Berakhir"
                                     disablePast
                                     value={new Date(suspended_end)}
                                     onChange={(newValue) => {
                                        convDates(newValue);
                                     }}
                                     renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                                     />
                                 </LocalizationProvider>
                                 </Box>
                                 : null
                                }

                                <div className="d-flex justify-content-end mt-4 mb-4">
                                    {
                                        permission_pi === 'disetujui'?
                                        null
                                        : 
                                        <button onClick={ROLES === 'hrd' ? perizinanAdm : null} className='btn btn-primary'>Submit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </div>
            </main>
        </div>
    </React.Fragment>
  )
}

export default DetailPerizinan