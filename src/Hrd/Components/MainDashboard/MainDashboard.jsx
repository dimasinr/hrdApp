import React,{useState, useEffect} from 'react'
import {FormControl, Select, MenuItem} from '@mui/material'
import { tahun } from '../../../Components/utilsFunction/arrayFunction'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import {CircularProgress} from '@mui/material'
import { ColumnChartKeterangan, ColumnChartPresence } from '../../../Components/Chart/ChartColumn'

export default function MainDashboard() {
    const [statistik_presence, setStatistikPresence] = useState([])
    const [presence_submission, setPresenceSubmission] = useState([])

    const [year, setYear] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(true)

    const getStatistikEmployee = () => {
        axios.get(`${BASE_URL}/api/dashboard/statistik-presence/${year}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setStatistikPresence(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getStatistikEmployee(), [year])
    
    console.log(statistik_presence)

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

  return (
    <div className="card shadow-card" style={{ border:'none', borderRadius:'12px' }}>
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
          <center>
            <CircularProgress />
          </center>
        : 
        <React.Fragment> 
          <ColumnChartKeterangan data={presence_submission} />
          <hr />
          <ColumnChartPresence data={statistik_presence} />
        </React.Fragment> 
        }
        </div>
    </div>
  )
}
