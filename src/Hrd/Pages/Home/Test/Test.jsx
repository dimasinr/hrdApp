import React,{useState, useEffect} from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch'
import { CircularProgress } from '@mui/material'
import { workHour, totalWorkHour, datesUpt, totalWorking } from '../../../../Components/utilsFunction/functionUtils'
import { TextField, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import SideBar from '../../../Components/SideBar'
import { Link } from 'react-router-dom'
import { Visibility } from '@mui/icons-material'

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

export default function Test() {

  const [search_name, setSearchName] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [list_presence, setListPresence] = useState([])
  const [presence_paginate, setPresencePaginate] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [offSet, setOffSet] = useState(0)

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/presence/employees/?limit=20&offset=${offSet}&employee=${search_name}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })  
    .then((response) => {
      const res = response.data
      setPresencePaginate(res)
      setListPresence(res.results)
      setLoading(false)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getListPengajuan(), [search_name, offSet])

  const itemsPerPage = 20;
  const pageCount = Math.ceil(presence_paginate.count / itemsPerPage);

  return (
    <React.Fragment>
    <div className="d-flex">
    <SideBar />
      <div id="image__background">
          <main className="container" style={{ marginTop:'74px' }}>
            <div className="col-md-12 mt-4">
              <div className="card">
                <div className="card-body">
                  <Box sx={{ display: 'flex' }}>
                      <TextField label='Search Name' value={search_name} onChange={(e) => setSearchName(e.target.value)} />
                      <TextField label='Search Name' value={search_name} onChange={(e) => setSearchName(e.target.value)} />
                  </Box>
                <hr />
                  {loading && loading ?
                    <CircularProgress /> : 
                    <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>PrId</th>
                        <th>Nama</th>
                        <th>Tanggal</th>
                        <th>Hari Kerja</th>
                        <th>Mulai</th>
                        <th>Pulang</th>
                        <th>Total Jam</th>
                        <th>LemburS</th>
                        <th>LemburE</th>
                        <th>Total Jam Lembur</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list_presence.map((lpres, index) => {
                        return(
                          <tr key={index}>
                              <td>{lpres.id ? lpres.id : 0}</td>
                              <td>{lpres.employee ? lpres.employee && lpres.employee.name : "ex karyawan"}</td>
                              <td>{lpres.working_date ? datesUpt(lpres.working_date) : "Tanggal tidak tertera"}</td>
                              <td>{lpres.days ? lpres.days : "Hari tidak diketahui"}</td>
                              <td>{lpres.start_from ? workHour(lpres.start_from) : "-"}</td>
                              <td>{lpres.end_from ? workHour(lpres.end_from) : "-"}</td>
                              <td>{lpres.working_hour === 0 || lpres.working_hour > 0 ? totalWorking(lpres.working_hour) : "-"}</td>
                              <td>{lpres.lembur_start ? workHour(lpres.lembur_start) : "-"}</td>
                              <td>{lpres.lembur_end ? workHour(lpres.lembur_end) : "-"}</td>
                              <td>{lpres.lembur_hour === 0 || lpres.lembur_hour > 0 ? totalWorkHour(lpres.lembur_hour) : "-"}</td>
                              <Link style={{ textDecoration:'none' }} to={`/employee/absensi/${lpres.id}`}>
                                <td><Visibility /></td>
                              </Link>
                            </tr>
                        )
                      })}
                      
                    </tbody>
                  </Table>
                  }
                  <StyledPagination
                        count={pageCount}
                        page={currentPage + 1}
                        onChange={(event, page) => {
                          setCurrentPage(page - 1)

                          setOffSet(page*itemsPerPage-20)
                        }}
                        variant="outlined"
                        shape="rounded"
                        // size="large"
                      />

                </div>
              </div>
            </div>
             
          </main>
      </div>
    </div>
</React.Fragment>
  )
}
