import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../fetch/fetch'
import { SubmissionTableComponents } from './Components/Table/EmployeeTableComponents'
import { StyledPagination } from './Components/Pagination/PaginationEmployee'

function ListPerizinanKaryawan() {

  const [list_pengajuan, setListPengajuan] = React.useState([])
  const [offSet, setOffSet] = React.useState(0)
  const [submission_paginate, setSubmissionPaginate] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(0);

  const itemsPerPage = 15;
  const pageCount = Math.ceil(submission_paginate.count / itemsPerPage);

  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/submission/employees/?limit=${itemsPerPage}&offset=${offSet}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })  
    .then((response) => {
      const res = response.data
      setListPengajuan(res.results)
      setSubmissionPaginate(res)
      // setLoading(false)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getListPengajuan(), [itemsPerPage, offSet])

  return (
    <div id='image__backgrounds' className='d-flex'>
      <SideBar />
      <main className="container" style={{ marginTop:'80px' }}>
        <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
          <div className="card-body">
            <h4>List Pengajuan Anda</h4>
            <SubmissionTableComponents tableData={list_pengajuan} link={`/perizinan/detail`} />
            <StyledPagination
                count={pageCount}
                page={currentPage + 1}
                onChange={(event, page) => {
                  setCurrentPage(page - 1)
                  setOffSet(page*itemsPerPage-15)
                }}
                variant="outlined"
                shape="rounded"
                // size="large"
              />
              <hr />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ListPerizinanKaryawan