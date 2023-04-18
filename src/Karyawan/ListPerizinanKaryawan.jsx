import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
import axios from 'axios'
import { BASE_URL, USER_TOKEN } from '../fetch/fetch'
import { SubmissionTableComponents } from './Components/Table/EmployeeTableComponents'

function ListPerizinanKaryawan() {

  const [list_pengajuan, setListPengajuan] = React.useState([])
  // const [loading, setLoading] = React.useState(true)
  
  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/api/submission/employees/`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })  
    .then((response) => {
      const res = response.data
      setListPengajuan(res.results)
      // setLoading(false)
      console.log(res)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getListPengajuan(), [])

  return (
    <div id='image__backgrounds' className='d-flex'>
      <SideBar />
      <main className="container" style={{ marginTop:'80px' }}>
        <div className="card shadow-card" style={{ border:'none', borderRadius:'10px' }}>
          <div className="card-body">
            <h4>List Pengajuan Anda</h4>
            <SubmissionTableComponents tableData={list_pengajuan} link={`/perizinan/detail`} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ListPerizinanKaryawan