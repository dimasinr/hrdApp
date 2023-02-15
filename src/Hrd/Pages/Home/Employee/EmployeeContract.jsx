import React from 'react'
import SideBar from '../../../Components/SideBar'
import {Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TablePagination, TableRow} 
    from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { BASE_URL, USER_TOKEN } from '../../../../fetch/fetch';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'pk', label: 'Emp Id', align: 'center', minWidth: 60 },
    { id: 'employee_code', label: 'Employee Code', align: 'center', minWidth: 100 },
    { id: 'name', label: 'Nama Karyawan', minWidth: 170, align: 'center',
        format: (value) => value.toFixed(2),
      },
    { id: 'contract_start', label: 'Awal Kontrak', minWidth: 170, align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'contract_end', label: 'Akhir Kontrak', minWidth: 170, align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    
  ];
  
  function createData(pk, name, employee_code, contract_start, contract_end) {
    return { pk, name, employee_code, contract_start, contract_end };
  }

  function toShort(arr) {
    const newD = new Date(arr)

    const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    
    const day = newD.getDate();
    const monthIndex = newD.getMonth();
    const monthName = monthNames[monthIndex];
    const year = newD.getFullYear();
    
    return `${day}-${monthName}-${year}`;  
}


function EmployeeContract() {

    const navigate = useNavigate()

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [employee, setEmployee] = React.useState([])

    const getListPengajuan = () => {
        axios.get(`${BASE_URL}/users/employee/contract/`,{
          headers: {
            "Authorization" : 'Token ' + USER_TOKEN
          }
        })
        .then((response) => {
          const res = response.data
          setEmployee(res.map((emp) => {
            return createData(emp.pk, emp.name, emp.employee_code, toShort(emp.contract_start), toShort(emp.contract_end))
          }))
          console.log(res)
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      React.useEffect(() => getListPengajuan(), [])
    
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  return (
    <div id='image__backgrounds' className='d-flex'>
        <SideBar />
        <main className="container" style={{ marginTop:"75px" }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="card-title">
                        <button className='d-flex align-items-center btn'>
                        <ArrowBackIos style={{ marginTop:'-5px'}} />
                            <h4>Kontrak Karyawan</h4>
                        </button>
                        <small className="text-secondary">List kontrak karyawan nawastra</small>
                    </div>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow hover role="checkbox" onClick={() => navigate(`/employee/detail/${row.pk}`)} tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={employee.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </Paper>
                </div>
            </div>
        </main>
    </div>
  )
}

export default EmployeeContract