import React,{useState, useEffect} from 'react'
import SideBar from '../../../Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { CircularProgress } from '@mui/material'

function AbsensiPeriode() {
  const navigate = useNavigate();
  const location = useLocation();

  
  const name_id = location.pathname.split('/')[4]
  const start_date = location.pathname.split('/')[5]
  const end_date = location.pathname.split('/')[6]
//   const month_a = month_id-1
  console.log(name_id)
  console.log(start_date)
  console.log(end_date)

  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/attendance/employee/compare/?work_date=2023-01-01&end_work_date=2023-01-19&employee_name=${name_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setAttendance(res)
      setLoading(false) 
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [name_id])

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
                            <h4 style={{ marginTop:'8px' }}>Absensi {name_id && name_id.replace(/%20/g, " ")} Periode {start_date && start_date} sampai {end_date && end_date} </h4>
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
             
                            
                        </tbody>
                        </Table>

                        }
                      </div>

                      {/* <div className="d-flex justify-content-end">
                        <button className='btn btn-primary'>Attendance Submit</button>
                      </div> */}

                  </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default AbsensiPeriode