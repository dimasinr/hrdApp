/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField, Tooltip } from '@mui/material';
import {Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import Swal from 'sweetalert2'
import SideBar from '../../Components/SideBar';
import { useNavigate } from 'react-router-dom';
import { PersonAddAlt1 } from '@mui/icons-material';

const columns = [
      { field: 'pk', headerName: 'UId', width: 50 },
      { field: 'employee_code', headerName: 'Emp Code', width: 90 },
      { field: 'first_name', headerName: 'Nama Depan', width: 130 },
      { field: 'last_name', headerName: 'Nama Belakang', width: 150 },
      { field: 'username', headerName: 'Username', width: 150 },
      { field: 'email', headerName: 'Email', width: 270 },
      { field: 'sisa_cuti', headerName: 'Sisa Cuti', width: 120 },
      { field: 'roles', headerName: 'Roles', width: 140 },
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

function NotesHrd() {

    const navigate = useNavigate()
    const [list_pengajuan, setListPengajuan] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [open, setOpen] = React.useState(false);
    const [loadingBut, setLoadingBut] = useState('simpan')
    const [searchEmployee, setSearchEmployee] = React.useState('')

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')


    const handleClickOpen = () => {
      setOpen(!open);
    };

    const getListEmployee = () => {
      axios.get(`${BASE_URL}/users/employee/search/?name=${searchEmployee}`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setListPengajuan(res)
        setLoading(false)
        console.log(res)
      })
    }
    React.useEffect(() => {
      const timer = setTimeout(() => {
        getListEmployee();
      }, 1000);
    
      return () => {
        clearTimeout(timer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchEmployee]);

    const handleRowClick = (params) => {
      navigate(`/list-karyawan/detail/${params.row.pk}`)
    };


  const addNewEmployee = async e => {
    try{
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("password1", password);
        formData.append("password2", password2);
       await axios({
            method: 'post',
            url:`${BASE_URL}/rest-auth/registration/`,
            data: formData,
            headers: {
                "Authorization" : `Token ${USER_TOKEN}`
              }
        })
        setOpen(false)
        Swal.fire({
            icon: 'success',
            title: `Data Berhasil dibuat`,
            showConfirmButton: false,
            timer: 1500
          })
          setLoadingBut('simpan')
          getListEmployee()
    }catch(error){
        if( error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
            ){
                Swal.fire({
                    icon: 'success',
              title: 'Berhasil',
              // text: `${error.response.data.detail}`
            })
            setLoadingBut('simpan')
            setOpen(false)
            getListEmployee()
        }
    }
};


const loadRegister =() =>{
  setLoadingBut('loading ...')
  addNewEmployee()
}

const [showPas, setShowPas] = useState(false)

const handlePas = () => {
  setShowPas(!showPas)
}

  return (
    <React.Fragment>
        <div className="d-flex">
        <SideBar />
        <div id="image__background">
            <main className="container" style={{ marginTop:'74px' }}>
                <div className=''>
                    <Col md={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                            <div className="card-body">

                            <div className="card-title">
                                  <h4>List Karyawan</h4>
                                  <small className="text-secondary">List karyawan nawastra</small>
                                </div>
                               
                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                      <Box>
                                        <TextField placeholder='Nama Karyawan' sx={{ mt:1, mr:2 }} value={searchEmployee} autoComplete='off' onChange={e => setSearchEmployee(e.target.value)} />
                                      </Box>
                                      <Tooltip sx={{ mt:1 }} title='Tambah Karyawan'>
                                        <button onClick={handleClickOpen} className='btn text-primary' style={{ borderRadius: '12px' }}><PersonAddAlt1 /></button>
                                      </Tooltip>
                                    </Col>
                                    
                                    <Col md={12}>
                                       <div style={{ height: 520 }}>
                                        <DataGrid
                                        rows={list_pengajuan}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        getRowId={(row) => row.pk}
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
                    keepMounted
                    onClose={handleClickOpen}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Tambah Data Karyawan"}</DialogTitle>
                    <DialogContent sx={{ width:520 }}>
                      <DialogContentText id="alert-dialog-slide-description">
                        <Box sx={{ mt:2, display:'flex' }}>
                          <TextField value={firstName}  fullWidth onChange={e => setFirstName(e.target.value)} sx={{ mr:1 }} label='Nama Depan' />
                          <TextField value={lastName} fullWidth onChange={e => setLastName(e.target.value)} sx={{ mr:1 }} label='Nama Belakang' />
                        </Box>
                        <Box sx={{ mt:2, display:'flex' }}>
                           <TextField value={email} type='email' fullWidth onChange={e => setEmail(e.target.value)} sx={{ mr:1 }} label='Email' />
                        </Box>
                        <Box sx={{ mt:2, display:'flex' }}>
                           <TextField value={password} fullWidth type={showPas === false ? 'password' : 'text'} onChange={e => setPassword(e.target.value)} sx={{ mr:1 }} label='Password' />
                           <TextField value={password2} fullWidth type={showPas === false ? 'password' : 'text'} onChange={e => setPassword2(e.target.value)} sx={{ mr:1 }} label='Password Confirm' />
                        </Box>
                        <div className="d-flex justify-content-end">
                          <button className='btn text-primary' onClick={handlePas}>
                            Show password
                          </button>
                        </div>
                        <small className='text-secondary'>
                          *Password
                          <ul>
                            <li>Password minimal 8 digit</li>
                            <li>Harus dicampur karakter dan angka</li>
                          </ul>
                          *Format Password(optional pilih antara format 1 - 3)
                          <ol>
                              <li>nama_depan#tanggal_masuk</li>
                              <li>nama_depan#tanggal_lahir</li>
                              <li>nws@nama_depan@tanggal_lahir</li>
                              *cth format 2: dimas#100802
                          </ol>
                        </small>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClickOpen}>Tutup</Button>
                      <Button onClick={loadRegister}>{loadingBut && loadingBut}</Button>
                    </DialogActions>
                  </Dialog>
                </div>
            </main>
        </div>
        </div>
    </React.Fragment>
  )
}

export default NotesHrd