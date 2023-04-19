import {useState, useEffect} from 'react'
import { HREmployeeChartComponents, UserChartComponents } from '../../../Karyawan/Components/Charts/UserChartsComponents'
import {FormControl, Select, MenuItem} from '@mui/material'
import { tahun, Months } from '../../../Components/utilsFunction/arrayFunction'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import {Box, CircularProgress} from '@mui/material'

export default function MainDashboard() {
    const [presence_statistik, setPresenceStatistik] = useState([])
    const [presence_stat, setPresenceStat] = useState([])

    const today = new Date()
    const monthName = today.toLocaleString('default', { month: 'long' }).split(' ')[0];
    const [month, setMonth] = useState(monthName)
    const [year, setYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(true)

    const getStatistikEmployee = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-statistik/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setPresenceStatistik(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikEmployee(), [year, month])
    
    const getStatistikPresence = () => {
        axios.get(`${BASE_URL}/api/dashboard/presence-statistik/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setPresenceStat(res.chart)
          setLoading(false)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikPresence(), [year])

  return (
    <div className="card shadow-card">
    <div className="card-body">
     <div className="d-flex justify-content-between align-items-center">
     <h5>Statistik Seluruh Absensi Karyawan </h5>
      <FormControl sx={{ mt: 1, mr:1, minWidth: 90 }}>
                <Select
                variant='standard'
                labelId="Tahun"
                id="Tahun"
                value={year}
                onChange={(e) => {
                setYear(e.target.value)
                }}
                label="Tahun"
                >
                    {tahun && tahun.map((div, index) => {
                        return(
                            <MenuItem value={div.year} key={index}>{div.year}</MenuItem>
                        )
                    })}
                
                </Select>
            </FormControl>
     </div>
      <hr />
      {loading && loading ?
        <CircularProgress />
    :  
      <UserChartComponents chartData={presence_stat} />
    }
      <hr />
      <div className="d-flex justify-content-between align-items-center">
      <h5>Statistik Per Karyawan di bulan {month}</h5>
      <Box>
        <FormControl sx={{ mt: 1, mr:1, minWidth: 90 }}>
                <Select
                variant='standard'
                labelId="Tahun"
                id="Tahun"
                value={month}
                onChange={(e) => {
                setMonth(e.target.value)
                }}
                label="Tahun"
                >
                    {Months && Months.map((val, index) => {
                        return(
                            <MenuItem value={val.month} key={index}>{val.month}</MenuItem>
                        )
                    })}
                
                </Select>
            </FormControl>
      </Box>
      </div>
      
      <hr />
      <HREmployeeChartComponents chartData={presence_statistik[month]} />
      <hr />
    </div>
  </div>
  )
}
