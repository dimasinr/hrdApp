import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { Col } from 'react-bootstrap'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, NAMES } from '../fetch/fetch'
import { Box, Skeleton } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'Id', width: 50 },
  { field: 'employee_name', headerName: 'Nama', width: 130 },
  { field: 'division', headerName: 'Bagian', width: 110 },
  { field: 'permission_type', headerName: 'Jenis Ijin', width: 110 },
  { field: 'reason', headerName: 'Alasan', width: 130 },
  { field: 'start_date', headerName: 'Tanggal Awal', width: 130 },
  { field: 'end_date', headerName: 'Tanggal Akhir', width: 130 },
  { field: 'return_date', headerName: 'Masuk Kembali', width: 130 },
  { field: 'permission_pil', headerName: 'Izin Atasan', width: 130 },
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

function PerizinanKaryawan() {

  const navigate = useNavigate()
  const [list_pengajuan, setListPengajuan] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  
  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/petitions/pengajuan/?employee_name=${NAMES}`,{
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
  React.useEffect(() => getListPengajuan(), [])

  const handleRowClick = (params) => {
    navigate(`/perizinan/detail/${params.row.id}`)
  };

  return (
    <div id='image__backgrounds' className='d-flex'>
      <SideBar />
      <main className="container" style={{ marginTop:'80px' }}>
        <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
          <div className="card-body">
            <h4>List Pengajuan Anda</h4>
              <Col md={12}>
                <div style={{ height: 520, width: '100%' }}>
                <DataGrid
                rows={list_pengajuan}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
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
      </main>
    </div>
  )
}

export default PerizinanKaryawan