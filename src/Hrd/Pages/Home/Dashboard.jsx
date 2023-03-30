import React,{useState, useEffect} from 'react'
import SideBar from '../../Components/SideBar'
import { Calendar, DateObject } from "react-multi-date-picker"
import axios from 'axios'
import { USER_TOKEN, BASE_URL } from '../../../fetch/fetch'
import multiColors from "react-multi-date-picker/plugins/colors"
import { Add } from '@mui/icons-material'
import { datesUpt } from '../../../Components/utilsFunction/functionUtils'

import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()
    const casc = new Date().toISOString().slice(0,4)
    const [topDash , setTopDash] = useState([])
    const [offDay , setOffDay] = useState([])
    const [top_emp, setTopEmp ] = useState([])
    const [low_emp, setLowEmp ] = useState([])
    // const [weekOffs, setWeekOffs] = useState([])
    const [weekdays, setWeekdays] = useState([])

      const getDates = () => {
        axios.get(`${BASE_URL}/users/employee-total/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setTopDash(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getDates(), [])

      const getOffDay = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-dashboard/?limit=15`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data.results
          setOffDay(res)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getOffDay(), [])

    const getTopFive = () => {
        axios.get(`${BASE_URL}/api/employee/best_of/?start_date=2023-01-01&end_date=2024-01-01`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setTopEmp(res.top_five)
          setLowEmp(res.low_five)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getTopFive(), [])


      const getWeekOf = () => {
        axios.get(`${BASE_URL}/api/dashboard/week-of`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
        //   setWeekOffs(res)
          setWeekdays(res.weekday)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getWeekOf(), [])

      var dates = new Date().toISOString().slice(0,4)
      var startDate = new Date(`01/01/${dates}`);
      var endDate = new Date(`12/31/${dates}`);
      var numOfDates = getBusinessDatesCount(startDate,endDate);
      
      function getBusinessDatesCount(startDate, endDate) {
          let count = 0;
          const curDate = new Date(startDate.getTime());
          while (curDate <= endDate) {
              const dayOfWeek = curDate.getDay();
              if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
              curDate.setDate(curDate.getDate() + 1);
          }
          return count;
      }

      const dayPerc = numOfDates*800

      function percentage(x, y){
        return (x/y*100)
      }
    
    //   function percentageSyst(x, y){
    //     return (x/dayPerc*100)
    //   }

    const dateOff = off => {
        return new DateObject().setDay(off.days).setMonth(off.months).setYear(off.years)
    }
      
     const offDayColor = {
        red: offDay.map(dateOff),
      }

      Object.keys(offDayColor).forEach(color => {
        offDayColor[color].forEach((date, index) => {
            offDayColor[color][index].color = color
        })
      })

      const initialProps = {
        value: [
          ...offDayColor.red,
        ], 
        multiple: true
      }

      function sumMin(x,y){
        return x-y
      }

      
      

  return (
    <div id='image__background' className='d-flex'>
        <SideBar />
        <main className="container" style={{ marginTop:'75px' }}>

        {/* Top Main */}
            <div className="col-md-12 d-flex mb-2">
                <div className="col-md-9">
                    <div className="d-flex flex-wrap">
                        <div className="col-md-3 mb-2">
                            <div className="card shadow-card" style={{ border:'none', marginRight:'10px', marginLeft:'10px' }}>
                                <div className='card-title text-center' style={{ backgroundColor: '#0B305A', color:'white' }}>Total Working Days</div>
                                <div className="card-body text-center">
                                    <span><h4>{sumMin(numOfDates, weekdays && weekdays.length)} Days</h4></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className="card shadow-card" style={{ border:'none' }}>
                                <div className='card-title text-center' style={{ backgroundColor: '#0B305A', color:'white' }}>Attendance Percentage</div>
                                <div className="card-body text-center">
                                    <span><h4>{percentage(topDash.total_work_hour_all && topDash.total_work_hour_all.working_hour__sum, dayPerc ).toString().slice(0,6)}%</h4></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className="card shadow-card" style={{ border:'none', marginLeft:'10px' }}>
                                <div className='card-title text-center' style={{ backgroundColor: '#0B305A', color:'white' }}>Total Active Employee</div>
                                <div className="card-body text-center">
                                    <span><h4>{topDash.employee && topDash.employee.active_employee} Employee</h4></span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-2">
                            <div className="card shadow-card" style={{ border:'none', marginLeft:'10px' }}>
                                <div className='card-title text-center' style={{ backgroundColor: '#0B305A', color:'white' }}>Total Resign Employee</div>
                                <div className="card-body text-center">
                                    <span><h4>{topDash.employee && topDash.employee.inactive_employee} Employee</h4></span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="col-md-3" style={{ marginLeft:'10px' }}>
                    <div className="card shadow-card" style={{ border:'none', marginRight:'10px' }}>
                        <div className='card-title text-center' style={{ backgroundColor: '#0B305A', color:'white' }}>Year</div>
                        <div className="card-body text-center">
                            <span><h4>{casc && casc}</h4></span>
                        </div>
                    </div>
                </div>
            </div>

        {/* Content Main */}

        <div className="col-md-12" style={{ marginLeft:'10px' }}>
            <div className="d-flex flex-wrap">
                <div className="col-md-8" style={{ marginRight:'55px' }}>
                <Calendar
                fullYear
                {...initialProps}
                plugins={[
                    multiColors({ position: 'none' }),
                ]}
                // onChange={setDates}
                disableMonthPicker
                disableYearPicker
                readOnly
                /> 
                </div>
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-12 mb-2">
                            <div className="card shadow-card" style={{ border:'none' }}>
                                <div className="card-title text-center" style={{ backgroundColor: '#0B305A', color:'white' }}>Top 5 Employee</div>
                                <div className="card-body">
                                    <ol>
                                        {top_emp.map((topEmp, index) =>{
                                            return(
                                                <li>
                                                    <div className='d-flex justify-content-between'>
                                                        <span>{topEmp.name}</span>
                                                        <span style={{ color:'#91E57B' }}>{percentage(topEmp.working_hour, dayPerc).toString().slice(0,5)}%</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-2">
                            <div className="card shadow-card" style={{ border:'none' }}>
                                <div className="card-title text-center" style={{ backgroundColor: '#0B305A', color:'white' }}>5 Bottom Presence</div>
                                <div className="card-body">
                                    <ol>
                                        {low_emp.map((lowEmp, index) =>{
                                            return(
                                                <li>
                                                    <div className='d-flex justify-content-between'>
                                                        <span>{lowEmp.name}</span>
                                                        <span className='text-danger'>{percentage(lowEmp.working_hour, dayPerc).toString().slice(0,5)}%</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 mb-2">
                            <div className="card shadow-card" style={{ border:'none' }}>
                                <div className="card-title text-center" style={{ backgroundColor: '#0B305A', color:'white' }}>
                                    Hari Libur
                                </div>
                                 <div className="d-flex justify-content-between">
                                        <button onClick={() => navigate('/dashboard/day-off')} className='btn text-primary align-items-center'>
                                            <div className="d-flex justify-content-between">
                                                    <Add />
                                                <span>Tambah Hari Libur</span>
                                            </div>
                                        </button>
                                </div>
                                <div className="card-body">
                                    <ol>
                                        {offDay.map((dayO, index) => {
                                            return(
                                                <li key={index}>
                                                    <div className='d-flex justify-content-between'>
                                                        <span style={{ fontSize:'14px' }}>{dayO.title_day.length > 10 ? dayO.title_day.slice(0,13) + '...' : dayO.title_day }</span>
                                                        <span style={{ fontSize:'14px' }}>{datesUpt(dayO.date)}</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                               
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

            {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClickOpen}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Tambah Hari Libur"}</DialogTitle>
                    <DialogContent sx={{ width:520 }}>
                      <DialogContentText id="alert-dialog-slide-description">
                        
                      <TextField 
                        fullWidth
                        value={day_name}
                        onChange={e => setDayName(e.target.value)}
                        id="Harilibur"
                        sx={{ mt:2 }} 
                        label='Hari Libur'
                         />
                        <Box sx={{ mt:2 }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <MobileDatePicker
                              label="Tanggal Libur"
                              value={new Date(tanggal)}
                            //   value={tanggal}
                              onChange={(valuese) => {
                                  setTanggal(valuese);
                              }}
                              renderInput={(params) => <TextField fullWidth variant='outlined' label='Tanggal Hari Libur' {...params} />}
                              />
                          </LocalizationProvider>
                        </Box>
                       
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={addOffDay}>Tambah</Button>
                    </DialogActions>
                  </Dialog> */}

           
        </main>
    </div>
  )
}

export default Dashboard