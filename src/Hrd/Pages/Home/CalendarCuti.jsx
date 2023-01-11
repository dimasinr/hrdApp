import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import SideBar from '../../Components/SideBar'

function ListKaryawan() {

    const [listPengajuan , setListPengajuan] = React.useState([])

    const getDates = () => {
      axios.get(`${BASE_URL}/petitions/employee-calendar/`,{
        headers: {
          "Authorization" : `Token ${USER_TOKEN}`
        }
      })
      .then((response) => {
        const res = response.data
        setListPengajuan(res)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getDates(), [])
  

    //   const data = [
    //     {
    //         "title" : "sasa",
    //         'start' : "2023-01-02",
    //         'end' : "2023-01-02"
    //     },
    //     {
    //         "title" : "jonath",
    //         'start' : "2023-01-02",
    //         'end' : '2023-01-08T17:13:31.628Z'
    //     }
    //   ]
    const newArrayOfObj = listPengajuan.map(({
      employee_name: title,
      start_date: start,
      end_date: end,
      ...res
    }) => ({
      title,
      start,
      end,
      ...res
    }));

  return (
    <div id='image__background' className='d-flex'>
        <SideBar />
        <main className="container" style={{ marginTop:"75px" }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="card-title"><h4>Kalender Cuti</h4></div>
                <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                //   weekends={false}
                eventBackgroundColor='#2C3E50'
                // eventContent={renderEventContent(listPengajuan)}
                // dateClick={handleDateClick}
                events={newArrayOfObj}
                />
                </div>
            </div>
        </main>
    </div>
  )
}

export default ListKaryawan