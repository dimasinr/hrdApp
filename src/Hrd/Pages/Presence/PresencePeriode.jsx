import React,{useState, useEffect} from 'react'
import SideBar from '../../Components/SideBar'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowBackIos, GetApp } from '@mui/icons-material'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { CircularProgress, Tooltip } from '@mui/material'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { datesUpt, workHour, totalWorkHour, totalWorking, changeDayName } from '../../../Components/utilsFunction/functionUtils'

function PresencePeriode() {
  const navigate = useNavigate();
  const location = useLocation();
  const tableRef = React.useRef([]);
  
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
    axios.get(`${BASE_URL}/api/presence/employee/compare?work_date=${start_date}&end_work_date=${end_date}&employee=${name_id}`,{
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
  useEffect(() => getListPengajuan(), [name_id, start_date, end_date, loading])

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Absensi ${name_id && name_id.replace(/%20/g, " ")} Periode ${start_date && start_date} sampai ${end_date && end_date} `,
    sheet: `Absensi ${name_id && name_id.replace(/%20/g, " ")} Periode ${start_date && start_date} sampai ${end_date && end_date} `,
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
                            <h4 style={{ marginTop:'8px' }}>Absensi {name_id && name_id.replace(/%20/g, " ")} Periode {start_date && start_date} sampai {end_date && end_date} </h4>
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
                        <Table ref={tableRef} bordered hover>
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Nama Karyawan</th>
                            <th>Tanggal</th>
                            <th>Hari</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>LemburS</th>
                            <th>LemburE</th>
                            <th>Total Jam Kerja</th>
                            <th>Total Jam Lembur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((att, index) => {
                                return(
                                    <tr key={index}>
                                    <td>{att.id}</td>
                                    <td>{att.employee && att.employee.name}</td>
                                    <td>{att.working_date ? datesUpt(att.working_date) : '-'}</td>
                                    <td>{att.days ? changeDayName(att.days) : '-'}</td>
                                    <td>{att.start_from ? workHour(att.start_from) : "-"}</td>
                                    <td>{att.end_from ? workHour(att.end_from) : "-"}</td>
                                    <td>{att.working_hour === 0 || att.working_hour > 0 ? totalWorking(att.working_hour) : "-"}</td>
                                    <td>{att.lembur_start ? workHour(att.lembur_start) : "-"}</td>
                                    <td>{att.lembur_end ? workHour(att.lembur_end) : "-"}</td>
                                    <td>{att.lembur_hour === 0 || att.lembur_hour > 0 ? totalWorkHour(att.lembur_hour) : "-"}</td>
                                  </tr>   
                                )
                            })}
             
                            
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

export default PresencePeriode