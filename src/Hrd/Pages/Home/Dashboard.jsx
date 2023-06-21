/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState, useEffect} from 'react'
import './dashboard.css'
import SideBar from '../../Components/SideBar'
import { Calendar, DateObject } from "react-multi-date-picker"
import axios from 'axios'
import { USER_TOKEN, BASE_URL } from '../../../fetch/fetch'
import multiColors from "react-multi-date-picker/plugins/colors"
import { datesUpt } from '../../../Components/utilsFunction/functionUtils'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Pagination, Stack, Chip } from '@mui/material'
import TopBar from '../../Components/MainDashboard/TopBar'
import MainDashboard from '../../Components/MainDashboard/MainDashboard'
import { SideCardTop, SideCardLow, SideCardBirthday, SideCardContractEnd } from '../../Components/Card/SideCard'
import { DateRange } from '@mui/icons-material'

const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'end',
  borderRadius: '50%',
  marginTop: '1rem',
  borderColor: '#84B5E7',
  '& .MuiPaginationItem-root': {
    color: '#2C3E50',
    borderRadius: '50%',
    borderColor: '#84B5E7',

  },
  '& .Mui-selected': {
    backgroundColor: '#E3EEFA',
    color: '#1976D5',
  },
});

function Dashboard() {

    const navigate = useNavigate()
    const monthToday = new Date().getMonth()+1
    const yearToday = new Date().getFullYear()

    const [offDay , setOffDay] = useState([])
    const [top_emp, setTopEmp ] = useState([])
    const [low_emp, setLowEmp ] = useState([])
    const [birth_emp, setBirthEmp ] = useState([])
    const [contract_emp, setContractEmp ] = useState([])

    const [loading, setLoading] = useState(false)
    const [loadingMonth, setLoadingMonth] = useState(false)

    const [presence_paginate, setPresencePaginate] = useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const [offSet, setOffSet] = useState(0)

    const itemsPerPage = 50;
    const pageCount = Math.ceil(presence_paginate.count / itemsPerPage);

    function dateContract(x){
      if(x > 12){
        return 1
      }else{
        return x
      }
    }

    const contractmonth = dateContract(monthToday)

      const getOffDay = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-dashboard/?limit=50&offset=${offSet}`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setOffDay(res.results)
          setPresencePaginate(res)
          console.log(res)
        })
      }
      useEffect(() => getOffDay(), [offSet])

    const getTopFive = () => {
        axios.get(`${BASE_URL}/api/employee/best_of/?start_date=2023-01-01&end_date=2024-01-01`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setLoading(true)
          setTopEmp(res.top_five)
          setLowEmp(res.low_five)
          console.log(res)
        })
      }
    useEffect(() => getTopFive(), [])

    const getBirthdayEmployee = () => {
      axios.get(`${BASE_URL}/api/dashboard/employee-birth/${monthToday}/`,{
        headers: {
          "Authorization" : `Token ${USER_TOKEN}`
        }
      })
      .then((response) => {
        const res = response.data
        setLoadingMonth(true)
        setBirthEmp(res)
        console.log(res)
      })
    }

    const getContractEndEmployee = () => {
      axios.get(`${BASE_URL}/api/dashboard/contract-end/${contractmonth}/${yearToday}/`,{
        headers: {
          "Authorization" : `Token ${USER_TOKEN}`
        }
      })
      .then((response) => {
        const res = response.data
        setLoadingMonth(true)
        setContractEmp(res)
        console.log(res)
      })
    }
  useEffect(() => {
    getBirthdayEmployee()
    getContractEndEmployee()
  }, [monthToday, yearToday])

  console.log(monthToday)
      
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

      const [main, setMain] = useState(true)
      const changeMainDisplay = () =>{
        setMain(!main)
      }

  return (
    <div id='image__background' className='d-flex'>
        <SideBar />
        <main className="container" style={{ marginTop:'75px' }}>

        {/* Top Main */}
            <TopBar />
        {/* Content Main */}

        <div className="col-md-12" style={{ marginLeft:'10px' }}>
            <div className="d-flex flex-wrap">
                <div className="col-md-8" style={{ marginRight:'55px' }}>
                  {main ? 
                <Stack direction="row" spacing={1} sx={{ mb:2 }}>
                  <Chip label="Statistik Dashboard" onClick={changeMainDisplay} color="primary" />
                  <Chip label="Calendar Dashboard" onClick={changeMainDisplay} color="primary"  variant="outlined" />
                </Stack>
                  :
                <Stack direction="row" spacing={1} sx={{ mb:2 }}>
                  <Chip label="Statistik Dashboard" onClick={changeMainDisplay} color="primary" variant="outlined"  />
                  <Chip label="Calendar Dashboard" onClick={changeMainDisplay} color="primary"  />
                </Stack>
                }
               {main ?
                <MainDashboard />
                :
               <Calendar
                fullYear
                {...initialProps}
                plugins={[
                    multiColors({ position: 'none' }),
                ]}
                disableMonthPicker
                disableYearPicker
                readOnly
                /> 
              }
                </div>

                <div className="col-md-3">
                    <div className="row">
                        
                    <SideCardTop data={top_emp} loading={loading} />
                    <SideCardLow data={low_emp} loading={loading} />  
                    <SideCardBirthday data={birth_emp} loading={loadingMonth} />
                    <SideCardContractEnd data={contract_emp} loading={loadingMonth} />

                        <div className="col-md-12 mb-2">
                            <div className="card shadow-card" style={{ border:'none' }}>
                                <div className="card-title text-center top_card_color">
                                    Hari Libur
                                </div>
                                 <div className="d-flex justify-content-between">
                                        <button onClick={() => navigate('/dashboard/day-off')} style={{ fontWeight:'500' }} className='btn text-primary align-items-center'>
                                        <DateRange /> Menu Hari Libur 
                                        </button>
                                </div>
                                <div className="card-body">
                                    <ol>
                                        {offDay.map((dayO, index) => {
                                            return(
                                                <li key={index}>
                                                    <div className='d-flex justify-content-between'>
                                                        <span style={{ fontSize:'14px' }}>{
                                                          dayO.title_day?
                                                          dayO.title_day.length > 10 ? dayO.title_day.slice(0,13) + '...' : dayO.title_day 
                                                          : "tidak ada hari"
                                                        }</span>
                                                        <span style={{ fontSize:'14px' }}>{datesUpt(dayO.date)}</span>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                    {presence_paginate.count > 50 ?
                                    <StyledPagination
                                      count={pageCount}
                                      page={currentPage + 1}
                                      onChange={(event, page) => {
                                        setCurrentPage(page - 1)
                                        setOffSet(page*itemsPerPage-50)
                                      }}
                                      variant="outlined"
                                      shape="rounded"
                                      size="small"
                                    />:
                                    null
                                    }
                                </div>
                               
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
           
        </main>
    </div>
  )
}

export default Dashboard