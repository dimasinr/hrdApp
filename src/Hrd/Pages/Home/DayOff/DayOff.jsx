import React from 'react'
import SideBar from '../../../Components/SideBar';
import { TextField, Box, 
    // Slide, 
    // Dialog, DialogTitle, DialogContent, DialogContentText,  DialogActions, Button
 } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Col } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import {Skeleton} from '@mui/material';

const columns = [
    { field: 'id', headerName: 'Id', width: 120 },
    { field: 'title_day', headerName: 'Nama Hari', width: 170 },
    { field: 'date', headerName: 'Tanggal', width: 190 },
    { field: 'type_day', headerName: 'Jenis Libur', width: 190 },
    // { field: 'days', headerName: 'Tanggal', width: 140 },
    // { field: 'months', headerName: 'Bulan', width: 120 },
    { field: 'years', headerName: 'Tahun', width: 270 },
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

function DayOff() {

    // const [open, setOpen] = useState(false)
    const [day_name, setDayName] = useState('')
    const [tanggal, setTanggal] = useState(new Date())
    const [offDay, setOffDay] = useState([])
    const [searchFirst, setSearchFirst] = useState('')
    const [loading, setLoading] = useState(true)

    const dated = tanggal.toISOString().slice(0,10)
    const type_day = 'national'

    // const handleClickClose = () => {
    //     setOpen(false)
    // }

    const getOffDay = () => {
        axios.get(`${BASE_URL}/dashboard/employee-dashboard/`,{
          headers: {
            "Authorization" : `Token ${USER_TOKEN}`
          }
        })
        .then((response) => {
          const res = response.data
          setOffDay(res)
          console.log(res)
          setLoading(false)
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
                url:`${BASE_URL}/dashboard/employee-dashboard/`,
                data: formData,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            Swal.fire({
                icon: 'success',
                title: `Data Berhasil ditambah`,
                showConfirmButton: false,
                timer: 1500
              })
              getOffDay()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                  title: 'Oops...',
                  text: `${error.response.data.detail}`
                })
            }
        }
    };

    const deleteOffDay = async e => {
        try{
           await axios({
                method: 'delete',
                url:`${BASE_URL}/dashboard/employee-dashboard/${searchFirst}/`,
                headers: {
                    "Authorization" : `Token ${USER_TOKEN}`
                  }
            })
            Swal.fire({
                icon: 'success',
                title: `Data Berhasil di hapus`,
                showConfirmButton: false,
                timer: 1500
              })
              getOffDay()
        }catch(error){
            if( error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ){
                    Swal.fire({
                        icon: 'error',
                  title: 'Oops...',
                  text: `${error.response.data.detail}`
                })
            }
        }
    };

    // const Transition = React.forwardRef(function Transition(props, ref) {
    //     return <Slide direction="up" ref={ref} {...props} />;
    //   });


  return (
    <div id='image__background' className='d-flex'>
    <SideBar />
        <main className="container" style={{ marginTop:'75px' }}>

            <Col md={12} sm={12}>
                <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                    <div className="card-body">

                    <div className="card-title">
                            <h4>List Karyawan</h4>
                        </div>
                        
                        

                            <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                <Box sx={{ display:'flex' }}>
                                <TextField placeholder='Id Hari' sx={{ mr:2, mt:2, width:'90px' }} value={searchFirst} onChange={e => setSearchFirst(e.target.value)} />
                                <button onClick={deleteOffDay} className='btn btn-danger' style={{ height:'50px', marginTop:'20px' }}>Delete</button>
                                {/* <TextField placeholder='Cari Roles' sx={{ mt:3 }} value={searchRoles} onChange={e => setSearchRoles(e.target.value)} /> */}
                                </Box>
                                <Box sx={{ display:'flex' }}>
                                <TextField 
                                    fullWidth
                                    value={day_name}
                                    onChange={e => setDayName(e.target.value)}
                                    id="Harilibur"
                                    sx={{ mt:2, mr:2 }} 
                                    label='Nama Hari Libur'
                                    />
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                        label="Tanggal Libur"
                                        value={tanggal}
                                        onChange={(valuese) => {
                                            setTanggal(valuese);
                                        }}
                                        renderInput={(params) => <TextField fullWidth sx={{ mt:2, mr:2}} variant='outlined' label='Tanggal Hari Libur' {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <button onClick={addOffDay} className='btn btn-primary' style={{ height:'35px', marginTop:'20px' }}>Tambah Hari Libur</button>
                                </Box>
                            </Col>
                            
                            <Col md={12}>
                                <div style={{ height: 520, width: '100%' }}>
                                <DataGrid
                                rows={offDay}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                getRowId={(row) => row.id}
                                // onRowClick={handleRowClick}
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
        

             {/* <Dialog
                    open={open}
                    TransitionComponent={Transition}
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
                            value={tanggal}
                            onChange={(valuese) => {
                                convDate(valuese);
                            }}
                            renderInput={(params) => <TextField fullWidth variant='outlined' label='Tanggal Hari Libur' {...params} />}
                            />
                        </LocalizationProvider>
                        </Box>
                    
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClickClose}>Tutup</Button>
                    <Button onClick={addOffDay}>Tambah</Button>
                    </DialogActions>
                </Dialog> */}

        
        </main>
    </div>
  )
}

export default DayOff