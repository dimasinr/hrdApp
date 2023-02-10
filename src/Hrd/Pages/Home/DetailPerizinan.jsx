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
    const [employee_names, setEmployeeName] = useState('');
    const [division, setDivision] = useState('');
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
    
    const [lembur_start, setLemburStart] = useState('');
    const [lembur_end, setLemburEnd] = useState('');
    const [work_hour, setWorkHour] = useState('');

    const [email, setEmail] = useState('')
    const [permission_pil, setPermissionPil] = useState('');
    const [reason_rejected, setReasonRejected] = useState(null);
    const [conditional_reason, setConditionalReason] = useState(null);
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
        setConditionalReason(res.conditional_reasons)
        setEndDate(res.end_date)
        setReturnDate(res.return_date)
        setReasonRejected(res.reason_rejected)
        setPermissionPil(res.permission_pil)
        setPermissionPi(res.permission_pil)
        setReason(res.reason)
        setJumlHari(res.jumlah_hari)
        setLemburStart(res.from_hour)
        setLemburEnd(res.end_hour)
        setWorkHour(res.lembur_hour)
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
          setEmail(res.email)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getEmployees(), [emp_id])

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
            }
            formData.append("jumlah_hari", jumlah_hari);
            const res = await axios({
                method: 'put',
                url:`${BASE_URL}/petitions/employee/${id}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            if(jenis === 'cuti' & permission_pil === 'disetujui' ){
                CalendarInput()
            }
            if(jenis === 'lembur'){
                AttendanceInput()
            }
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
    
    const actv = true
    function TotalCu(x,y){
        return x-y
    }
    function TotalCuPlus(x,y){
        return x+y
    }
    const cutiAkhir = TotalCu(sisaCut, jumlah_hari)
    const cutiAkhirPlus = TotalCuPlus(sisaCut, jumlah_hari)

    console.log("min cuti :", TotalCu(sisaCut, jumlah_hari))
    console.log("plus cuti :", TotalCuPlus(sisaCut, jumlah_hari))

    const perizinanSisaCuti = async e => {
        try{
            const formData = new FormData();
            if(permission_pi === 'disetujui'){
                formData.append("sisa_cuti", cutiAkhirPlus);
            }else{
                formData.append("sisa_cuti", cutiAkhir);
            }
            formData.append("username", username);
            formData.append("email", email);
            formData.append("is_active", actv);
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
            formData.append("lembur_start", lembur_start);
            formData.append("lembur_end", lembur_end);
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

      const pengajuanDelete = async e => {
        try{
            const res = await axios({
                method: 'delete',
                url:`${BASE_URL}/petitions/employee/${id}/`,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            perizinanSisaCuti()
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: 'Success',
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


      const handleCli = () => {
        if (ROLES === 'hrd' & cutiAkhir > '1') {
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

      function hours(x){
        if(x !== null){
            const delta = x.toString().length
            if(delta === 4){
                let hour = x.toString()
                const diAw = hour.slice(0,2)
                const diAk = hour.slice(2,4)
                return diAw + ':' + diAk
            }
        }
      }

      function dateHours(y){
        if(y !== null){
            const delta = y.toString().length
        let hour = y.toString()
        if(delta === 4){
            const diAw = hour.slice(0,2)
            const diAk = hour.slice(2,4)
            return diAw + ',' + diAk + ' Jam'
        }else if(delta === 3){
            const diAw = hour.slice(0,1)
            const diAk = hour.slice(1,3)
            return diAw + ',' + diAk + ' Jam'
        }else if(delta === 2){
            return hour + ' Menit'
        }
        }
      }

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
                                    <TextField fullWidth disabled sx={{ mr:2 }} onChange={e => setEmployeeName(e.target.value)} value={employee_names} type="text" label='Nama' variant='filled' />
                                    <TextField fullWidth disabled value={division} onChange={e => setDivision(e.target.value)} type="text" label='Bagian' variant='filled' />
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
                                {
                                        permission_pi === 'disetujui'?
                                        <TextField value={jumlah_hari} onChange={e => setJumlHari(e.target.value)} disabled fullWidth type="number" label='Jumlah Hari Kerja' variant='filled' />
                                        : 
                                        <TextField value={jumlah_hari} onChange={e => setJumlHari(e.target.value)} fullWidth type="number" label='Jumlah Hari Kerja' variant='standard' />
                                        //  <TextField value={jumlah_hari && jumlah_hari.jumlah_hari} disabled fullWidth type="number" label='Jumlah Hari Kerja' variant='filled' />
                                    }
                                </Box>

                               {jenis === 'lembur' ?
                            <React.Fragment>
                                 <Box sx={{ mt:1, display:'flex' }}>
                             <TextField value={hours(lembur_start)} sx={{ mr:1 }} onChange={e => setLemburStart(e.target.value)} disabled fullWidth type="text" label='Dari Jam' variant='filled' />
                             <TextField value={hours(lembur_end)} onChange={e => setLemburEnd(e.target.value)} disabled fullWidth type="text" label='Sampai Jam' variant='filled' />
                                </Box>

                                <TextField value={dateHours(work_hour)} sx={{ mt:2 }} onChange={e => setWorkHour(e.target.value)} disabled fullWidth type="text" label='Total Jam' variant='filled' />
                            </React.Fragment>
                                : null
                            }
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
                                            <FormControlLabel disabled value="ditangguhkan" control={<Radio />} label="Ditangguhkan menjadi Tanggal" />
                                            {permission_pi === 'ditolak' || permission_pi === 'bersyarat'  ? 
                                            <FormControlLabel value="bersyarat" control={<Radio />} label="Disetujui Dengan Bersyarat" />
                                            : null    
                                            }
                                            <FormControlLabel disabled value="ditolak" control={<Radio />} label="Ditolak" />
                                        </Col>
                                        
                                        }
                                    </RadioGroup>
                                    </FormControl>
                                </Box>
                                {permission_pil === 'ditolak' ?
                                <TextField value={reason_rejected} disabled onChange={e => setReasonRejected(e.target.value)} fullWidth variant='filled' label='Alasan' />
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
                                    <small className="text-secondary">Sisa Cuti Karyawan Ini : {sisaCut && sisaCut} 
                                    </small>
                                    {
                                        permission_pi === 'disetujui'?
                                        <button onClick={pengajuanDelete} className='btn text-danger'>
                                            Hapus Pengajuan
                                        </button>
                                        : 
                                        <button onClick={handleCli} className='btn btn-primary'>Submit</button>
                                    }
                                </div>
                                    <small>
                                    *(pengurangan sisa cuti berdasarkan izin, cuti, dan tanpa keterangan tidak hadir)
                                    </small>
                                
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