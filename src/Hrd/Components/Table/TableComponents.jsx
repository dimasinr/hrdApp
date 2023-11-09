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

  export const EmployeeTableAnalisis = ({ tableData }) => {
    return (
      <React.Fragment>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Bulan</TableCell>
                  <TableCell align="center">Hari Kerja</TableCell>
                  <TableCell align="center">Jam Aktual</TableCell>
                  <TableCell align="center">Jam Efektif</TableCell>
                  <TableCell align="center">Kurang Lebih</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {tableData.map((row, index) => (
                  <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell align="center" component="th" scope="row" >{index+1}</TableCell>
                  <TableCell align="center">{row.bulan ? row.bulan : "Tanggal tidak tertera"}</TableCell>
                  <TableCell align="center">{row.hari_kerja ? row.hari_kerja + ' Hari' : "0 Hari"}</TableCell>
                  <TableCell align="center">{row.jk_aktual ? totalWorkHour(row.jk_aktual) : "0"}</TableCell>
                  <TableCell align="center">{row.jk_efektif ? totalWorkHour(row.jk_efektif) : "0"}</TableCell>
                  {row.kurleb < 0 ?
                      <TableCell align="center" style={{ backgroundColor:'red', color:'white' }} >{row.kurleb ? totalWorkHour(row.kurleb) : "0"}</TableCell>
                        :
                      <TableCell align="center">{row.kurleb ? totalWorkHour(row.kurleb) : "0"}</TableCell>
                    }
                  </TableRow>
              ))}
              </TableBody>
          </Table>
          </TableContainer>
      </React.Fragment>
    );
  };

  export const EmployeeTableSummary = ({ data }) => {
    return (
      <React.Fragment>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell align="center">Sakit</TableCell>
                  <TableCell align="center">Cuti</TableCell>
                  <TableCell align="center">Izin</TableCell>
                  <TableCell align="center">Average Presence Masuk</TableCell>
                  <TableCell align="center">Average Presence Keluar</TableCell>
                  <TableCell align="center">Average Lembur</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell align="center">{data.sakit}</TableCell>
                  <TableCell align="center">{data.cuti}</TableCell>
                  <TableCell align="center">{data.izin}</TableCell>
                  <TableCell align="center">{workHour(data.average_pre_in ? data.average_pre_in : 0)}</TableCell>
                  <TableCell align="center">{workHour(data.average_pre_out ? data.average_pre_out : 0)}</TableCell>
                  <TableCell align="center">{totalWorking(data.average_lembur && data.average_lembur !== 1 ? data.average_lembur : 0)}</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
          </TableContainer>
      </React.Fragment>
    );
  };
  