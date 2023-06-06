import React from 'react'
import SideBar from '../../Components/SideBar';
import { TextField, Box, 
    Slide, 
    Dialog, DialogTitle, DialogContent, DialogContentText,  DialogActions, Button,
    FormControl, InputLabel, Select, MenuItem
 } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch';
import axios from 'axios';
import { Col } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import {Skeleton, Snackbar, Alert} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';

const columns = [
    { field: 'id', headerName: 'Id', width: 60 },
    { field: 'title_day', headerName: 'Nama Hari', width: 140 },
    { field: 'date', headerName: 'Tanggal', width: 180 },
    { field: 'type_day', headerName: 'Jenis Libur', width: 140 },
    { field: 'day_names', headerName: 'Hari', width: 140 },
    { field: 'day_of', headerName: 'Tipe Libur', width: 130 },
    { field: 'years', headerName: 'Tahun', width: 120 },
];

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: 'max-content',
    }}
  >
    {[...Array(1)].map((_, index) => (
      <Skeleton variant="rectangular" sx={{ my: 4, mx: 1 }} key={index} />
    ))}
  </Box>
);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DayOff() {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [day_name, setDayName] = useState('')
    const [tanggal, setTanggal] = useState(new Date())
    const [offDay, setOffDay] = useState([])
    const [searchFirst, setSearchFirst] = useState('')
    const [loading, setLoading] = useState(true)
    const [type_day, setTypeDay] = useState('national')

    const dated = tanggal.toISOString().slice(0,10)

    // snackbar
    const [snack, setSnack] = React.useState(false);
    const [status, setStatus] = React.useState('info');
    const [message, setMessage] = React.useState('');
  
    const handleClose = () => {
      setSnack(false)
    };

    const handleClick = () => {
        setOpen(!open)
    }

    const getOffDay = () => {
        axios.get(`${BASE_URL}/api/dashboard/employee-dashboard/?limit=100`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setOffDay(res.results)
          console.log(res)
          setLoading(false)
          window.scrollTo({top: 0, behavior: 'smooth'});
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect(() => getOffDay(), [])

    const addOffDay = async e => {
        try{
            const formData = new FormData();
            formData.append("title_day", day_name);
            formData.append("date", dated);
            formData.append("type_day", type_day);
           await axios({
                method: 'post',
                url:`${BASE_URL}/api/dashboard/employee-dashboard/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            setOpen(false)
            setSnack(true)
            setStatus('info')
            setMessage('Hari Libur berhasil di tambah')
            getOffDay()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setSnack(true)
                setStatus('error')
                setMessage(`${error.response.data.message}`)
            }
        }
    };

    const deleteOffDay = async e => {
        try{
           await axios({
                method: 'delete',
                url:`${BASE_URL}/api/dashboard/employee-dashboard/${searchFirst}/`,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            setSnack(true)
            setStatus('info')
            setMessage(`Data berhasil dihapus`)
            getOffDay()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                setSnack(true)
                setStatus('error')
                setMessage(`${error.response.data.message}`)
            }
        }
    };

    const changeDate = (event) => {
        setTypeDay(event.target.value);
      };

      const dataNotes = [
        {
          'id' : 1,
          'name' : 'national'
        },
        {
          'id' : 2,
          'name' : 'kantor'
        },
      ]

      const handleRowClick = (params) => {
        navigate(`/dashboard/day-off/${params.row.id}`)
      };


  return (
    <div id='image__background' className='d-flex'>
    <SideBar />
        <main className="container" style={{ marginTop:'-10px' }}>

            <Col md={12} sm={12}>
                <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                    <div className="card-body">

                    <div className="card-title">
                        <button className="btn align-items-center d-flex" onClick={() => navigate(-1)}>
                            <ArrowBackIos style={{ marginTop:'-6px'}} />
                            <h4>List Hari Libur</h4>
                        </button>
                        </div>
                        
                            <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                <Box sx={{ display:'flex' }}>
                                <TextField placeholder='Id Hari' sx={{ mr:2, mt:2, width:'90px' }} value={searchFirst} onChange={e => setSearchFirst(e.target.value)} />
                                <button onClick={deleteOffDay} className='btn btn-danger' style={{ height:'50px', marginTop:'20px' }}>Delete</button>
                                {/* <TextField placeholder='Cari Roles' sx={{ mt:3 }} value={searchRoles} onChange={e => setSearchRoles(e.target.value)} /> */}
                                </Box>
                                <Box sx={{ display:'flex' }}>
                                    <button onClick={handleClick} className='btn btn-primary' style={{ height:'35px', marginTop:'20px' }}>Tambah Hari Libur</button>
                                </Box>

                                

                            </Col>
                            
                            <Col md={12}>
                                <div style={{ height: 520, width: '100%' }}>
                                <DataGrid
                                rows={offDay}
                                columns={columns}
                                // pageSize={50}
                                // rowsPerPageOptions={[10, 25, 50]}
                                getRowId={(row) => row.id}
                                onRowClick={handleRowClick}
                                components={{
                                    LoadingOverlay: LoadingSkeleton,
                                    }}
                                    loading={loading}
                                />
                                </div>
                            </Col>
                    </div>
                </div>
            </Col>
        

             <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    onClose={handleClick}
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
                            value={tanggal}
                            onChange={(valuese) => {
                                setTanggal(valuese);
                            }}
                            renderInput={(params) => <TextField fullWidth variant='outlined' label='Tanggal Hari Libur' {...params} />}
                            />
                        </LocalizationProvider>
                        </Box>
                    
                        <FormControl fullWidth sx={{ mt: 3, minWidth: 120 }}>
                            <InputLabel id="type-notes-label">Tipe Hari Libur</InputLabel>
                            <Select
                            labelId="type-notes"
                            id="type-notes"
                            value={type_day}
                            onChange={changeDate}
                            label="Type Notes"
                            >
                                {dataNotes && dataNotes.map((rol, index) => {
                                    return(
                                        <MenuItem key={index} value={rol.name}>{rol.name.charAt(0).toUpperCase() + rol.name.slice(1)}</MenuItem>
                                    )
                                })}
                            
                            </Select>
                        </FormControl>
                    
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClick}>Tutup</Button>
                    <Button onClick={addOffDay}>Tambah</Button>
                    </DialogActions>
                </Dialog>

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

export default DayOff