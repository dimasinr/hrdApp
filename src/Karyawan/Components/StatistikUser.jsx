import React from 'react'
import { Col, Container } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, NAMES } from '../../fetch/fetch'
import { FormControl, MenuItem, Select} from '@mui/material';
import { tahun } from '../../Components/utilsFunction/arrayFunction'
import { ColumnChartKeterangan, ColumnChartPresence } from '../../Components/Chart/ChartColumn'

export default function StatistikUser() {

  const [presenceSubmission, setPresenceSubmission] = React.useState([])
  const [years, setYears] = React.useState(new Date().getFullYear())
  const [statistikPresence, setStatistikPresence] = React.useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/dashboard/statistik-submission/${years}/`,{
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
  React.useEffect(() => getListPengajuan(), [years])
  
  const getPermission = () => {
    axios.get(`${BASE_URL}/api/dashboard/statistik-presence/${years}/`,{
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
  React.useEffect(() => getPermission(), [years])

  const handleGend = (event) => {
    setYears(event.target.value);
  };

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
                        <h6>Statistik Absensi {years}</h6>
                          <ColumnChartPresence data={statistikPresence} />
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
                      <ColumnChartKeterangan data={presenceSubmission} />
                    </div>
                  </div>
                </Col>
              </>
            </Container>

          </div>
    </div>
  )
}
