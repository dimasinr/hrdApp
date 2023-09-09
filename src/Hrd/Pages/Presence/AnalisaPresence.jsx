import React,{useState, useEffect} from 'react'
import SideBar from '../../Components/SideBar'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowBackIos, GetApp, LockPerson, LockOpen } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN, ROLES } from '../../../fetch/fetch'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { CircularProgress, Tooltip } from '@mui/material'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { bulan } from '../../../Components/utilsFunction/arrayFunction'
import { sumTotal, sumHE, totalAtt, formulaSumActual, asce, ascr, dividDed, getWeekendDates, validateMonthToday, mergedDataPresence, countDataKeterangan, getEndDate, isLockedOrNot } from './utlis/utlis'
import { changeDayName, datesUpt, workHour, totalWorkHour, totalWorking } from '../../../Components/utilsFunction/functionUtils'
import Swal from 'sweetalert2'

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

  const [isLocked, setIsLocked] = useState(1)

  const getListPresence = () => {
    axios.get(`${BASE_URL}/api/presence/employee/analysis/?employee=${user_id}&months=${month_id}&years=${year_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setAttendance(res)
      setLoading(false) 
      setIsLocked(res[0]?.is_lock)

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
  useEffect(() => getListPresence(), [user_id, month_id, loading])

  console.log(`is lock ${isLocked}`)

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

  let isLock = isLockedOrNot(isLocked)
  console.log('isssssss ' + isLock)

  const lockedPresence = async e => {
    try{
        const formData = new FormData();
        formData.append("employee", user_id);
        formData.append("month", month_id);
        formData.append("locked", isLock)
       const res = await axios({
            method: 'post',
            url:`${BASE_URL}/api/presence/lock/`,
            data: formData,
            headers: {
                "Authorization" : `Token ${USER_TOKEN}`
              }
        })
        Swal.fire(
          'Berhasil!',
          `${res.data.message}`,
          'success'
        )
        getListPresence()
        console.log(res)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                  Swal.fire(
                    'Gagal!',
                    `${error.response.data.message}`,
                    'error'
                  )
            }
        }
      };
  
    const sumData = sumTotal(minutes_working)/60
    const sumDataLembur = sumTotal(minutes_lembur)/60
    
    const sumDataWork = sumTotal(hour_working)
    const sumHourLembur = sumTotal(hour_lembur)
    
    console.log(sumTotal(hour_working))
    console.log("func baru : ",dividDed(sumData, sumDataWork))
    console.log(sumTotal(minutes_working))

    const lemburTotal = dividDed(sumDataLembur, sumHourLembur)
    const jamKerjaA = dividDed(sumData, sumDataWork)
    
    const jamKerjaS = sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur), countDataKeterangan(attendance, 'tidak masuk') )
    
    const kurangLeb = formulaSumActual(jamKerjaA, jamKerjaS)
    console.log("jam kerja : ", jamKerjaS)

    console.log("sum data: ", sumData, "sum data work", sumDataWork )
    console.log('jam kerja:', jamKerjaA, "sum data round", Math.round((sumData-Math.round(sumData))*60))

    const { onDownload } = useDownloadExcel({
      currentTableRef: tableRef.current,
      filename: `Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
      sheet: `Analisa Absensi ${name_id && name_id.replace(/%20/g, " ")} Bulan ${bulan[month_a].month}`,
  })

  const startDate = new Date(`${year_id}-${month_id}-01`);
  const endDate = new Date(`${year_id}-${month_id}-${getEndDate(year_id, month_id)}`);
  const weekendDates = getWeekendDates(startDate, endDate);
  
  console.log(startDate, endDate, getEndDate(year_id, month_id))
  console.log(weekendDates)
  
  const actualDate = mergedDataPresence(attendance, weekendDates)
  
  function namesE(name){
    if(name.replace(/%20/g, " ") === 'Kunut Catur'){
      return 9
    }else{
      return 8
    }
  }
    
  return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
            <main className="container mt-3">
                <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                      <button className='btn' onClick={() => navigate(-1)}>
                          <span className="d-flex align-items-center mb-2">
                            <ArrowBackIos />
                            <h4 style={{ marginTop:'8px' }}>Analisa Absensi {name_id && name_id.replace(/%20/g, " ")} Bulan {bulan[month_a].month} </h4>
                          </span>
                        </button>
                      </div>
                      <div>
                          <Tooltip title={isLock === 0 ? 'Unlock Absensi' : 'Lock Absensi'}>
                            <button onClick={lockedPresence} className='btn'> {isLock === 0 ? <LockOpen /> :  <LockPerson /> } </button>
                          </Tooltip>

                          <Tooltip title='Export to excel'>
                            <button onClick={onDownload} className='btn'> <GetApp /> </button>
                          </Tooltip>
                      </div>
                    </div>
                      <div className="col-md-12">
                        {loading && loading ? 
                        <CircularProgress />
                        : 
                              <Table ref={tableRef} bordered hover responsive>
                              <thead>
                                  <tr>
                                  <th>No</th>
                                  <th>Nama</th>
                                  <th>Tanggal</th>
                                  <th>Hari</th>
                                  <th>Masuk</th>
                                  <th>Pulang</th>
                                  <th>LemburS</th>
                                  <th>LemburE</th>
                                  <th>Keterangan</th>
                                  <th>Total JK</th>
                                  <th>Total JL</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {actualDate.map((att, index) => {
                                      return(
                                          <tr key={index}>
                                          <th style={{ color: '#4932A7' }} sx={{ border: '1px solid #ddd' }}>
                                            {ROLES === 'hrd' ?
                                            <Link to={att.id ? `/employee/absensi/${att.id}` : `/absensi/${name_id}/${user_id}/${month_id}/${year_id}`} className='unlink'>
                                              {index + 1}
                                            </Link>:
                                            index+1
                                            }
                                          </th>
                                          <td>{att.employee && att.employee.name ? att.employee.name : "Nawastra Employee" }</td>
                                          <td>{att.working_date ? datesUpt(att.working_date) : ''}</td>
                                          <td>{att.days ? changeDayName(att.days) : ""}</td>
                                          <td>{att.start_from ? workHour(att.start_from) : ""}</td>
                                          <td>{att.end_from ? workHour(att.end_from) : ""}</td>
                                          <td>{att.lembur_start ? workHour(att.lembur_start) : ""}</td>
                                          <td>{att.lembur_end ? workHour(att.lembur_end) : ""}</td>
                                            <Tooltip title={att.ket} arrow>
                                          <td>
                                            {att.ket ? 
                                          att.ket.toString().length > 25 ?
                                          att.ket.toString().slice(0,25) + '...' : att.ket
                                          : null}
                                          </td>
                                          </Tooltip>
                                          <td>{att.working_hour === 0 || att.working_hour > 0 ? totalWorking(att.working_hour) : " "}</td>
                                          <td>{att.lembur_hour === 0 || att.lembur_hour > 0 ? totalWorkHour(att.lembur_hour) : " "}</td>
                                        </tr>   
                                      )
                                  })}
                                  <tr>
                                      <td colSpan={9}><h6>Total</h6></td>
                                      <td colSpan={1}>
                                        <h6>
                                          {dividDed(sumData, sumDataWork) === 0 || dividDed(sumData, sumDataWork) > 0 ? totalWorking(dividDed(sumData, sumDataWork)) : " "}
                                        </h6>
                                      </td>
                                      {/* Total Lembur */}
                                      <td colSpan={1}>
                                        <h6>
                                          {lemburTotal === 0 || lemburTotal > 0 ? totalWorkHour(lemburTotal) : null}
                                        </h6>
                                      </td>
                                  </tr> 
                                  <tr>
                                      <td colSpan={11}><h5>Analisa Absensi</h5></td>
                                  </tr>
                                 {validateMonthToday(year_id, month_id) === false ? 
                                     <React.Fragment>
                                     <tr>
                                         <td colSpan={8}>Hari Kerja Efektif</td>
                                         <td colSpan={3}>
                                           {countDataKeterangan(attendance, 'tidak masuk') === 0 ?
                                           totalAtt(attendance.length, TotalAttendance.employee_lembur) :
                                           totalAtt(attendance.length, TotalAttendance.employee_lembur)
                                         }
                                         Hari
                                         </td>
                                     </tr> 
                                     <tr>
                                         <td colSpan={8}>Tidak masuk/Sakit/Izin/Cuti</td>
                                         <td colSpan={3}>
                                           {countDataKeterangan(attendance, 'tidak masuk')}
                                           /
                                           {countDataKeterangan(attendance, 'sakit')}
                                           /
                                           {countDataKeterangan(attendance, 'izin')}
                                           /
                                           {countDataKeterangan(attendance, 'cuti')}
                                           </td>
                                     </tr> 
                                     <tr>
                                       <Tooltip title={`${namesE(name_id)} Jam kerja anda di kali dengan Hari kerja anda yang seharusnya dalam 1 bulan`} arrow>
                                         <td colSpan={8}>Jumlah Jam Kerja Efektif</td>
                                       </Tooltip>
                                         <td colSpan={3}>
                                         {totalWorkHour(
                                           sumHE(name_id, totalAtt(attendance.length, TotalAttendance.employee_lembur), countDataKeterangan(attendance, 'tidak masuk'))
                                         )}
                                         </td>
                                     </tr> 
                                     <tr>
                                         <td colSpan={8}>Jumlah Jam Kerja Aktual</td>
                                         <td colSpan={3}>
                                           {totalWorkHour(
                                           dividDed(sumData, sumDataWork) 
                                           )}
                                         </td>
                                     </tr> 
                                     <tr>
                                         <td colSpan={8}>Jumlah Jam Lembur</td>
                                         <td colSpan={3}>{totalWorkHour(lemburTotal)}</td>
                                     </tr> 
                                     <tr>
                                         <td colSpan={8}>(Kurang/Lebih) Jam Kerja</td>
                                         {kurangLeb.toString().length !== 0 ?
                                             <td colSpan={3}>
                                               {totalWorkHour(kurangLeb)} 
                                             </td>
                                             : null
                                           } 
                                     </tr> 
                                     </React.Fragment>
                                     : <React.Fragment>
                                      <tr><td colSpan={8}>Tidak ada Analisa</td></tr>
                                     </React.Fragment>
                                  }
                                  
                              </tbody>
                              </Table>
                        }
                      </div>

                  </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default AnalisaPresence