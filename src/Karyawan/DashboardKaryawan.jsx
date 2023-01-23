import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL, USER_TOKEN, NAMES } from '../fetch/fetch'

function DashboardKaryawan() {

  const navigate = useNavigate()
  const [users, setUsers] = React.useState([])
  // const [loading, setLoading] = React.useState(true)
  
  const getListPengajuan = () => {
    axios.get(`${BASE_URL}/users/employee/search/?name=${NAMES}`,{
      headers: {
        "Authorization" : 'Token ' + USER_TOKEN
      }
    })
    .then((response) => {
      const res = response.data
      setUsers(res[0])
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
            <h4>Dashboard</h4>
              <Col md={12}>
                <div className="mt-1">
                  {NAMES}
                </div>
                  Sisa Cuti Anda : {users.sisa_cuti}
                  <br />
                  Bergabung Tanggal : {users.employee_joined}
                <div className="d-flex justify-content-end">
                  <button className='btn btn-primary' onClick={() => navigate('/pengajuan')}>Ajukan Perizinan</button>
                </div>
              </Col>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardKaryawan