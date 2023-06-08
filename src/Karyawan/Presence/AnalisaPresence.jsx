import React,{useState, useEffect} from 'react'
import SideBar from '../../Hrd/Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos, GetApp } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN } from '../../fetch/fetch'
import axios from 'axios'
// import Table from 'react-bootstrap/Table';
import { CircularProgress, Tooltip, Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Paper  } from '@mui/material'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { bulan } from '../../Components/utilsFunction/arrayFunction'
import { sumTotal, sumHE, totalAtt, aktualLembur, actualHours, asce, ascr, dividDed } from './utlis/utlis'
import { NAMES, USER_ID } from '../../fetch/fetch'
import { changeDayName, datesUpt, workHour, totalWorkHour } from '../../Components/utilsFunction/functionUtils'
import { getWeekendDates, mergedDataPresence } from '../../Hrd/Pages/Presence/utlis/utlis'

function SelfEmployeeAnalisisPresence() {
  const tableRef = React.useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  const month_id = location.pathname.split('/')[3]
  const year_id = location.pathname.split('/')[4]
  const month_a = month_id-1

  console.log(month_id, year_id)

  const [loading, setLoading] = useState(true)
  const [attendance, setAttendance] = useState([])
  const [TotalAttendance, setTotalAttendance] = useState([])

  const [hour_working, setHourWorking] = useState([])
  const [minutes_working, setMinutesWorking] = useState([])

  const [hour_lembur, setHourLembur] = useState([])
  const [minutes_lembur, setMinutesLembur] = useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/presence/employee/analysis/?months=${month_id}&years=${year_id}`,{
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
  useEffect(() => getListPengajuan(), [USER_ID, month_id, loading])

  const getTotalDay = () => {
    axios.get(`${BASE_URL}/api/presence/total-day/?employee=${USER_ID}&months=${month_id}`,{
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
  useEffect(() => getTotalDay(), [USER_ID, month_id])
  
    const sumData = sumTotal(minutes_working)/60
    const sumDataLembur = sumTotal(minutes_lembur)/60
    
    const sumDataWork = sumTotal(hour_working)
    const sumHourLembur = sumTotal(hour_lembur)
    
    console.log(sumTotal(hour_working))
    console.log("func baru : ",dividDed(sumData, sumDataWork))
    console.log(sumTotal(minutes_working))

    const lemburTotal = dividDed(sumDataLembur, sumHourLembur)
    const jamKerjaA = dividDed(sumData, sumDataWork)

    const jamKerjaS = sumHE(NAMES, totalAtt(attendance.length, TotalAttendance.employee_lembur))

    const aktualLem = aktualLembur(jamKerjaA, lemburTotal)
    
    const kurangLeb = actualHours(aktualLem, jamKerjaS)

    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: `Analisa Absensi ${NAMES && NAMES.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
      sheet: `Analisa Absensi ${NAMES && NAMES.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
  })

  const lastWorkingDate = attendance[attendance.length - 1]?.working_date;
  const startDate = new Date(`2023-${month_id}-01`);
  const endDate = new Date(lastWorkingDate);
  const weekendDates = getWeekendDates(startDate, endDate);

    
  const actualDate = mergedDataPresence(attendance, weekendDates)

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
                            <h4 style={{ marginTop:'8px' }}>Analisa Absensi {NAMES && NAMES.replace(/%20/g, " ")} Bulan {bulan[month_a].month} </h4>
                          </span>
                        </button>
                          <Tooltip title='Export to excel'>
                            <button onClick={onDownload} className='btn'> <GetApp /> </button>
                          </Tooltip>

                    </div>
                      <div className="col-md-12">
                        {loading && loading ? 
                        <CircularProgress />
                        : 
                        <TableContainer component={Paper}>
                          <Table ref={tableRef}>
                            <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Nama</TableCell>
                                <TableCell align="center">Tanggal</TableCell>
                                <TableCell align="center">Hari</TableCell>
                                <TableCell align="center">Masuk</TableCell>
                                <TableCell align="center">Pulang</TableCell>
                                <TableCell align="center">LemburS</TableCell>
                                <TableCell align="center">LemburE</TableCell>
                                <TableCell align="center">Keterangan</TableCell>
                                <TableCell align="center">Total Jam</TableCell>
                                <TableCell align="center">Total Lembur</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {actualDate.map((att, index) => {
                                  return(
                                        <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{att.employee && att.employee.name ? att.employee.name : "Nawastra Employee" }</TableCell>
                                        <TableCell align="center">{att.working_date ? datesUpt(att.working_date) : '-'}</TableCell>
                                        <TableCell>{att.days ? changeDayName(att.days) : "-"}</TableCell>
                                        <TableCell align="center">{att.start_from ? workHour(att.start_from) : "-"}</TableCell>
                                        <TableCell align="center">{att.end_from ? workHour(att.end_from) : "-"}</TableCell>
                                        <TableCell align="center">{att.lembur_start ? workHour(att.lembur_start) : "-"}</TableCell>
                                        <TableCell align="center">{att.lembur_end ? workHour(att.lembur_end) : "-"}</TableCell>
                                        <Tooltip title={att.ket} arrow>
                                          <td>
                                            {att.ket ? 
                                          att.ket.toString().length > 5 ?
                                          att.ket.toString().slice(0,5) + '...' : att.ket
                                          : null}
                                          </td>
                                          </Tooltip>
                                        <TableCell align="center">{att.working_hour ? workHour(att.working_hour) : '-'}</TableCell>
                                        <TableCell align="center">{att.lembur_hour ? workHour(att.lembur_hour) : '-'} </TableCell>
                                      </TableRow>   
                                    )
                                })}
                                <TableRow>
                                    <TableCell colSpan={9}><h6>Total</h6></TableCell>
                                    
                                    <TableCell align="center" colSpan={1}>
                                      <h6>
                                        {dividDed(sumData, sumDataWork).toString().length !== 0 ?
                                            totalWorkHour(dividDed(sumData, sumDataWork))
                                          : ''
                                        }
                                      </h6>
                                    </TableCell>
                                    <TableCell align='center' colSpan={1}>
                                      <h6>
                                        {lemburTotal.toString().length === 2 ?
                                            totalWorkHour(lemburTotal)
                                            : ''
                                        }

                                      </h6>
                                    </TableCell>
                                                                    
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={11}><h5>Analisa Absensi</h5></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={8}>Hari Kerja Efektif</TableCell>
                                    <TableCell colSpan={3}>{totalAtt(attendance.length, TotalAttendance.employee_lembur)} Hari</TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={8}>Jumlah Jam Kerja Efektif</TableCell>
                                      <TableCell colSpan={3}>
                                      {sumHE(NAMES, totalAtt(attendance.length, TotalAttendance.employee_lembur)) !== 0 ?
                                        totalWorkHour(sumHE(NAMES, totalAtt(attendance.length, TotalAttendance.employee_lembur)))
                                        : ''
                                      }
                                      </TableCell> 
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={8}>Jumlah Jam Kerja Aktual</TableCell>
                                    <TableCell colSpan={3}>
                                      {dividDed(sumData, sumDataWork).toString().length !== 0 ?
                                          totalWorkHour(dividDed(sumData, sumDataWork))
                                          : ''
                                        }
                                        </TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={8}>Jumlah Jam Lembur</TableCell>
                                    <TableCell colSpan={3}>
                                      {lemburTotal.toString().length !== 0 ?
                                          totalWorkHour(lemburTotal)
                                          : ''
                                        }
                                    </TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={8}>Jam Kerja Aktual - lembur</TableCell>
                                    <TableCell colSpan={3}>
                                    {aktualLem.toString().length !== 1?
                                      totalWorkHour(aktualLem) :
                                      ''
                                    }
                                    </TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell colSpan={8}>(Kurang/Lebih) Jam Kerja</TableCell>
                                    {kurangLeb.toString().length === 0 ?
                                        <TableCell colSpan={3}>
                                        </TableCell>
                                        : null
                                      } 
                                      {kurangLeb.toString().length === 1 ?
                                        <TableCell colSpan={3}>
                                          {kurangLeb.toString().slice(0,2)} Menit
                                      
                                        </TableCell>
                                        : null
                                      }

                                    {kurangLeb.toString().length === 2 ?
                                        <TableCell colSpan={3}>
                                          {kurangLeb.toString().slice(0,2)} Menit
                                        </TableCell>
                                        : null
                                      }
                                    {kurangLeb.toString().length === 3 ?
                                        <TableCell colSpan={3}>
                                          {kurangLeb.toString().slice(0,1)},
                                          {kurangLeb.toString().slice(1,3)} 
                                          {kurangLeb.toString().slice(0,1) === '-' ?
                                          " Menit"
                                          :
                                          " Jam"
                                          } 
                                        </TableCell>
                                        : null
                                      }
                                      {kurangLeb.toString().length === 4 ?
                                        <TableCell colSpan={3}>
                                          {kurangLeb.toString().slice(0,2)},{kurangLeb.toString().slice(2,4)} Jam
                                        </TableCell>
                                        : null
                                      }
                                      {kurangLeb.toString().length === 5 ?
                                        <TableCell colSpan={3}>
                                          {kurangLeb.toString().slice(0,3)},
                                          {kurangLeb.toString().slice(3,5)} Jam
                                        </TableCell>
                                        : null
                                      }
                                </TableRow> 
                                
                            </TableBody>
                          </Table>
                        </TableContainer>
                        }
                      </div>

                    </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default SelfEmployeeAnalisisPresence