import React from 'react'
import { Col, Container } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, NAMES } from '../../fetch/fetch'
import { UserChartComponents, UserChartPieComponents } from './Charts/UserChartsComponents'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import {Slide, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select} from '@mui/material';
import { DataUsage } from '@mui/icons-material'
import { tahun } from '../../Components/utilsFunction/arrayFunction'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function StatistikUser() {

  var date = new Date()
  var dateAwal = new Date('2023-01-01')
  const [open, setOpen] = React.useState(false)
  const [permission, setPermission] = React.useState([])
  const [years, setYears] = React.useState(new Date().getFullYear())
  const [start_date, setStartDate] = React.useState(dateAwal.toISOString().slice(0,10))
  const [end_date, setEndDate] = React.useState(date.toISOString().slice(0,10))
  const [chartStatEmployee, setChartStatEmployee] = React.useState([])

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/dashboard/preview/${years}/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setChartStatEmployee(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getListPengajuan(), [years])
  
  const getPermission = () => {
    axios.get(`${BASE_URL}/api/dashboard/employee-permission/?start_date=${start_date}&end_date=${end_date}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setPermission(res)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getPermission(), [start_date, end_date])

  
  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleGend = (event) => {
    setYears(event.target.value);
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

  return (
    <div className="card shadow-card mt-3" style={{ border:'none', borderRadius:'10px' }}>
          <div className="card-body">
            <h4 className='mb-3'>Statistik {NAMES} Tahun {years}</h4>
            <Container>
              <Col md={12} className='d-flex flex-wrap align-items-center'> 
                <Col md={7} style={{ marginRight:'2vh' }}>
                  <div className="card shadow-card" style={{ borderRadius:'10px'}}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>Statistik Absensi {years}</h6>
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
                          <UserChartComponents chartData={chartStatEmployee} />
                    </div>
                  </div>
                </Col>
                <Col md={4} sm={4} className='mt-2'>
                  <div className="card shadow-card" style={{ borderRadius:'10px' }}>
                    <div className="card-body">
                      <span onClick={handleClickOpen} style={{ cursor:'pointer' }}>
                        <h6>Statistik Pengajuan {start_date} - {end_date}</h6>
                      </span>
                      <span>
                        <div className="d-flex flex-wrap justify-content-between">
                          {permission.map((permiss, index) => {
                            return(
                              <React.Fragment key={index}>
                                <div className="d-flex">
                                  <DataUsage style={{ color:COLORS[index] }} /> &nbsp; {permiss.name} : {permiss.value}
                                </div>
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </span>
                      <UserChartPieComponents chartData={permission} label={renderCustomizedLabel} color={COLORS} />
                    </div>
                  </div>
                </Col>
              </Col>
            </Container>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClickOpen}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Set Tanggal Statistik Pengajuan"}</DialogTitle>
              <DialogContent sx={{ width:520 }}>
                <DialogContentText id="alert-dialog-slide-description">
                  <Box sx={{ mt:2, display:'flex' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Dari"
                          value={new Date(start_date)}
                          onChange={(newValue) => {
                            convDate(newValue);
                          }}
                          renderInput={(params) => <TextField sx={{ mr:2 }} fullWidth variant='outlined' {...params} />}
                          />
                          <DesktopDatePicker
                          label="Sampai"
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
              </DialogActions>
            </Dialog>
            
          </div>
    </div>
  )
}
