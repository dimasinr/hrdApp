import React, {useState} from 'react'
import SideBar from '../../Hrd/Components/SideBar'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { bulan, tahun } from '../../Components/utilsFunction/arrayFunction'
import { NAMES } from '../../fetch/fetch'

function SelfEmployeePresence() {
  const navigate = useNavigate()
  const [year, setYear] = useState(new Date().getFullYear())

  const handleGend = (event) => {
    setYear(event.target.value);
  };
  
  return (
    <div className='d-flex'>
        <SideBar />
        <div id="image__background" style={{ marginTop:'65px' }}>
            <main className="container mt-2">
                <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                      <button className='btn' onClick={() => navigate(-1)}>
                          <span className="d-flex align-items-center">
                            <ArrowBackIos /> <h5 style={{ marginTop:'8px' }}>Back</h5>
                          </span>
                        </button>
                        <div className="d-flex justify-content-between align-items-center">
                          <h4>Analisa Absensi {NAMES} {year && year}</h4>
                          <FormControl sx={{ mt: 1, mr:1, minWidth: 220 }}>
                              <InputLabel id="tahun-label">Tahun Absensi</InputLabel>
                              <Select
                              // variant='standard'
                              labelId="Tahun"
                              id="Tahun"
                              value={year}
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
                      <div className="d-flex flex-wrap">
                        {bulan.map((bul, index) => {
                          return(
                            <div className="col-md-3 m-2" key={index}>
                              <Link to={`/employee/presence/${bul.value}/${year}`} style={{ textDecoration:'none', color:'#0B305A' }}>
                                  <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }} key={index}>
                                    <div className="card-body text-center">
                                        <h5>{bul.month}</h5>
                                    </div>
                                  </div>
                              </Link>
                            </div>
                          )
                        })}
                      </div>
                  </div>
                </div>
   
            </main>
        </div>
    </div>
  )
}

export default SelfEmployeePresence