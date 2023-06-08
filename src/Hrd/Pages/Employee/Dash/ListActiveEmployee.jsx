/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField, Tooltip } from '@mui/material';
import SideBar from '../../../Components/SideBar';
import { useNavigate, useLocation } from 'react-router-dom';
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

function ListActiveEmployee() {

    const navigate = useNavigate()
    const location = useLocation()

    const activeUser = location.pathname.split('/')[3]
    const [list_pengajuan, setListPengajuan] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [searchEmployee, setSearchEmployee] = useState('')
    console.log(activeUser)

    function usersActive(active){
        if(active === 'active'){
            return 'True'
        }else{
            return 'False'
        }
    }

    const handleClickOpen = () => {
      setOpen(!open);
    };

    const getListEmployee = () => {
      axios.get(`${BASE_URL}/users/employee/search/?name=${searchEmployee}&active=${usersActive(activeUser)}`,{
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
      const interval = setInterval(() => {
        getListEmployee();
      }, 1000);
  
      return () => {
        clearInterval(interval); 
      };
    }, [searchEmployee, activeUser]);  

    const handleRowClick = (params) => {
      navigate(`/list-karyawan/detail/${params.row.pk}`)
    };

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
                                        <TextField placeholder='Nama Karyawan' sx={{ mt:1, mr:2 }} value={searchEmployee} onChange={e => setSearchEmployee(e.target.value)} />
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
              
                </div>
            </main>
        </div>
        </div>
    </React.Fragment>
  )
}

export default ListActiveEmployee