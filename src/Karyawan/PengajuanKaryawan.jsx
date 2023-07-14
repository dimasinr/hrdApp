import React,{useState} from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, NAMES, USER_ID, USER_TOKEN } from '../fetch/fetch'
import Swal from 'sweetalert2'
import { TextField, Box, RadioGroup, Radio, FormControl, FormControlLabel } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { ArrowBackIos } from '@mui/icons-material'
import { Col } from 'react-bootstrap'
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function PengajuanKaryawan() {

    const navigate = useNavigate()
    const [sisaCuti, setSisaCuti] = useState('')
    const [jumlah_hari, setJumlahHari] = useState('')
    const [bagian, setBagian] = useState('')
    const [alasan, setAlasan] = useState('')
    const [jenis, setJenis] = useState('izin');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [back_date, setBackDate] = useState(new Date());

    // time
    const [value, setValue] = React.useState(dayjs(new Date().toISOString()));
    const [value2, setValue2] = React.useState(dayjs(new Date().toISOString()));

    function times(ti){
        function minutes(min){
            if(min < 10){
                return '0' + min
            }else{
                return min
            }
        }
        let menit_awal = ti.$d.getHours()
        let menit_akhir = minutes(ti.$d.getMinutes())
        const total = menit_awal+''+menit_akhir
        return total
    }

    function totalTimes(x, y){
        let varX = x-y
        const lengt = varX.toString().length
        const slice_awal = lengt-2
        const sliced = varX.toString().slice(slice_awal, lengt)
        if(sliced > 59){
            return varX-60+20
        }else{
            return varX
        }
    }

    console.log(times(value2)-times(value))

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
        }else{
            return 0
        }
    }

    console.log(times(value2))
    console.log(times(value))
    const lembur_str = times(value)
    const lembur_end = times(value2)
    const total_time = totalTimes(times(value2), times(value))

    console.log(totalTimes(times(value2), times(value)))

    const handleChange = (event) => {
        setJenis(event.target.value);
    };

    const tanggal_awal = start_date.toISOString().slice(0,10)
    const tanggal_akhir = end_date.toISOString().slice(0,10)
    const masuk_kembali = back_date.toISOString().slice(0,10)
    console.log(lembur_str, lembur_end)

    const submitPetitions = async e => {
        try{
            const formData = new FormData();
            formData.append("permission_type", jenis);
            if(jenis === 'lembur'){
                formData.append("from_hour", lembur_str);
                formData.append("end_hour", lembur_end);
            }
            formData.append("reason", alasan);
            formData.append("jumlah_hari", jumlah_hari);
            formData.append("start_date", tanggal_awal);
            formData.append("end_date", tanggal_akhir);
            formData.append("return_date", masuk_kembali);

            const res = await axios({
                method: 'post',
                url:`${BASE_URL}/api/submission/employees/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            console.log(res)
            Swal.fire({
                icon: 'success',
                title: `${res.data.message}`,
                showConfirmButton: false,
                timer: 2000
              })
            navigate('/list-pengajuan')
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                        title: `Gagal`,
                        text: `${error.response.data.message}`,
                        showConfirmButton: false,
                        timer: 2500
                      })
                      console.log(error)
            }
        }
      };

    const getCuti = () => {
        axios.get(`${BASE_URL}/users/employees/${USER_ID}/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setSisaCuti(res.sisa_cuti)
          setBagian(res.division)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getCuti(), [])

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
                    <TextField fullWidth value={NAMES} type="text" label='Nama' variant='standard' />
                    <TextField fullWidth value={bagian} type="text" label='Bagian' variant='standard' />
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
                            <FormControlLabel value="izin" control={<Radio />} label="Izin" />
                            <FormControlLabel value="cuti" control={<Radio />} label="Cuti" />
                            <FormControlLabel value="sakit" control={<Radio />} label="Sakit" />
                        </Col>
                    </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <TextField value={alasan} onChange={e => setAlasan(e.target.value)} fullWidth type="text" label='Alasan' variant='standard' />
                </Box>
                <Box sx={{ mt:2, display:'flex', justifyContent:'space-between' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                    label="Tanggal Awal"
                    inputFormat="DD MMMM YYYY"
                    // disablePast
                    value={start_date}
                    onChange={(newValue) => {
                        setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                    />
                    <span className='p-3'>s/d</span>
                    <MobileDatePicker
                    label="Tanggal Berakhir"
                    inputFormat="DD MMMM YYYY"
                    // disablePast
                    value={end_date}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Box>
                <Box sx={{ mb:2 }}>
                    <TextField fullWidth value={jumlah_hari} onChange={e => setJumlahHari(e.target.value)} type="number" label='Jumlah Hari Kerja' variant='standard' />
                 </Box>
               
                {jenis === 'lembur' ?
                <Box>
                    <TextField fullWidth value={JaMe(total_time)} type="text" label='Total Jam Lembur' disabled variant='standard' />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={{ display:'flex', justifyContent:'space-between', mt:2 }}>
                            <TimePicker
                            value={value}
                            label='Dari Jam'
                            onChange={setValue}
                            renderInput={(params) => <TextField fullWidth sx={{ mr:1 }} {...params} />}
                            />
                            <TimePicker
                            value={value2}
                            label='Sampai Jam'
                            onChange={setValue2}
                            renderInput={(params) => <TextField fullWidth {...params} />}
                            />

                        </Box>
                    </LocalizationProvider>
                </Box>
                : 
                <Box sx={{ mt:2 }}>
       
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker
                    label="Masuk Kembali Tanggal"
                    // disablePast
                    inputFormat="DD MMMM YYYY"
                    value={back_date}
                    onChange={(newValue) => {
                        setBackDate(newValue);
                    }}
                    renderInput={(params) => <TextField variant='standard' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                </Box>
                }
                 

                <div className="d-flex justify-content-between mt-4 mb-4">
                    <small className='text-secondary'>Sisa Cuti Anda : {sisaCuti} *(sisa cuti berkurang berdasarkan pengajuan cuti dan izin) </small>
                    <button onClick={submitPetitions} className='btn btn-primary'>Submit</button>
                </div>
            </div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default PengajuanKaryawan