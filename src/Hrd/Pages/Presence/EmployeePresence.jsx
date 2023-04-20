import React, {useState} from 'react'
import SideBar from '../../Components/SideBar'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, Box, TextField, DialogActions, Button } from '@mui/material'
import { MobileDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { tahun, bulan } from '../../../Components/utilsFunction/arrayFunction'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EmployeePresence() {
  const navigate = useNavigate()
  const location = useLocation()

  const user_id = location.pathname.split('/')[3]
  const name_id = location.pathname.split('/')[2]

  const [year, setYear] = useState(new Date().getFullYear())

  const handleGend = (event) => {
    setYear(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const [start_date, setStartDate] = React.useState(new Date().toISOString().slice(0,10))
  const [end_date, setEndDate] = React.useState(new Date().toISOString().slice(0,10))

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const convDate = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setStartDate(dated.slice(1, 11))
  }

  const convDated = (newdate) => {
    let event = new Date(newdate);
    let dated = JSON.stringify(event);
    setEndDate(dated.slice(1, 11))
  }
  
  const PeriodeAbsensi = () => {
    navigate(`/absensi/periode/${name_id}/${user_id}/${start_date}/${end_date}`)
  }

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
                            <div className="col-md-3 m-2" key={index}>
                              <Link to={`/absensi/${name_id}/${user_id}/${bul.value}/${year}`} style={{ textDecoration:'none', color:'#0B305A' }}>
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
                <div className="card shadow-card mt-3" style={{ border:'none', borderRadius:'10px' }}>
                  <div className="card-body">
                    <h4>Rekap Karyawan Per Periode</h4>
                      <div className="col-md-3 m-2" onClick={handleClickOpen} style={{ cursor:'pointer' }}>
                        <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
                          <div className="card-body text-center">
                              <h5>Pilih Periode</h5>
                          </div>
                        </div>
                    </div>
                    <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClickOpen}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Pilih Periode Absensi"}</DialogTitle>
                    <DialogContent sx={{ width:520 }}>
                      <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ mt:2, display:'flex' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                label="Dari Tanggal"
                                value={new Date(start_date)}
                                onChange={(newValue) => {
                                    convDate(newValue);
                                }}
                                renderInput={(params) => <TextField sx={{ mr:2 }} fullWidth variant='outlined' {...params} />}
                                />
                                 <MobileDatePicker
                                label="Sampai Tanggal"
                                value={new Date(end_date)}
                                onChange={(newValue) => {
                                    convDated(newValue);
                                }}
                                renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={PeriodeAbsensi}>Pilih</Button>
                    </DialogActions>
                  </Dialog>
                  </div>
                </div>
            </main>
        </div>
    </div>
  )
}

export default EmployeePresence