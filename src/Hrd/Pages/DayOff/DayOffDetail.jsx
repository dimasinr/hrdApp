import React from 'react'
import SideBar from '../../Components/SideBar';
import { TextField, Box, 
    // Slide, 
    // Dialog, DialogTitle, DialogContent, DialogContentText,  DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem
 } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';
import {CircularProgress, Snackbar, Alert} from '@mui/material';

function DayOffDetail() {

    const navigate = useNavigate()
    const location = useLocation()

    const off_id = location.pathname.split('/')[3]

    const [day_title, setDayTitle] = useState('')
    const [tanggal, setTanggal] = useState(new Date())
    const [dayName, setDayName] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [loading, setLoading] = useState(true)
    const [day_of, setDayOf] = useState('weekday')

    const type_day = 'national'

    // snackbar
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState('info');
    const [message, setMessage] = React.useState('');

    const handleClose = () => {
    setSnack(false)
    };

    const getOffDay = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-dashboard/${off_id}/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setDayName(res.day_name)
          setMonth(res.months)
          setYear(res.years)
          console.log(res)
          setDayOf(res.day_of)
          setDayTitle(res.title_day)
          setTanggal(res.date)
          setLoading(false)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getOffDay(), [])

    const editOffDay = async e => {
        try{
            const formData = new FormData();
            formData.append("title_day", day_title);
            formData.append("date", tanggal);
            formData.append("day_of", day_of);
            formData.append("type_day", type_day);
           await axios({
                method: 'put',
                url:`${BASE_URL}/api/dashboard/employee-dashboard/${off_id}/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            setSnack(true)
            setStatus('info')
            setMessage('Data Berhasil di ubah')
            getOffDay()
            navigate(-1)
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setSnack(true)
                setStatus('error')
                setMessage(`${error.response.data.detail}`)
            }
        }
    };

    const deleteOffDay = async e => {
        try{
           await axios({
                method: 'delete',
                url:`${BASE_URL}/api/dashboard/employee-dashboard/${off_id}/`,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            setSnack(true)
            setStatus('success')
            setMessage('Data Berhasil dihapus')
              getOffDay()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setSnack(true)
                setStatus('error')
                setMessage(`${error.response.data.detail}`)
            }
        }
    };

    const changeDate = (event) => {
        setDayOf(event.target.value);
      };

      const dataNotes = [
        {
          'id' : 1,
          'name' : 'weekend'
        },
        {
          'id' : 2,
          'name' : 'weekday'
        },
      ]

      const convDate = (newdate) => {
        let event = new Date(newdate);
        let dated = JSON.stringify(event);
        setTanggal(dated.slice(1, 11))
      }


  return (
    <div id='image__backgrounds' className='d-flex'>
    <SideBar />
        <main className="container" style={{ marginTop:'78px' }}>

            <Col md={12} sm={12}>
                <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                    <div className="card-body">

                    <div className="card-title">
                        <button className="btn align-items-center d-flex" onClick={() => navigate(-1)}>
                            <ArrowBackIos style={{ marginTop:'-6px'}} />
                            <h4>Detail Hari Libur</h4>
                        </button>
                        </div>
                        
                            <Col md={12}>
                                <div className="container">
                                    {loading && loading ? 
                                    <center><CircularProgress /></center>
                                    : null
                                    }
                                    <Box sx={{ maxWidth:850, display: 'flex', justifyContent:'between' }}>
                                        <Row style={{ marginRight:'20px'}}>
                                            <TextField 
                                            fullWidth
                                            value={day_title}
                                            onChange={e => setDayTitle(e.target.value)}
                                            id="Harilibur"
                                            sx={{ mb:2 }} 
                                            label='Hari Libur'
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <MobileDatePicker
                                                label="Tanggal Libur"
                                                inputFormat="DD MMMM YYYY"
                                                value={new Date(tanggal)}
                                                onChange={(valuese) => {
                                                    convDate(valuese);
                                                }}
                                                renderInput={(params) => <TextField sx={{ mb:2 }} fullWidth variant='outlined' label='Tanggal Hari Libur' {...params} />}
                                                />
                                            </LocalizationProvider>
                                            <FormControl fullWidth sx={{ mb: 2, minWidth: 120 }}>
                                                <InputLabel id="type-day-label">Tipe Hari Libur</InputLabel>
                                                <Select
                                                labelId="type-day"
                                                id="type-day"
                                                value={day_of}
                                                onChange={changeDate}
                                                label="Type day"
                                                >
                                                    {dataNotes && dataNotes.map((rol, index) => {
                                                        return(
                                                            <MenuItem key={index} value={rol.name}>{rol.name.charAt(0).toUpperCase() + rol.name.slice(1)}</MenuItem>
                                                        )
                                                    })}
                                                
                                                </Select>
                                            </FormControl>
                                        </Row>
                                        <Row>
                                        <TextField fullWidth value={dayName} onChange={e => setDayName(e.target.value)} id="dayname" sx={{ mb:2 }} label='Hari' disabled variant='filled' />
                                        <TextField fullWidth value={month} onChange={e => setMonth(e.target.value)} id="daymonth" sx={{ mb:2 }} label='Hari' disabled variant='filled' />
                                        <TextField fullWidth value={year} onChange={e => setYear(e.target.value)} id="dayyear" sx={{ mb:2 }} label='Hari' disabled variant='filled' />
                                          
                                        </Row>
                                    </Box>

                                    <div className="d-flex justify-content-end">
                                        <Box>
                                            <button onClick={editOffDay} className='btn' style={{ marginRight:'10px', color:'#73a9ff' }}>
                                                <b>Simpan</b>
                                            </button>
                                            <button onClick={deleteOffDay} className='btn text-danger'>
                                                <b>Hapus</b>
                                            </button>
                                        </Box>
                                    </div>
                                </div>
                            </Col>
                            
                            
                    </div>
                </div>
            </Col>

            <Snackbar
              anchorOrigin={{ vertical : 'top', horizontal: 'right' }}
              open={snack}
              onClose={handleClose}
              autoHideDuration={6000}
              // key={vertical + horizontal}
            >
              <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
              {message && message}
            </Alert>
            </Snackbar>

        </main>
    </div>
  )
}

export default DayOffDetail