import React,{useState, useEffect} from 'react'
import SideBar from '../../../Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos, GetApp } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { CircularProgress, Tooltip } from '@mui/material'
// import { DownloadTableExcel } from 'react-export-table-to-excel';
import { useDownloadExcel } from 'react-export-table-to-excel'
import { bulan } from '../../../../Components/utilsFunction/arrayFunction'
import { sumTotal, sumHE, totalAtt, aktualLembur, leb, asce, ascr, dividDed } from './utlis/utlis'
import { changeDayName, datesUpt, workHour } from '../../../../Components/utilsFunction/functionUtils'

function AnalisaPresence() {
  const tableRef = React.useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  const name_id = location.pathname.split('/')[2]
  const user_id = location.pathname.split('/')[3]
  const month_id = location.pathname.split('/')[4]
  const year_id = location.pathname.split('/')[5]
  console.log(name_id)
  const month_a = month_id-1

  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState([])
  const [TotalAttendance, setTotalAttendance] = useState([])

  const [hour_working, setHourWorking] = useState([])
  const [minutes_working, setMinutesWorking] = useState([])

  const [hour_lembur, setHourLembur] = useState([])
  const [minutes_lembur, setMinutesLembur] = useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/presence/employee/analysis/?employee=${user_id}&months=${month_id}&years=${year_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setAttendance(res)
      setLoading(false) 

      setHourWorking(res.map((ab) => {
        return(ascr(ab.working_hour))
        }))

      setMinutesWorking(res.map((ab) => {
        return(asce(ab.working_hour))
        }))

      // setResultsLembur(res.map((ab) => {
      //   return(ab.lembur_hour)
      //   }))

      setHourLembur(res.map((ab) => {
          return(ascr(ab.lembur_hour))
        }))
      
      setMinutesLembur(res.map((ab) => {
        return(asce(ab.lembur_hour))
        }))

      window.scrollTo({ top: 0, behavior: 'smooth' });

      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [user_id, month_id, loading])

  const getTotalDay = () => {
    axios.get(`${BASE_URL}/api/presence/total-day/?employee=${user_id}&months=${month_id}`,{
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
  useEffect(() => getTotalDay(), [user_id, month_id])
  
    const sumData = sumTotal(minutes_working)/60
    const sumDataLembur = sumTotal(minutes_lembur)/60
    
    const sumDataWork = sumTotal(hour_working)
    const sumHourLembur = sumTotal(hour_lembur)
    
    console.log(sumTotal(hour_working))
    console.log("func baru : ",dividDed(sumData, sumDataWork))
    console.log(sumTotal(minutes_working))

    const lemburTotal = dividDed(sumDataLembur, sumHourLembur)
    const jamKerjaA = dividDed(sumData, sumDataWork)

    const jamKerjaS = sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur))

    const aktualLem = aktualLembur(jamKerjaA, lemburTotal)
    
    const kurangLeb = leb(aktualLem, jamKerjaS)

    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: `Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
      sheet: `Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
  })

  return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
            <main className="container mt-3">
                <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <button className='btn' onClick={() => navigate(-1)}>
                          <span className="d-flex align-items-center mb-2">
                            <ArrowBackIos />
                            <h4 style={{ marginTop:'8px' }}>Analisa Absensi {name_id && name_id.replace(/%20/g, " ")} Bulan {bulan[month_a].month} </h4>
                          </span>
                        </button>
                        {/* <DownloadTableExcel
                            filename={`Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`}
                            sheet={`Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`}
                            currentTableRef={tableRef.current}
                        > */}
                          <Tooltip title='Export to excel'>
                            <button onClick={onDownload} className='btn'> <GetApp /> </button>
                          </Tooltip>

                        {/* </DownloadTableExcel> */}

                    </div>
                      <div className="col-md-12">
                        {loading && loading ? 
                        <CircularProgress />
                        : 
                        <Table ref={tableRef} bordered hover responsive>
                        <thead>
                            <tr>
                            <th>Pid</th>
                            <th>Nama</th>
                            <th>Tanggal</th>
                            <th>Hari</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>LemburS</th>
                            <th>LemburE</th>
                            <th>Keterangan</th>
                            <th>Total Jam Kerja</th>
                            <th>Total Jam Lembur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((att, index) => {
                                return(
                                    <tr key={index}>
                                    <td>{att.id}</td>
                                    <td>{att.employee && att.employee.name ? att.employee.name : "Nawastra Employee" }</td>
                                    <td>{att.working_date ? datesUpt(att.working_date) : '-'}</td>
                                    <td>{att.days ? changeDayName(att.days) : "-"}</td>
                                    <td>{att.start_from ? workHour(att.start_from) : "-"}</td>
                                    <td>{att.end_from ? workHour(att.end_from) : "-"}</td>
                                    <td>{att.lembur_start ? workHour(att.lembur_start) : "-"}</td>
                                    <td>{att.lembur_end ? workHour(att.lembur_end) : "-"}</td>
                                    <td>{att.ket ? att.ket : null}</td>
                                   
                                    <td>
                                      {/* Total Jam Kerja */}
                                      {att.working_hour !== null ? att.working_hour.toString().length === 1 ?
                                      att.working_hour.toString() + ' Menit'
                                      : null : null
                                    }
                                      {att.working_hour !== null ? att.working_hour.toString().length === 2 ?
                                      att.working_hour.toString() + ' Menit'
                                      : null : null
                                    }
                                    {att.working_hour !== null ? att.working_hour.toString().length === 3 ?
                                      att.working_hour.toString().slice(0,1) + ':'+ att.working_hour.toString().slice(1,3) + ' Jam'
                                      : null : null
                                    }
                                    {att.working_hour !== null ? att.working_hour.toString().length === 4 ?
                                      att.working_hour.toString().slice(0,2) + ':' + att.working_hour.toString().slice(2,4) + ' Jam'
                                    : null : null
                                    }
                                      {/* </td> */}
                                      {/* <td> */}
                                    </td>
                                    <td>
                                      {/* Total Jam Lembur */}

                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 2 ?
                                        att.lembur_hour + ' Menit'
                                        : null : null
                                      }
                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 3 ?
                                        att.lembur_hour.toString().slice(0,1) + ':'+ att.lembur_hour.toString().slice(1,3) + ' Jam'
                                        : null : null
                                      }
                                      {att.lembur_hour !== null ? att.lembur_hour.toString().length === 4 ?
                                        att.lembur_hour.toString().slice(0,2) + ':' + att.lembur_hour.toString().slice(2,4) + ' Jam'
                                      : null : null
                                      }
                                    </td>
                                    
                                  </tr>   
                                )
                            })}
                            <tr>
                                <td colSpan={9}>Total</td>
                                
                                  {dividDed(sumData, sumDataWork).toString().length === 1 ?
                                    <td colSpan={1}>
                                      {dividDed(sumData, sumDataWork).toString()} Menit
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 2 ?
                                    <td colSpan={1}>
                                      {dividDed(sumData, sumDataWork).toString()} Menit
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 3 ?
                                    <td colSpan={1}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,1)},{dividDed(sumData, sumDataWork).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 4 ?
                                    <td colSpan={1}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,2)},{dividDed(sumData, sumDataWork).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 5 ?
                                    <td colSpan={1}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,3)},{dividDed(sumData, sumDataWork).toString().slice(3,5)} Jam
                                    </td>
                                    : null
                                  }
                                  {/* {dividDed(sumData, sumDataWork) === 0 ?
                                    <td colSpan={1}>
                                      
                                    </td>
                                    : null
                                  } */}

                                {/* Total Lembur */}

                                <td colSpan={1}>
                                  {lemburTotal.toString().length === 2 ?
                                      lemburTotal.toString() +' Menit'
                                      : null
                                  }
                            
                                {lemburTotal.toString().length === 3 ?
                                      lemburTotal.toString().slice(0,1)+":"+
                                      lemburTotal.toString().slice(1,3)+" Jam"
                                    : null
                                  }
                                 
                                {lemburTotal.toString().length === 4 ?
                                      lemburTotal.toString().slice(0,2)+':'+
                                      lemburTotal.toString().slice(2,4) +' Jam'
                                    : null
                                  }
                                   {lemburTotal.toString().length === 5 ?
                                      lemburTotal.toString().slice(0,3)+':'+
                                      lemburTotal.toString().slice(3,5) +' Jam'
                                    : null
                                  }
                                </td>
                                                                
                            </tr> 
                            <tr>
                                <td colSpan={11}>Analisa Absensi</td>
                            </tr>
                            <tr>
                                <td colSpan={8}>Hari Kerja Efektif</td>
                                <td colSpan={3}>{totalAtt(attendance.length, TotalAttendance.employee_lembur)} Hari</td>
                            </tr> 
                            <tr>
                                <td colSpan={8}>Jumlah Jam Kerja Efektif</td>
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)) === 0 ?
                                  <td colSpan={3}></td> : null
                                }
                                {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 3 ?
                                <td colSpan={3}>
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,1)}: 
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(1,3)} Jam
                                  </td>
                                  : null
                                }

                                {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 4 ?
                                <td colSpan={3}>
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,2)}: 
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(2,4)} Jam
                                  </td>
                                  : null
                                }

                              {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 5 ?
                                <td colSpan={3}>
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,3)}: 
                                  {sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(3,5)} Jam
                                  </td>
                                  : null
                                }                                
                                  
                            </tr> 
                            <tr>
                                <td colSpan={8}>Jumlah Jam Kerja Aktual</td>
                                {/* {dividDed(sumData, sumDataWork) === 0 ?
                                    <td colSpan={3}>
                                    </td>
                                    : null
                                  } */}
                                  {dividDed(sumData, sumDataWork).toString().length === 1 ?
                                    <td colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString()} Menit
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 2 ?
                                    <td colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString()} Menit
                                    </td>
                                    : null
                                  }
                                {dividDed(sumData, sumDataWork).toString().length === 3 ?
                                    <td colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,1)}:
                                      {dividDed(sumData, sumDataWork).toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                {dividDed(sumData, sumDataWork).toString().length === 4 ?
                                    <td colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,2)}:
                                      {dividDed(sumData, sumDataWork).toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {dividDed(sumData, sumDataWork).toString().length === 5 ?
                                    <td colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString().slice(0,3)}:
                                      {dividDed(sumData, sumDataWork).toString().slice(3,5)} Jam
                                    </td>
                                    : null
                                  }
                            </tr> 
                            <tr>
                                <td colSpan={8}>Jumlah Jam Lembur</td>
                                {lemburTotal.toString().length === 0 ?
                                    <td colSpan={3}>
                                      
                                    </td>
                                    : null
                                  }
                                  {lemburTotal.toString().length === 1 ?
                                    <td colSpan={3}>
                                      {lemburTotal.toString()} Menit
                                    </td>
                                    : null
                                  }
                                  {lemburTotal.toString().length === 2 ?
                                    <td colSpan={3}>
                                      {lemburTotal.toString()} Menit
                                    </td>
                                    : null
                                  }
                                  {lemburTotal.toString().length === 3 ?
                                    <td colSpan={3}>
                                      {lemburTotal.toString().slice(0,1)}:
                                      {lemburTotal.toString().slice(1,3)} Jam
                                    </td>
                                    : null
                                  }
                                  {lemburTotal.toString().length === 4 ?
                                    <td colSpan={3}>
                                      {lemburTotal.toString().slice(0,2)}:
                                      {lemburTotal.toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                            </tr> 
                            <tr>
                                <td colSpan={8}>Jam Kerja Aktual - lembur</td>
                                <td colSpan={3}>
                                {aktualLem.toString().length === 1?
                                  aktualLem.toString().slice(0,1)+' Menit' :
                                  null
                                }
                                {aktualLem.toString().length === 2?
                                  aktualLem.toString().slice(0,1)+':'+
                                  aktualLem.toString().slice(1,3) + ' Menit' :
                                  null
                                }
                                  {aktualLem.toString().length === 3?
                                  aktualLem.toString().slice(0,1)+':'+
                                  aktualLem.toString().slice(1,3) + ' Jam' :
                                  null
                                }

                                 {aktualLem.toString().length === 4?
                                  aktualLem.toString().slice(0,2)+':'+
                                  aktualLem.toString().slice(2,4) + ' Jam' :
                                  null
                                } 
                                 {aktualLem.toString().length === 5?
                                  aktualLem.toString().slice(0,3)+':'+
                                  aktualLem.toString().slice(3,5) + ' Jam' :
                                  null
                                } 
                                </td>
                            </tr> 
                            <tr>
                                <td colSpan={8}>(Kurang/Lebih) Jam Kerja</td>
                                {kurangLeb.toString().length === 0 ?
                                    <td colSpan={3}>
                                    </td>
                                    : null
                                  } 
                                  {kurangLeb.toString().length === 1 ?
                                    <td colSpan={3}>
                                      {kurangLeb.toString().slice(0,2)} Menit
                                   
                                    </td>
                                    : null
                                  }

                                {kurangLeb.toString().length === 2 ?
                                    <td colSpan={3}>
                                      {kurangLeb.toString().slice(0,2)} Menit
                                    </td>
                                    : null
                                  }
                                {kurangLeb.toString().length === 3 ?
                                    <td colSpan={3}>
                                      {kurangLeb.toString().slice(0,1)},
                                      {kurangLeb.toString().slice(1,3)} 
                                      {kurangLeb.toString().slice(0,1) === '-' ?
                                      " Menit"
                                      :
                                      " Jam"
                                      } 
                                    </td>
                                    : null
                                  }
                                  {kurangLeb.toString().length === 4 ?
                                    <td colSpan={3}>
                                      {kurangLeb.toString().slice(0,2)},{kurangLeb.toString().slice(2,4)} Jam
                                    </td>
                                    : null
                                  }
                                  {kurangLeb.toString().length === 5 ?
                                    <td colSpan={3}>
                                      {kurangLeb.toString().slice(0,3)},
                                      {kurangLeb.toString().slice(3,5)} Jam
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

export default AnalisaPresence