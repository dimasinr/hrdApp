import React from 'react'
import SideBar from '../Hrd/Components/SideBar'
import { Col } from 'react-bootstrap'
import { TextField, Box } from '@mui/material'

function AccountSettings() {
  return (
    <div id='image__backgrounds' className='d-flex'>
    <SideBar />
    <main className="container" style={{ marginTop:'80px' }}>
      <div className="card shadow-ard" style={{ border:'none', borderRadius:'10px' }}>
        <div className="card-body">
          <h4>Pengaturan Akun</h4>
            <Col md={12}>
              <Col md={4}>
              <div className="mt-2">
               <div className="card shadow-card" style={{ border:'none' }}>
                <div className="card-body">
                    <span style={{ color: 'blue'}}>Change Password</span>
                    <Box>
                        <TextField fullWidth label='Password Baru' variant='standard' />
                    </Box>
                </div>
               </div>
              </div>
              </Col>
              <div className="d-flex justify-content-end">
                <button className='btn btn-primary' onClick={() => alert("hi")}>Ajukan Perizinan</button>
              </div>
            </Col>
        </div>
      </div>
    </main>
  </div>
  )
}

export default AccountSettings