import React, {useState} from 'react'
import axios from 'axios'
import { Col } from 'react-bootstrap'
import SideBar from '../Hrd/Components/SideBar'
import { BASE_URL, USER_TOKEN } from '../fetch/fetch'
import { CircularProgress } from '@mui/material';
import { StyledPagination } from './Components/Pagination/PaginationEmployee'
import { EmployeeTableNotesComponents, NoDataTableNotesComponents } from './Components/Table/EmployeeTableComponents'

function NotesKaryawan() {
    const [list_notes, setListNotes] = useState([])
    const [notes_paginate, setNotesPaginate] = useState([])
    const [loading, setLoading] = useState(true)
    const [offSet, setOffSet] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

     const getListNotesEmployee = () => {
      axios.get(`${BASE_URL}/api/note/employee-notes/?limit=10&offset=${offSet}`,{
        headers: {
          "Authorization" : 'Token ' + USER_TOKEN
        }
      })
      .then((response) => {
        const res = response.data
        setListNotes(res.results)
        setNotesPaginate(res.count)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log(res)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => getListNotesEmployee(), [offSet])

  const itemsPerPage = 15;
  const pageCount = Math.ceil(notes_paginate / itemsPerPage);


  return (
    <React.Fragment>
        <div className="d-flex">
        <SideBar />
        <div id="image__background">
            <main className="container" style={{ marginTop:'74px' }}>
                <div className='d-flex justify-content-center'>
                    <Col md={12} sm={12}>
                        <div className="card shadow_card" style={{ border:'none', borderRadius:'10px' }}>
                            <div className="card-body">
                                <div className="card-title">
                                    <h4>List Catatan</h4>
                                    <small className='text-secondary'>Klik tanda dibagian action untuk detail catatannya.</small>
                                </div>

                                 {loading && loading ?
                                    <CircularProgress /> :
                                    <Col md={12}>
                                    <hr />
                                    {notes_paginate !== 0 ?
                                        <EmployeeTableNotesComponents tableData={list_notes} />
                                        :
                                        <NoDataTableNotesComponents />
                                    }
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
                                    </Col>
                                    }

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

export default NotesKaryawan