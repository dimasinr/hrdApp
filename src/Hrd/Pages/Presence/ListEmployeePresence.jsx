import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../fetch/fetch'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Skeleton, TextField } from '@mui/material';
import SideBar from '../../Components/SideBar'
import { useNavigate, useParams } from 'react-router-dom';

const columns = [
      { field: 'pk', headerName: 'User Id', width: 70 },
      { field: 'first_name', headerName: 'Nama Depan', width: 130 },
      { field: 'last_name', headerName: 'Nama Belakang', width: 150 },
      { field: 'name', headerName: 'Nama Lengkap', width: 190 },
      { field: 'username', headerName: 'Username', width: 150 },
      { field: 'email', headerName: 'Email', width: 235 },
      { field: 'division', headerName: 'Divisi', width: 140 },
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

function ListEmployeePresence() {

    const navigate = useNavigate()
    const { year } = useParams();
    const [list_users, setListUsers] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const [searchEmployee, setSearchEmployee] = useState('')

     const getListPengajuan = () => {
      axios.get(`${BASE_URL}/users/employee/search/?name=${searchEmployee}&active=True`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setListUsers(res)
        setLoading(false)
        console.log(res)
        window.scrollTo({ top: 0, behavior: 'smooth' });

      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getListPengajuan(), [searchEmployee])
  

    const handleRowClick = (params) => {
      navigate(`/absensi/${year}/${params.row.name}/${params.row.pk}`)
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
                                  <h4>Analisa Absensi Karyawan</h4>
                                  <small className='text-secondary'>klik nama karyawan untuk detail absensinya.</small>
                                </div>
                               
                                    <Col md={12} className='mb-2 text-secondary d-flex justify-content-between'>
                                      <Box>
                                        <TextField placeholder='Nama Lengkap' sx={{ mt:1, mr:2 }} value={searchEmployee} onChange={e => setSearchEmployee(e.target.value)} />
                                      </Box>
                                    </Col>
                                    
                                    <Col md={12}>
                                       <div style={{ height: 520 }}>
                                        <DataGrid
                                        rows={list_users}
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

export default ListEmployeePresence