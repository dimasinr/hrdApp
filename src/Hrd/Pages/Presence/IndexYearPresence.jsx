import React from 'react'
import { Col } from 'react-bootstrap'
import SideBar from '../../Components/SideBar'
import { Link } from 'react-router-dom';

function IndexYearPresence() {
    var data = [2023, 2024, 2025, 2026]
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
                              <small className='text-secondary'>Pilih tahun karyawan untuk detail absensinya.</small>
                            </div>
                            <center>
                                <div className="d-flex flex-wrap">
                                    {data.map((item, index) => {
                                        return (
                                            <div className="col-md-5 m-3">
                                                <Link to={`/absensi/${item}`} className='unlink'>
                                                    <div className="card shadow-card shadow__card" style={{ border:'none', borderRadius:'10px' }} key={index}>
                                                        <div className="card-body">
                                                            {item}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            );
                                        })}
                                </div>
                            </center>
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

export default IndexYearPresence
