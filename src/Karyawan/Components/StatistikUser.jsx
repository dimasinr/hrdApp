import React from 'react'
import { Col, Container } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, NAMES } from '../../fetch/fetch'
import { FormControl, MenuItem, Select, CircularProgress} from '@mui/material';
import { tahun } from '../../Components/utilsFunction/arrayFunction'
import { ColumnChartKeterangan, ColumnChartPresence } from '../../Components/Chart/ChartColumn'

export default function StatistikUser() {

  const [presenceSubmission, setPresenceSubmission] = React.useState([])
  const [years, setYears] = React.useState(new Date().getFullYear())
  const [statistikPresence, setStatistikPresence] = React.useState([])

  const getStatistikPengajuan = () => {
    axios.get(`${BASE_URL}/api/dashboard/statistik-presence/${years}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setStatistikPresence(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getStatistikPengajuan(), [years])
  
  const getStatistikPresence = () => {
    axios.get(`${BASE_URL}/api/dashboard/statistik-submission/${years}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setPresenceSubmission(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getStatistikPresence(), [years])

  const handleGend = (event) => {
    setYears(event.target.value);
  };

  const data = [
    { Jan: 20 },
    { Feb: 18 },
    { Mar: 19 },
    { Apr: 12 },
    { May: 20 },
    { Jun: 0 },
    { Jul: 0 },
    { Aug: 0 },
    { Sep: 0 },
    { Oct: 0 },
    { Nov: 0 },
    { Dec: 0 },
  ];

  console.log(data)

  return (
    <div className="card shadow-card mt-3" style={{ border:'none', borderRadius:'10px' }}>
          <div className="card-body">
            <div className="d-flex flex-wrap justify-content-between">
              <h4 className='mb-3'>Statistik {NAMES}</h4>
              <FormControl sx={{ mt: 1, mr:1, minWidth: 90 }}>
                  <Select
                  variant='standard'
                  labelId="Tahun"
                  id="Tahun"
                  value={years}
                  onChange={handleGend}
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
            <br />
            <Container>
              <>
                <Col md={11} sm={5}>
                  <div className="card shadow-card" style={{ borderRadius:'10px', border:'none'}}>
                    <div className="card-body">
                    {data && data.map((c, index) => {
                        return(
                          <span>
                            {index+1}
                          </span>
                        )
                      })}
                        <h6>Statistik Absensi {years}</h6>
                        {
                          statistikPresence && statistikPresence ? 
                          <ColumnChartPresence data={statistikPresence} />
                          :
                          <center>
                            <CircularProgress />
                          </center>
                        }
                    </div>
                  </div>
                </Col>
              </>
                <br />
              <>
                <Col md={11} sm={5} className='mt-2'>
                  <div className="card shadow-card" style={{ borderRadius:'10px', border:'none' }}>
                    <div className="card-body">
                      
                      <h6>Statistik Izin {years}</h6>
                      {presenceSubmission && presenceSubmission ?
                        <ColumnChartKeterangan data={presenceSubmission && presenceSubmission} />
                        :
                        <center>
                          <CircularProgress />
                        </center>
                      }
                    </div>
                  </div>
                </Col>
              </>
            </Container>

          </div>
    </div>
  )
}
