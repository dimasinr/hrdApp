import React,{useState} from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, NAMES, USER_ID, USER_TOKEN } from '../fetch/fetch'
import Swal from 'sweetalert2'
import { TextField, Box, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { ArrowBackIos } from '@mui/icons-material'
import { Col } from 'react-bootstrap'

function DetailPerizinanKaryawan() {

    const navigate = useNavigate()
    const location = useLocation()
    const [sisaCuti, setSisaCuti] = useState('')
    const [jumlah_hari, setJumlahHari] = useState('')
    const [bagian, setBagian] = useState('')
    const [alasan, setAlasan] = useState('')
    const [jenis, setJenis] = useState('izin');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [back_date, setBackDate] = useState(new Date());
    const [lemburHour, setLemburHour] = useState([])
    const [from_hour, setFromHour] = useState([])
    const [end_hour, setEndHour] = useState([])
    const [permission, setPermission] = useState([])
    const [reason_rejected, setReasonRejected] = useState([])
    const [conditionalReason, setConditionalReason] = useState([])
    const [suspended_start, setSuspendedStart] = useState([])
    const [suspended_end, setSuspendedEnd] = useState([])

    const pengajuan_id = location.pathname.split('/')[3]

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

    const handleChange = (event) => {
        setJenis(event.target.value);
    };

    const getPerizinan = () => {
      axios.get(`${BASE_URL}/petitions/employee/${pengajuan_id}/`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setJumlahHari(res.jumlah_hari)
        setBagian(res.division)
        setAlasan(res.reason)
        setJenis(res.permission_type)
        setStartDate(res.start_date)
        setEndDate(res.end_date)
        setBackDate(res.return_date)
        setFromHour(res.from_hour)
        setEndHour(res.end_hour)
        setLemburHour(res.lembur_hour)
        setPermission(res.permission_pil)
        setReasonRejected(res.reason_rejected)
        setSuspendedStart(res.suspended_start)
        setSuspendedEnd(res.suspended_end)
        setConditionalReason(res.conditional_reasons)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getPerizinan(), [])

    const JumlahCut = () =>{
        Swal.fire({
            icon: 'error',
            title: `Gagal`,
            text: `Jumlah cuti tidak mencukupi`,
            showConfirmButton: false,
            timer: 2500
          })
    }

    const getCuti = () => {
        axios.get(`${BASE_URL}/users/employees/${USER_ID}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setSisaCuti(res.sisa_cuti)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getCuti(), [])

      function fax(x,y){
        return x-y
      }

      const har = fax(sisaCuti, jumlah_hari)

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

  return (
    <div id='image__backgrounds' className='d-flex'>
    <SideBar />
    <main className="container" style={{ marginTop:'80px' }}>
      <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
        <div className="card-body">
            <div className="card-title">
                <button className='btn_fresh d-flex align-items-center' onClick={() => navigate(-1)}>
                    <ArrowBackIos />
                    <h5 style={{ marginTop:'7px' }}>Formulir Pengajuan Cuti/Izin</h5>
                </button>
                <Box sx={{ mt:2 }}>
                    <TextField fullWidth value={NAMES} disabled type="text" label='Nama' variant='filled' />
                    <TextField sx={{ mt:2 }} fullWidth disabled value={bagian} onChange={e => setBagian(e.target.value)} type="text" label='Bagian' variant='filled' />
                </Box>
                <Box sx={{ mt:2, display: 'flex' }}>
                    <span style={{ marginTop:'10px' }}>Jenis Cuti/Izin : </span>&nbsp;
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="jenis"
                        name="jenis"
                        value={jenis}
                        onChange={handleChange}
                    >
                        <Col md={8}>
                            <FormControlLabel value="izin" disabled control={<Radio />} label="Izin" />
                            <FormControlLabel value="cuti" disabled control={<Radio />} label="Cuti" />
                            <FormControlLabel value="lembur" disabled control={<Radio />} label="Lembur" />
                            <FormControlLabel value="sakit" disabled control={<Radio />} label="Sakit" />
                        </Col>
                    </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <TextField value={alasan} onChange={e => setAlasan(e.target.value)} fullWidth disabled type="text" label='Alasan' variant='filled' />
                </Box>
                <Box sx={{ mt:2, display:'flex', justifyContent:'space-between' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                    label="Tanggal Awal"
                    disablePast
                    disabled
                    value={start_date}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='filled' fullWidth {...params} />}
                    />
                    <span className='p-3'>s/d</span>
                    <MobileDatePicker
                    label="Tanggal Berakhir"
                    disablePast
                    disabled
                    value={end_date}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='filled' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Box>
                <Box sx={{ mb:2, mt:2 }}>
                    <TextField fullWidth value={jumlah_hari} onChange={e => setJumlahHari(e.target.value)} type="number" disabled label='Jumlah Hari Kerja' variant='filled' />
                 </Box>
               
                {jenis === 'lembur' ?
                <Box>
                    <TextField fullWidth value={JaMe(lemburHour)} type="text" label='Total Jam Lembur' disabled variant='filled' />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display:'flex', justifyContent:'space-between', mt:2 }}>
                            <TextField label='Dari Jam' defaultValue={DateTimes(from_hour)} fullWidth variant='filled' disabled sx={{ mr:2 }} />
                            <TextField label='Sampai Jam' defaultValue={DateTimes(end_hour)} fullWidth variant='filled' disabled />

                        </Box>
                    </LocalizationProvider>
                </Box>
                : 
                <Box sx={{ mt:2 }}>
       
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                    label="Masuk Kembali Tanggal"
                    disablePast
                    value={back_date}
                    onChange={(newValue) => {
                        setBackDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Box>
                }

                <Box sx={{ mt:2 }}>
                  <small className="text-secondary mb-2">Persetujuan Atasan</small>
                  <br />
                  {permission === null ?
                  <h5>Menunggu Persetujuan</h5>
                  : null
                  }
                  {permission === 'disetujui' ?
                      <div className="row mt-2">
                          <span><h5>{capitalizeFirstLetter(permission)}</h5></span>
                      </div>
                  : null
                  }
                    {permission === 'ditolak' ?
                      <div className="row mt-2">
                          <span><h5>{capitalizeFirstLetter(permission)}</h5></span>
                          <div className="containe">
                            <TextField fullWidth value={reason_rejected} type="text" label='Alasan Ditolak' variant='standard' />
                          </div>
                      </div>
                  : null
                  }
                  {permission === 'ditangguhkan' ?
                      <div className="row mt-2">
                          <span><h5>{capitalizeFirstLetter(permission)}</h5></span>
                          <Box sx={{ display:'flex' }}>
                              <TextField sx={{ mt:2, mr:2 }} fullWidth value={suspended_start} type="text" label='Awal Tanggal Ditangguhkan' variant='standard' />
                              <TextField sx={{ mt:2 }} fullWidth value={suspended_end} type="text" label='Akhir Tanggal Ditangguhkan' variant='standard' />
                          </Box>
                      </div>
                  : null
                  }
                  {permission === 'bersyarat' ?
                      <div className="row mt-2">
                          <span><h5>Persetujuan {capitalizeFirstLetter(permission)}</h5><small className='text-secondary'>menunggu persetujuan dari hrd</small></span>
                          <Box sx={{ display:'flex' }}>
                              <TextField sx={{ mt:2 }} fullWidth value={conditionalReason} type="text" label='Disetujui atasan karena' variant='standard' />
                          </Box>
                      </div>
                  : null
                  }
              </Box>

                <div className="mt-3">
                  <small className='text-secondary'>Sisa Cuti Anda : {sisaCuti} *(sisa cuti berkurang berdasarkan pengajuan cuti dan izin) </small>
                </div>
                {permission === null ?
                <div className="d-flex justify-content-end mt-2 mb-4">
                    <button onClick={har < '1' ? JumlahCut : JumlahCut} className='btn text-danger'>Hapus Pengajuan</button>
                </div>
                  : null
                  }
            </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default DetailPerizinanKaryawan