import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import axios from 'axios'
import SideBar from '../../Components/SideBar'

function ListKaryawan() {

    const [listCalendarCuti , setListCalendarCuti] = React.useState([])

    const getCalendarCuti = () => {
      axios.get(`${BASE_URL}/api/submission/calendar`,{
        headers: {
          "Authorization" : `Token ${USER_TOKEN}`
        }
      })
      .then((response) => {
        const res = response.data
        setListCalendarCuti(res)
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getCalendarCuti(), [])
  
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
                // weekends={true}
                eventBackgroundColor={listCalendarCuti.color}
                // eventContent={renderEventContent(listCalendarCuti)}
                // dateClick={handleDateClick}
                // events={newArrayOfObj}
                events={listCalendarCuti}
                />
                </div>
            </div>
        </main>
    </div>
  )
}

export default ListKaryawan