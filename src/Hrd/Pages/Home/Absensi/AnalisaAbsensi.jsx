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

function AnalisaAbsensi() {
  const tableRef = React.useRef("");
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

  const [hour_working, setHourWorking] = useState([])
  const [minutes_working, setMinutesWorking] = useState([])

  const [hour_lembur, setHourLembur] = useState([])
  const [minutes_lembur, setMinutesLembur] = useState([])

  console.log(asce(minutes_working))
  console.log(ascr(hour_working))


  function asce(a){
    if(a === null ){
      a = 0
      var str = a.toString()
    }else{
      // eslint-disable-next-line no-redeclare
      var str = a.toString()
    }
    // console.log(str)
    let leng = str.length
    if(leng === 1){
        var val = 1
    }else if(leng > 1){
        // eslint-disable-next-line no-redeclare
        var val = 2
    }
    const val2 = leng-val
    const slic = str.slice(val2, leng)
    const pars = parseInt(slic)
    return pars
}

function ascr(a){
  if(a === null ){
    a = 0
    var str = a.toString()
  }else{
    // eslint-disable-next-line no-redeclare
    var str = a.toString()
  }
  let leng = str.length
  if(leng === 1 || leng === 2){
      var val = 0
  }else if(leng > 2){
        // eslint-disable-next-line no-redeclare
      var val = leng - 2
  }
  const val2 = val
  var slic = str.slice(0, val2)
  if(slic === null){
      // eslint-disable-next-line no-redeclare, no-const-assign
      slic = 0
  }else{
      slic = str.slice(0, val2)
  }
  if(slic === ''){
    return 0
  }else{
    const pars = parseInt(slic)
    return pars
  }
}


function dividDed(x, y){
  const removedDecimal = Math.trunc(x); // 2
  console.log(removedDecimal)
  const dataX = parseInt(y)
  console.log(dataX)
  const dataY = removedDecimal+dataX
  console.log(dataY)
  const minDec = x-removedDecimal // 0.93
  console.log(minDec)
  var data = minDec*60 // 56
  var fixedNum = Math.round(data)
  if(fixedNum === 0){
    fixedNum = '00'
  }else{
    fixedNum = Math.round(data)
  }
  const varXY =  dataY+''+fixedNum
  console.log(varXY)
  return parseInt(varXY)
}

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/attendance/employee-analysis/?employee_name=${name_id}&months=${month_id}&years=${year_id}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setAttendance(res)
      setLoading(false) 

      // setWorkingHourTotal(res.map((ab) => {
      //   return (ab.working_hour)
      //   }))

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


      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [name_id, month_id, loading])

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

    function aktualLembur(x,y){
      const varD = x-y
      const varX = varD.toString()
      const len = varX.length
      const data1 =len-2
      const slics = varX.slice(data1, len)
      if(slics > 59){
        return varD-100+60
      }else if(len > 1){
        if(slics > 59){
          return varD-40
        }else{
          console.log("hi", slics)
          return varD
        }
      }else if(len === 2){
        return varD-40
      }else{
        return varD
      }
    }

    function leb(x,y){
      const varD = x-y
      const varX = varD.toString()
      const len = varX.length
      const data1 =len-2
      const slics = varX.slice(data1, len)
      if(slics > 59){
        return varD-100+60
      }else if(len > 1){
        if(slics > 59){
          return varD-40
        }else{
          console.log("hi", slics)
          return varD
        }
      }else if(len === 2){
        return varD-40
      }else{
        return varD
      }
  
    }


    // function sumTotaled(arr){
    //     let results = arr.reduce((a, b) => {
    //         return a+b;
    //     }, 0);
    //     const lent = results.toString().length 
    //     console.log(results)
    //     var ce = lent-2
    //     const sliced = results.toString().slice(ce, lent)
    //     const ac = results+70
    //     console.log(sliced)
    //     console.log(ce)
    //     console.log(lent)
    //     // if(sliced < 60 ){
    //     //   return results
    //     // }else{
    //     //   return results-100+60
    //     // }
    //     if(sliced > 59){
    //       return ac-100+60
    //     }else if(lent > 1){
    //       if(sliced > 59){
    //         return ac-40
    //       }else{
    //         const av = ac-40
    //         console.log(av)
    //         return av
    //       }
    //     }else if(lent === 2){
    //       return ac-40
    //     }else{
    //       return ac + 0
    //     }

    // }

    function sumTotal(arr){
       const results = arr.reduce((a, b) => {
          return a+b
        }, 0);
        return results
    }

    function sumHE(he){
      if(name_id.replace(/%20/g, " ") === 'Kunut C'){
        return he*900
      }else{
        return he*800
      }
    }

  
    const sumData = sumTotal(minutes_working)/60
    const sumDataLembur = sumTotal(minutes_lembur)/60
    
    const sumDataWork = sumTotal(hour_working)
    const sumHourLembur = sumTotal(hour_lembur)
    
    console.log(sumTotal(hour_working))
    console.log("func baru : ",dividDed(sumData, sumDataWork))
    console.log(sumTotal(minutes_working))
    // console.log(dividDe(sumData, sumDataWork))

    const lemburTotal = dividDed(sumDataLembur, sumHourLembur)
    const jamKerjaA = dividDed(sumData, sumDataWork)

    const jamKerjaS = sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur))

    const aktualLem = aktualLembur(jamKerjaA, lemburTotal)
    
    const kurangLeb = leb(aktualLem, jamKerjaS)

    console.log("aktual - lembur : ", aktualLem)
    console.log("kurang lebih : ", kurangLeb)
    console.log("aktual lem : ", aktualLembur(jamKerjaA, lemburTotal))
    console.log("lembur total : ", lemburTotal  )

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
                        <Table ref={tableRef} bordered hover>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Nama Karyawan</th>
                            <th>Tanggal Hari Kerja</th>
                            <th>Hari</th>
                            <th>Masuk</th>
                            <th>Pulang</th>
                            <th>Lembur Masuk</th>
                            <th>Lembur Pulang</th>
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
                                    <td>{att.employee_name}</td>
                                    <td>{att.working_date ? att.working_date : '-'}</td>
                                    <td>
                                      {att.days ? att.days : "-"}
                                    </td>
                                    <td>
                                      {/* Masuk */}
                                      {att.start_from !== null ? att.start_from.toString().length === 4 ?
                                        att.start_from.toString().slice(0,2) + ':' + att.start_from.toString().slice(2,4)
                                        : null : ''
                                      }
                                      {att.start_from !== null ? att.start_from.toString().length === 3 ?
                                        '0'+att.start_from.toString().slice(0,1) + ':' + att.start_from.toString().slice(1,3)
                                        : null : '-'
                                      }
                                       {att.start_from !== null ? att.start_from.toString().length === 2 ?
                                         '00:' + att.start_from.toString().slice(0,2)
                                        : null : '-'
                                      }
                                    </td>
                                    <td>
                                      {/* Pulang */}

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
                                      {/* Lembur Start */}

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
                                      {/* Lembur End */}

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
                                      {/* Keterangan */}
                                      {att.ket ? att.ket : null
                                      }
                                    </td>
                                   
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
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)) === 0 ?
                                  <td colSpan={3}></td> : null
                                }
                                {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 3 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,1)}: 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(1,3)} Jam
                                  </td>
                                  : null
                                }

                                {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 4 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,2)}: 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(2,4)} Jam
                                  </td>
                                  : null
                                }

                              {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().length === 5 ?
                                <td colSpan={3}>
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(0,3)}: 
                                  {sumHE(totalAtt(attendance.length, TotalAttendance.employee_lembur)).toString().slice(3,5)} Jam
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

export default AnalisaAbsensi