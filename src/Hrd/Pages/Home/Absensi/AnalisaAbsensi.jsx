import React,{useState, useEffect} from 'react'
import SideBar from '../../../Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { CircularProgress } from '@mui/material'

function AnalisaAbsensi() {
  const navigate = useNavigate();
  const location = useLocation();

  const bulan = [
    {
      'month': 'Januari',
      'value': 1
    },
    {
      'month': 'Febuari',
      'value': 2
    },
    {
      'month': 'Maret',
      'value': 3
    },
    {
      'month': 'April',
      'value': 4
    },
    {
      'month': 'Mei',
      'value': 5
    },{
      'month': 'Juni',
      'value': 6
    },
    {
      'month': 'Juli',
      'value': 7
    },
    {
      'month': 'Agustus',
      'value': 8
    },
    {
      'month': 'September',
      'value': 9
    },
    {
      'month': 'Oktober',
      'value': 10
    },
    {
      'month': 'November',
      'value': 11
    },
    {
      'month': 'Desember',
      'value': 12
    }

  ]

  const name_id = location.pathname.split('/')[3]
  const month_id = location.pathname.split('/')[4]
  const year_id = location.pathname.split('/')[5]
  const month_a = month_id-1

  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState([])
  const [TotalAttendance, setTotalAttendance] = useState([])
  const [results_working, setWorkingHourTotal] = useState([])
  const [results_lembur, setResultsLembur] = useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/attendance/employee-sea/?employee_name=${name_id}&months=${month_id}&years=${year_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setAttendance(res)
      setLoading(false) 
      setWorkingHourTotal(res.map((ab) => {
        return(ab.working_hour)
        }))
      setResultsLembur(res.map((ab) => {
        return(ab.lembur_hour)
        }))
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [name_id, month_id])

  const getTotalDay = () => {
    axios.get(`${BASE_URL}/attendance/total-day/?employee_name=${name_id}&months=${month_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setTotalAttendance(res.data)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getTotalDay(), [name_id, month_id])

    function totalAtt(x,y){
      return x-y
    }

    function leb(x,y){
        if(x < 800){
            return '-' + x - y
        }else{
            return '+' + x - y
        }
    }

    function sumTotal(arr){
        let results = arr.reduce((a, b) => {
            return a + b;
        }, 0);
        const lent = results.toString().length 
        const sliced = results.toString().slice(lent-2, lent)
        if(sliced < 60 ){
          return results
        }else{
          return results-100+60
        }
    }

    console.log(sumTotal(results_lembur))
    function sumHE(he){
      if(name_id.replace(/%20/g, " ") === 'kunut'){
        return he*900
      }else{
        return he*800
      }
    }


  return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
            <main className="container mt-3">
                <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                      <button className='btn' onClick={() => navigate(-1)}>
                          <span className="d-flex align-items-center mb-2">
                            <ArrowBackIos />
                            <h4 style={{ marginTop:'8px' }}>Analisa Absensi {name_id && name_id.replace(/%20/g, " ")} Bulan {bulan[month_a].month} </h4>
                          </span>
                        </button>
                      <div className="col-md-12">
                        {loading && loading ? 
                        <CircularProgress />
                        : 
                        <Table bordered hover>
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Nama Karyawan</th>
                            <th>Tanggal Hari Kerja</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>Lembur Masuk</th>
                            <th>Lembur Pulang</th>
                            <th>Total Jam Kerja</th>
                            <th>Total Jam Lembur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((att, index) => {
                                return(
                                    <tr key={index}>
                                    <td>{att.id}</td>
                                    <td>{att.employee_name}</td>
                                    <td>{att.working_date ? att.working_date : '-'}</td>
                                    <td>
                                      {att.start_from !== null ? att.start_from.toString().length === 4 ?
                                        att.start_from.toString().slice(0,2) + ':' + att.start_from.toString().slice(2,4)
                                        : null : ''
                                      }
                                      {att.start_from !== null ? att.start_from.toString().length === 3 ?
                                        att.start_from.toString().slice(0,1) + ':' + att.start_from.toString().slice(1,3)
                                        : null : '-'
                                      }
                                    </td>
                                    <td>
                                      {att.end_from !== null ?
                                      att.end_from.toString().length === 4 ?
                                      att.end_from.toString().slice(0,2) + ':' + att.end_from.toString().slice(2,4)
                                      : null : ''
                                      }
                                      {att.end_from !== null ? 
                                      att.end_from.toString().length === 3 ?
                                      att.end_from.toString().slice(0,1) + ':' + att.end_from.toString().slice(1,3)
                                      : null : '-'
                                      }
                                    </td>
                                    <td>
                                      {att.lembur_start !== null ? att.lembur_start.toString().length === 4 ?
                                        att.lembur_start.toString().slice(0,2) + ':' + att.lembur_start.toString().slice(2,4)
                                        : null
                                        : null 
                                      }
                                       {att.lembur_start !== null ? att.lembur_start.toString().length === 3 ?
                                        att.lembur_start.toString().slice(0,1) + ':' + att.lembur_start.toString().slice(1,3)
                                        : null
                                        : null 
                                      }
                                    </td>
                                    <td>
                                      {att.lembur_end !== null ? att.lembur_end.toString().length === 4 ?
                                        att.lembur_end.toString().slice(0,2) + ':' + att.lembur_end.toString().slice(2,4)
                                        : null
                                        : null 
                                      }
                                       {att.lembur_end !== null ? att.lembur_end.toString().length === 3 ?
                                        att.lembur_end.toString().slice(0,1) + ':' + att.lembur_end.toString().slice(1,3)
                                        : null
                                        : null 
                                      }
                                    </td>
                                   
                                    <td>
                                    {att.working_hour !== null ? att.working_hour.toString().length === 3 ?
                                      att.working_hour.toString().slice(0,1) + ','+ att.working_hour.toString().slice(1,3) + ' Jam'
                                      : null : null
                                    }
                                    {att.working_hour !== null ? att.working_hour.toString().length === 4 ?
                                      att.working_hour.toString().slice(0,2) + ',' + att.working_hour.toString().slice(2,4) + ' Jam'
                                    : null : null
                                    }
                                      {/* </td> */}
                                      {/* <td> */}
                                    </td>
                                    <td>
                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 2 ?
                                        att.lembur_hour + ' Menit'
                                        : null : null
                                      }
                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 3 ?
                                        att.lembur_hour.toString().slice(0,1) + ','+ att.lembur_hour.toString().slice(1,3) + ' Jam'
                                        : null : null
                                      }
                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 4 ?
                                        att.lembur_hour.toString().slice(0,2) + ',' + att.lembur_hour.toString().slice(2,4) + ' Jam'
                                      : null : null
                                      }
                                    </td>
                                  </tr>   
                                )
                            })}
                            <tr>
                                <td colSpan={7}>Total</td>
                                {sumTotal(results_working).toString().length === 3 ?
                                    <td colSpan={1}>
                                      {sumTotal(results_working).toString().slice(0,1)},{sumTotal(results_working).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_working).toString().length === 4 ?
                                    <td colSpan={1}>
                                      {sumTotal(results_working).toString().slice(0,2)},{sumTotal(results_working).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_working).toString().length === 5 ?
                                    <td colSpan={1}>
                                      {sumTotal(results_working).toString().slice(0,3)},{sumTotal(results_working).toString().slice(3,5)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_working) === 0 ?
                                    <td colSpan={1}>
                                      
                                    </td>
                                    : null
                                  }

                                {/* Lembur */}

                                {sumTotal(results_lembur).toString().length === 3 ?
                                    <td colSpan={1}>
                                      {sumTotal(results_lembur).toString().slice(0,1)},{sumTotal(results_lembur).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_lembur).toString().length === 4 ?
                                    <td colSpan={1}>
                                      {sumTotal(results_lembur).toString().slice(0,2)},{sumTotal(results_lembur).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                                                
                            </tr> 
                            <tr>
                                <td colSpan={10}>Analisa Absensi</td>
                            </tr>
                            <tr>
                                <td colSpan={7}>Hari Kerja Efektif</td>
                                <td colSpan={3}>{totalAtt(attendance.length, TotalAttendance.employee_lembur)} Hari</td>
                            </tr> 
                            <tr>
                                <td colSpan={7}>Jumlah Jam Kerja Efektif</td>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)) === 0 ?
                                  <td colSpan={3}></td> : null
                                }
                                {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 3 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,1)}, 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(1,3)} Jam
                                  </td>
                                  : null
                                }

                                {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 4 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,2)}, 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(2,4)} Jam
                                  </td>
                                  : null
                                }

                              {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 5 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,3)}, 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(3,5)} Jam
                                  </td>
                                  : null
                                }                                
                                  
                                  
                            </tr> 
                            <tr>
                                <td colSpan={7}>Jumlah Jam Kerja Aktual</td>
                                {sumTotal(results_working) === 0 ?
                                    <td colSpan={3}>
                                    </td>
                                    : null
                                  }
                                {sumTotal(results_working).toString().length === 3 ?
                                    <td colSpan={3}>
                                      {sumTotal(results_working).toString().slice(0,1)},{sumTotal(results_working).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                {sumTotal(results_working).toString().length === 4 ?
                                    <td colSpan={3}>
                                      {sumTotal(results_working).toString().slice(0,2)},{sumTotal(results_working).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_working).toString().length === 5 ?
                                    <td colSpan={3}>
                                      {sumTotal(results_working).toString().slice(0,3)},{sumTotal(results_working).toString().slice(3,5)} Jam
                                    </td>
                                    : null
                                  }
                            </tr> 
                            <tr>
                                <td colSpan={7}>Jumlah Jam Lembur</td>
                                {sumTotal(results_lembur).toString().length === 3 ?
                                    <td colSpan={3}>
                                      {sumTotal(results_lembur).toString().slice(0,1)},{sumTotal(results_lembur).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {sumTotal(results_lembur).toString().length === 4 ?
                                    <td colSpan={3}>
                                      {sumTotal(results_lembur).toString().slice(0,2)},{sumTotal(results_lembur).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                            </tr> 
                            {/* <tr>
                                <td colSpan={7}>Jam Kerja Aktual - lembur</td>
                                <td colSpan={3}>
                                  {AktualLembur(sumTotal(results_working), sumTotal(results_lembur))} Jam
                                </td>
                            </tr>  */}
                            <tr>
                                <td colSpan={7}>(Kurang/Lebih) Jam Kerja</td>
                                {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))) === 0 ?
                                    <td colSpan={3}>
                                    </td>
                                    : null
                                  }
                                {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().length === 2 ?
                                    <td colSpan={3}>
                                      {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(0,2)} Menit
                                    </td>
                                    : null
                                  }
                                {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().length === 3 ?
                                    <td colSpan={3}>
                                      {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(0,1)},{leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().length === 4 ?
                                    <td colSpan={3}>
                                      {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(0,2)},{leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().length === 5 ?
                                    <td colSpan={3}>
                                      {leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(0,3)},{leb(sumTotal(results_working), sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))).toString().slice(3,5)} Jam
                                    </td>
                                    : null
                                  }
                            </tr> 
                            
                        </tbody>
                        </Table>

                        }
                      </div>

                      <div className="d-flex justify-content-end">
                        <button className='btn btn-primary'>Attendance Submit</button>
                      </div>

                  </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default AnalisaAbsensi