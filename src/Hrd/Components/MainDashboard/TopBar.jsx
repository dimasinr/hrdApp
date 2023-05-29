import {useState, useEffect} from 'react'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'

export default function TopBar() {

    const [weekdays, setWeekdays] = useState([])
    const [topDash , setTopDash] = useState([])
    const yearToday = new Date().getFullYear()

    const getWeekOf = () => {
        axios.get(`${BASE_URL}/api/dashboard/week-of`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setWeekdays(res.weekday)
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getWeekOf(), [])

    const getTopBar = () => {
        axios.get(`${BASE_URL}/users/employee-total/${yearToday}`,{
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
      useEffect(() => getTopBar(), [])


    var dates = new Date().getFullYear()
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

    function sumAttendance(jumlah_hari, jumlah_karyawan, total_prec){
        let precentage_att = (total_prec / (jumlah_hari * jumlah_karyawan)) * 100
        return precentage_att
      }



  return (
    <div className="col-md-12 d-flex mb-2">
    <div className="col-md-9">
        <div className="d-flex flex-wrap">
            <div className="col-md-3 mb-2">
                <div className="card shadow-card" style={{ border:'none', marginRight:'10px', marginLeft:'10px' }}>
                    <div className='card-title text-center top_card_color'>Total Working Days</div>
                    <div className="card-body text-center">
                        <span><h4>{topDash.working_day ? topDash.working_day : '0'} Day</h4></span>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-2">
                <div className="card shadow-card" style={{ border:'none' }}>
                    <div className='card-title text-center top_card_color'>Attendance Percentage</div>
                    <div className="card-body text-center">
                        <span><h4>{sumAttendance(topDash.working_day, topDash.employee && topDash.employee.active_employee, topDash.total_attendance && topDash.total_attendance.presence).toFixed(2) } %</h4></span>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-2">
                <div className="card shadow-card" style={{ border:'none', marginLeft:'10px' }}>
                    <div className='card-title text-center top_card_color'>Total Active Employee</div>
                    <div className="card-body text-center">
                        <span><h4>{topDash.employee && topDash.employee.active_employee} Employee</h4></span>
                    </div>
                </div>
            </div>

            <div className="col-md-3 mb-2">
                <div className="card shadow-card" style={{ border:'none', marginLeft:'10px' }}>
                    <div className='card-title text-center top_card_color'>Total Resign Employee</div>
                    <div className="card-body text-center">
                        <span><h4>{topDash.employee && topDash.employee.inactive_employee} Employee</h4></span>
                    </div>
                </div>
            </div>

        </div>

    </div>
    <div className="col-md-3" style={{ marginLeft:'10px' }}>
        <div className="card shadow-card" style={{ border:'none', marginRight:'10px' }}>
            <div className='card-title text-center top_card_color'>Year</div>
            <div className="card-body text-center">
                <span><h4>{dates && dates}</h4></span>
            </div>
        </div>
    </div>
</div>
  )
}
