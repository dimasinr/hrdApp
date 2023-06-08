import React from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { datesUpt, changeDayName, workHour, totalWorking, totalWorkHour } from '../../../Components/utilsFunction/functionUtils';

export const EmployeeTableAnalisisComponents = ({ tableData }) => {
    return (
      <React.Fragment>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell align="center">Tanggal</TableCell>
                  <TableCell align="center">Hari Kerja</TableCell>
                  <TableCell align="center">Masuk</TableCell>
                  <TableCell align="center">Pulang</TableCell>
                  <TableCell align="center">LemburS</TableCell>
                  <TableCell align="center">LemburE</TableCell>
                  <TableCell align="center">Keterangan</TableCell>
                  <TableCell align="center">Total Jam Kerja</TableCell>
                  <TableCell align="center">Total Jam Lembur</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {tableData.map((row, index) => (
                  <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell component="th" scope="row" >{index+1}</TableCell>
                  <TableCell component="th" scope="row" >{row.employee ? row.employee && row.employee.name : "ex karyawan"}</TableCell>
                  <TableCell align="center">{row.working_date ? datesUpt(row.working_date) : "Tanggal tidak tertera"}</TableCell>
                  <TableCell align="center">{row.days ? changeDayName(row.days) : "Hari tidak diketahui"}</TableCell>
                  <TableCell align="center">{row.start_from ? workHour(row.start_from) : "-"}</TableCell>
                  <TableCell align="center">{row.end_from ? workHour(row.end_from) : "-"}</TableCell>
                  <TableCell align="center">{row.lembur_start ? workHour(row.lembur_start) : "-"}</TableCell>
                  <TableCell align="center">{row.lembur_end ? workHour(row.lembur_end) : "-"}</TableCell>
                  <TableCell align="center">{row.ket ? 
                      row.ket.toString().length < 12 ? 
                          row.ket : 
                            row.ket.toString().slice(0,13)+"..." 
                      : "-"}
                  </TableCell>                
                  <TableCell align="center">{row.working_hour === 0 || row.working_hour > 0 ? totalWorking(row.working_hour) : "-"}</TableCell>
                  <TableCell align="center">{row.lembur_hour === 0 || row.lembur_hour > 0 ? totalWorkHour(row.lembur_hour) : "-"}</TableCell>
                  </TableRow>
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      </React.Fragment>
    );
  };