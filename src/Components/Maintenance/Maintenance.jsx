import React from 'react'
import SideBar from '../../Hrd/Components/SideBar'
import { Col } from 'react-bootstrap'
import { maintenances } from '../images/images'
import './maintenance.css'

export default function Maintenance() {
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

                                    <Col md={12}>
                                       <div className='d-flex justify-content-center'>
                                           <img src={maintenances} className='img_maintenance' alt="" />
                                        </div>
                                            <p className='text_center_maintenance'>
                                                <h3>Sedang dilakukan update pada pages ini</h3>
                                            </p>
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
