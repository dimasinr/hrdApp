import React from 'react'
import SideBar from '../../../Components/SideBar'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function DetailAbsensi() {
  const navigate = useNavigate()
  const location = useLocation()

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

  const [year, setYear] = React.useState(new Date().getFullYear())

  const handleGend = (event) => {
    setYear(event.target.value);
  };

  const tahun = [
    {'id': 1,
    'year' : 2022
  },
    {
      'id':2,
      'year' : 2023},
      {
        'id':3,
        'year' : 2024},
        {
          'id':4,
          'year' : 2025}
  ]
  

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
                          <h4>Rekap Karyawan {name_id && name_id.replace(/%20/g, " ")} {year && year}</h4>
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
                            <div className="col-md-3 m-2">
                                  <Link to={`/employee/absensi/${name_id}/${bul.value}/${year}`} style={{ textDecoration:'none', color:'#0B305A' }}>
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

export default DetailAbsensi