import React,{useState, useEffect} from 'react'
import SideBar from '../../../Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos, Delete } from '@mui/icons-material'
import { Box, TextField, InputLabel, Select, FormControl, MenuItem } from '@mui/material'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import Swal from 'sweetalert2'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function DetailPresence() {
  const navigate = useNavigate()
  const location = useLocation()

  const id_att = location.pathname.split('/')[3]

  const [employeeName, setEmployeeName] = useState('')
  const [jam_masuk, setJamMasuk] = useState('')
  const [jam_keluar, setJamKeluar] = useState('')
  const [total_jam, setTotalJam] = useState('')
  const [lembur_total, setLemburTotal] = useState('')
  const [lembur_start, setLemburStart] = useState('')
  const [lembur_end, setLemburEnd] = useState('')
  const [keterangan, setKeterangan] = useState('')
  const [working_date, setWorkingDate] = useState(new Date())

  
  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setWorkingDate(dated.slice(1, 11))
  }

  const getAttendanceEmp = () => {
    axios.get(`${BASE_URL}/api/presence/employees/${id_att}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setEmployeeName(res.employee.pk)
      setJamMasuk(res.start_from)
      setJamKeluar(res.end_from)
      setLemburStart(res.lembur_start)
      setLemburEnd(res.lembur_end)
      setLemburTotal(res.lembur_hour)
      setTotalJam(res.working_hour)
      setWorkingDate(res.working_date)
      setKeterangan(res.ket)
      console.log(res)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getAttendanceEmp(), [id_att])
  
  console.log(lembur_start)
  console.log(keterangan)

  const saveAttendance = async e => {
    try{
        const formData = new FormData();
        formData.append("employee", employeeName);
        formData.append("working_date", working_date);
        if(jam_masuk !== null & jam_keluar !== null){
          formData.append("start_from", jam_masuk);
          formData.append("end_from", jam_keluar);
        }
        if(lembur_start !== null & lembur_end !== null){
          formData.append("lembur_start", lembur_start);
          formData.append("lembur_end", lembur_end);
        }
        formData.append("ket", keterangan)

       await axios({
            method: 'put',
            url:`${BASE_URL}/api/presence/employees/${id_att}/`,
            data: formData,
            headers: {
                "Authorization" : `Token ${USER_TOKEN}`
              }
        })
        Swal.fire({
            icon: 'success',
            text: `Berhasil di perbaharui`,
            showConfirmButton: false,
            timer: 1500
          })
          getEmployeeData()
          navigate(-1)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                      icon: 'error',
                      text: `Gagal diperbaharui`,
                  // text: `${error.response.data.detail}`
                })
                console.log(error)
            }
        }
      };

      const deleteAttendance = async e => {
        try{
           const res = await axios({
                method: 'delete',
                url:`${BASE_URL}/api/presence/employees/${id_att}/`,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            Swal.fire({
                icon: 'success',
                text: `Berhasil dihapus`,
                showConfirmButton: false,
                timer: 1500
              })
              console.log(res)
              navigate(-1)
            }catch(error){
                if( error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                    ){
                        Swal.fire({
                          icon: 'error',
                          text: 'Gagal',
                      // text: `${error.response.data.detail}`
                    })
                    console.log(error)
                }
            }
          };

      const [employeeS, setEmployeeS] = useState([])
      const getEmployeeData = () => {
        axios.get(`${BASE_URL}/users/employee/name/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setEmployeeS(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getEmployeeData(), [])

      const handleChanged = (event) => {
        setEmployeeName(event.target.value);
      };

  return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
            <main className="container mt-2">
                <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                      <button className='btn' onClick={() => navigate(-1)}>
                          <span className="d-flex align-items-center">
                            <ArrowBackIos /> <h5 style={{ marginTop:'8px' }}>Edit Absensi Karyawan</h5>
                          </span>
                        </button>
                        
                         <Box sx={{ display:'flex', mt:1, mb:2 }}>
                            <FormControl sx={{ mr:1, minWidth: 220 }}>
                              <InputLabel id="division-label">Nama Karyawan</InputLabel>
                              <Select
                              labelId="division"
                              id="division"
                              value={employeeName}
                              onChange={handleChanged}
                              label="Divisi"
                              >
                                  {employeeS && employeeS.map((emp, index) => {
                                      return(
                                          <MenuItem value={emp.pk} key={index}>{emp.name}</MenuItem>
                                      )
                                  })}
                              
                              </Select>
                          </FormControl>
                            <TextField sx={{ mr:2 }} value={jam_masuk} onChange={e => setJamMasuk(e.target.value)} fullWidth type='text' label='Jam Masuk' />
                            <TextField sx={{ mr:2 }} value={jam_keluar} onChange={e => setJamKeluar(e.target.value)} fullWidth type='text' label='Jam Pulang' />
                            <TextField fullWidth disabled value={total_jam} type='text' label='Total Jam Kerja' />
                         </Box>
                         <Box sx={{ display:'flex', mr:2, mb:2 }}>
                            <TextField sx={{ mr:2 }} value={lembur_start} onChange={e => setLemburStart(e.target.value)} fullWidth type='text' label='Jam Awal Lembur' />
                            <TextField sx={{ mr:2 }} value={lembur_end} onChange={e => setLemburEnd(e.target.value)} fullWidth type='text' label='Jam Akhir Lembur' />
                            <TextField sx={{ mr:2 }} value={lembur_total} disabled fullWidth type='text' label='Total Jam Lembur' />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                label="Working Date"
                                value={working_date}
                                onChange={(newValue) => {
                                    convDate(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
                                />
                            </LocalizationProvider>
                         </Box>
                      <div className="d-flex justify-content-end">
                            <button onClick={saveAttendance} className="btn text-primary" style={{ marginRight:'20px' }}>Simpan</button>
                            <button onClick={deleteAttendance} className="btn text-danger"><Delete /></button>
                      </div>
                      <Box>
                        <div className="text-secondary">
                            Format untuk input jam, contoh : 
                          <ul>
                            <li>950 untuk jam 09:50</li>
                            <li>2210 untuk jam 22:10</li>
                          </ul>
                          <small>*Penginputan seperti diatas agar bisa dihitung oleh programnya. Jam Lembur hanya opsional saja tidak perlu di isi</small>
                        </div>
                      </Box>
                  </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default DetailPresence