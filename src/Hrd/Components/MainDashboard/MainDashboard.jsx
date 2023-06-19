import React,{useState, useEffect} from 'react'
import {FormControl, Select, MenuItem} from '@mui/material'
import { bulan, tahun } from '../../../Components/utilsFunction/arrayFunction'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import {CircularProgress} from '@mui/material'
import { ColumnChartKeterangan, ChartsColumnAbsensiPerkaryawan, ColumnChartPresence } from '../../../Components/Chart/ChartColumn'

export default function MainDashboard() {
    const [presence_employee, setStatistikEmployee] = useState([])
    const [presence_submission, setPresenceSubmission] = useState([])
    const [presence_statistik, setPresenceStatistik] = useState([])

    const [month, setMonth] = useState(new Date().getMonth()+1)
    const [year, setYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(true)

    const getStatistikEmployeePermonth = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-statistik/${month}/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setStatistikEmployee(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikEmployeePermonth(), [month, year])
    
    const getStatistikPresence = () => {
        axios.get(`${BASE_URL}/api/dashboard/statistik-submission/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setPresenceSubmission(res)
          setLoading(false)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikPresence(), [year])

      const getStatistikPresenceEmployee = () => {
        axios.get(`${BASE_URL}/api/dashboard/statistik-presence/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setPresenceStatistik(res)
          setLoading(false)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikPresenceEmployee(), [year])

  return (
    <div className="card shadow-card" style={{ border:'none', borderRadius:'12px' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
          <h5>Statistik Absensi Karyawan </h5>
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
          <center>
            <CircularProgress />
          </center>
        : 
        <React.Fragment> 
          <ColumnChartKeterangan data={presence_submission} />
          <ColumnChartPresence data={presence_statistik} />
          <hr />
          <div className="d-flex justify-content-end">
            <FormControl sx={{ mt: 1, mr:1, minWidth: 90 }}>
                <Select
                variant='standard'
                labelId="Bulan"
                id="Bulan"
                value={month}
                onChange={(e) => {
                setMonth(e.target.value)
                }}
                label="Bulan"
                >
                    {bulan && bulan.map((div, index) => {
                        return(
                            <MenuItem value={div.value} key={index}>{div.month}</MenuItem>
                        )
                    })}
                
                </Select>
            </FormControl>
          </div>
          <ChartsColumnAbsensiPerkaryawan data={presence_employee} />
        </React.Fragment> 
        }
        </div>
    </div>
  )
}
