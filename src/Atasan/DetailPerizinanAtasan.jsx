import React,{useState} from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, ROLES, USER_TOKEN } from '../fetch/fetch'
import Swal from 'sweetalert2'
import { TextField, Box, RadioGroup, Radio, FormControl, FormControlLabel, Tooltip, CircularProgress } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { ArrowBackIos } from '@mui/icons-material'
import { Col } from 'react-bootstrap'

function DetailPerizinanAtasan() {

  const location = useLocation()
  const navigate = useNavigate()
  const id = location.pathname.split('/')[3]
  const [employee_names, setEmployeeName] = useState('');
  const [division, setDivision] = useState('');
  const [jenis, setJenis] = useState('');
  const [jumlah_hari, setJumlahHari] = useState('')
  const [reason, setReason] = useState('');
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [return_date, setReturnDate] = useState(new Date());
  const [permission_pi, setPermissionPi] = useState('');
  const [emp_id, setEmpId] = useState('');
  const [sisaCut, setSisaCut] = useState('');
  const [username, setUsername] = useState('');

  const [permission_pil, setPermissionPil] = useState('');
  const [reason_rejected, setReasonRejected] = useState(null);
  const [conditional_reason, setConditionalReason] = useState(null);
  const [suspended_start, setSuspendedStart] = useState(new Date().toISOString().slice(0,10));
  const [suspended_end, setSuspendedEnd] = useState(new Date().toISOString().slice(0,10));

  const [lemburHour, setLemburHour] = useState([])
  const [fromHour, setFromHour] = useState([])
  const [endHour, setEndHour] = useState([])

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

  const [loading, setLoading] = React.useState(true)
  
  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/petitions/employee/${id}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setEmployeeName(res.employee_name)
      setDivision(res.division)
      setJenis(res.permission_type)
      setStartDate(res.start_date)
      setEndDate(res.end_date)
      setReturnDate(res.return_date)
      setReasonRejected(res.reason_rejected)
      setConditionalReason(res.conditional_reasons)
      setPermissionPil(res.permission_pil)
      setPermissionPi(res.permission_pil)
      setFromHour(res.from_hour)
      setEndHour(res.end_hour)
      setLemburHour(res.lembur_hour)
      setReason(res.reason)
      setJumlahHari(res.jumlah_hari)
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

  console.log(TotalCu(sisaCut, jumlah_hari))
  const cutiAkhir = TotalCu(sisaCut, jumlah_hari)

  const perizinanAdm = async e => {
      try{
          const formData = new FormData();
          formData.append("permission_pil", permission_pil);
          if(permission_pil === "ditangguhkan"){
              formData.append("suspended_start", suspended_start);
              formData.append("suspended_end", suspended_end);
          }else if(permission_pil === 'ditolak'){
              formData.append("reason_rejected", reason_rejected);
          }else if(permission_pil === 'disetujui' & jenis !== 'lembur' & jenis !== 'sakit'){
              perizinanSisaCuti()
              CalendarInput()
          }else if(permission_pil === 'bersyarat'){
              formData.append("conditional_reasons", conditional_reason);
          }else if(permission_pil === 'disetujui' & jenis === 'lembur'){
            AttendanceInput()
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

    const starts = new Date(start_date).toISOString()
    const ends = new Date(end_date).toISOString()

    const CalendarInput = async e => {
      try{
          const formData = new FormData();
          formData.append("title", employee_names);
          formData.append("division", division);
          formData.append("permission_type", jenis);
          formData.append("reason", reason);
          formData.append("start", starts);
          formData.append("end", ends);
          const res = await axios({
              method: 'post',
              url:`${BASE_URL}/petitions/employee-calendar/`,
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

    const AttendanceInput = async e => {
      try{
          const formData = new FormData();
          formData.append("employee_name", employee_names);
          formData.append("working_date", start_date);
          formData.append("lembur_start", fromHour);
          formData.append("lembur_end", endHour);
          const res = await axios({
              method: 'post',
              url:`${BASE_URL}/attendance/employees/`,
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

    const handleCli = () => {
      if (ROLES === 'atasan' & cutiAkhir > '1') {
          perizinanAdm()
      }else{
          Swal.fire({
              icon: 'error',
              title: 'Gagal',
              showConfirmButton: false,
              timer: 1500
            })
      }
    }

    function JaMe(x){
      let lent = x.toString().length
      const minT = lent-2
      const slic = x.toString().slice(0, lent)
      const slic1 = x.toString().slice(0, 1)
      const slic2 = x.toString().slice(minT, lent)
      if(lent === 3){
          return slic1 + ' Jam ' + slic2 + ' Menit';
      }else if(lent === 2){
          return slic + ' Menit';
      }
  }

  function DateTimes(x){
    let deta = x.toString()
    const lent = deta.length
    const lentX = lent-2
    const varX = deta.slice(lentX, lent)
    if(lent === 4){
      const varY = deta.slice(0,2)
      return varY+':'+varX
    }else if(lent === 3){
      const varY = deta.slice(0,1)
      return varY+':'+varX
    }else{
      return 0
    }
}

    console.log(ROLES)

  return (
    <div id='image__backgrounds' className='d-flex'>
    <SideBar />
    <main className="container" style={{ marginTop:'80px' }}>
      {loading && loading ? 
      <center>
        <CircularProgress style={{ width:'75px', height:'75px' }} />
      </center>
      :   
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
                    <TextField fullWidth disabled sx={{ mr:2 }} value={employee_names} type="text" label='Nama' variant='filled' />
                    <TextField fullWidth disabled value={division} type="text" label='Bagian' variant='filled' />
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
                <Box sx={{ mt:2 }}>
                    {jenis === 'lembur' ?
                    null
                  :
                  <TextField fullWidth value={jumlah_hari} onChange={e => setJumlahHari(e.target.value)} type="number" label='Jumlah Hari Kerja' variant='standard' />
                  }
                </Box>
                {jenis === 'lembur' ?
                <Box sx={{ mb:2}}>
                    <TextField fullWidth value={JaMe(lemburHour)} type="text" label='Total Jam Lembur' disabled variant='filled' />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display:'flex', justifyContent:'space-between', mt:2 }}>
                            <TextField label='Dari Jam' defaultValue={DateTimes(fromHour)} fullWidth variant='filled' disabled sx={{ mr:2 }} />
                            <TextField label='Sampai Jam' defaultValue={DateTimes(endHour)} fullWidth variant='filled' disabled />

                        </Box>
                    </LocalizationProvider>
                </Box>
                : 
                <Box sx={{ mt:2, mb:2 }}>
       
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                    label="Masuk Kembali Tanggal"
                    disablePast
                    value={return_date}
                    onChange={(newparams) => {
                        setReturnDate(newparams)
                    }}
                    renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Box>
                }
               
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
                            {permission_pi === 'ditolak' || permission_pi === 'bersyarat' ? 
                                <FormControlLabel value="bersyarat" control={<Radio />} label="Disetujui dengan syarat" />
                            : null
                            }
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
                  {permission_pil === 'bersyarat' ?
                <TextField value={conditional_reason} onChange={e => setConditionalReason(e.target.value)} fullWidth variant='standard' label='Alasan Disetujui' />
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

                <div className="d-flex justify-content-between mt-4 mb-4">
                <small className="text-secondary">Sisa Cuti Karyawan Ini : {sisaCut && sisaCut}</small>

                    {
                        permission_pi === 'disetujui'?
                        null
                        : 
                        <button onClick={handleCli} className='btn btn-primary'>Submit</button>
                    }
                </div>
            </div>
        </div>
      }
    </main>
  </div>
  )
}

export default DetailPerizinanAtasan