import React from 'react'
import {Table, TableCell, TableHead, TableBody, TableRow, TableContainer, Paper, Tooltip} from '@mui/material';
import { datesUpt, changeDayName, workHour, totalWorking, totalWorkHour } from '../../../Components/utilsFunction/functionUtils';
import { Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const EmployeeTableComponents = ({ tableData }) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Hari Kerja</TableCell>
                <TableCell align="center">Masuk</TableCell>
                <TableCell align="center">Pulang</TableCell>
                <TableCell align="center">Total Jam</TableCell>
                <TableCell align="center">LemburS</TableCell>
                <TableCell align="center">LemburE</TableCell>
                <TableCell align="center">Total Jam Lembur</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" >{row.employee ? row.employee && row.employee.name : "ex karyawan"}</TableCell>
                <TableCell align="center">{row.working_date ? datesUpt(row.working_date) : "Tanggal tidak tertera"}</TableCell>
                <TableCell align="center">{row.days ? changeDayName(row.days) : "Hari tidak diketahui"}</TableCell>
                <TableCell align="center">{row.start_from ? workHour(row.start_from) : "-"}</TableCell>
                <TableCell align="center">{row.end_from ? workHour(row.end_from) : "-"}</TableCell>
                <TableCell align="center">{row.working_hour === 0 || row.working_hour > 0 ? totalWorking(row.working_hour) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_start ? workHour(row.lembur_start) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_end ? workHour(row.lembur_end) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_hour === 0 || row.lembur_hour > 0 ? totalWorkHour(row.lembur_hour) : "-"}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export const HRTableComponents = ({ tableData, link }) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Hari Kerja</TableCell>
                <TableCell align="center">Masuk</TableCell>
                <TableCell align="center">Pulang</TableCell>
                <TableCell align="center">Total Jam</TableCell>
                <TableCell align="center">LemburS</TableCell>
                <TableCell align="center">LemburE</TableCell>
                <TableCell align="center">Keterangan</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" >{row.id ? row.id && row.id : "0"}</TableCell>
                <TableCell component="th" scope="row" >{row.employee ? row.employee && row.employee.name : "ex karyawan"}</TableCell>
                <TableCell align="center">{row.working_date ? datesUpt(row.working_date) : "Tanggal tidak tertera"}</TableCell>
                <TableCell align="center">{row.days ? changeDayName(row.days) : "Hari tidak diketahui"}</TableCell>
                <TableCell align="center">{row.start_from ? workHour(row.start_from) : "-"}</TableCell>
                <TableCell align="center">{row.end_from ? workHour(row.end_from) : "-"}</TableCell>
                <TableCell align="center">{row.working_hour === 0 || row.working_hour > 0 ? totalWorking(row.working_hour) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_start ? workHour(row.lembur_start) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_end ? workHour(row.lembur_end) : "-"}</TableCell>
                <TableCell align="center">{row.ket ? row.ket : "-"}</TableCell>
                <TableCell align="center">
                    <Tooltip title="Detail">
                      <Link to={`${link}/${row.id}`}>
                        <Visibility />
                      </Link>
                    </Tooltip>
                </TableCell>                
              </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export const HRTableNotesComponents = ({ tableData, link }) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Hari</TableCell>
                <TableCell align="center">Tipe Catatan</TableCell>
                <TableCell align="center">Catatan</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" >{row.id ? row.id && row.id : "0"}</TableCell>
                <TableCell component="th" scope="row" >{row.employee ? row.employee && row.employee.name : "ex karyawan"}</TableCell>
                <TableCell align="center">{row.date_note ? datesUpt(row.date_note) : "Tanggal tidak tertera"}</TableCell>
                <TableCell align="center">{row.name_day ? changeDayName(row.name_day) : "Hari tidak diketahui"}</TableCell>
                <TableCell align="center">{row.type_notes ? row.type_notes : "Tidak ada"}</TableCell>
                <TableCell align="left">{row.notes ? 
                    row.notes.toString().length < 30 ? 
                        row.notes : 
                          row.notes.toString().slice(0,30)+"..." 
                    : "Tidak ada Notes"}
                </TableCell>                <TableCell align="center">
                    <Tooltip title="Detail">
                      <Link to={`${link}/${row.id}`}>
                        <Visibility />
                      </Link>
                    </Tooltip>
                </TableCell>                
              </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export const HRTableStatistikComponents = ({ tableData}) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Total Absensi</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" >{row.employee_name ? row.employee_name && row.employee_name : "ex karyawan"}</TableCell>
                <TableCell align="center">{row.total_attendance ? row.total_attendance : "0"}</TableCell>
                
              </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export const SubmissionTableComponents = ({ tableData, link }) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="center">Nama</TableCell>
                <TableCell align="center">Divisi</TableCell>
                <TableCell align="center">Izin</TableCell>
                <TableCell align="center">Alasan</TableCell>
                <TableCell align="center">Tanggal Awal</TableCell>
                <TableCell align="center">Tanggal Akhir</TableCell>
                <TableCell align="center">Izin Atasan</TableCell>
                <TableCell align="center">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row" >{row.id ? row.id.slice(0,5)+'...' : "null"}</TableCell>
                <TableCell align="center">{row.employee ? row.employee.name : "No name"}</TableCell>
                <TableCell align="center">{row.employee ? row.employee.division : "Tidak ada divisi"}</TableCell>
                <TableCell align="center">{row.permission_type ? row.permission_type : "Tidak ada izin"}</TableCell>
                <TableCell align="center">{row.reason ? 
                    row.reason.toString().length < 12 ? 
                        row.reason : 
                          row.reason.toString().slice(0,13)+"..." 
                    : "Tidak ada Alasan"}
                </TableCell>
                <TableCell align="center">{row.start_date ? datesUpt(row.start_date) : "Tanggal tidak tertera"}</TableCell>
                <TableCell align="center">{row.end_date ? datesUpt(row.end_date) : "Tanggal tidak tertera"}</TableCell>
                <TableCell align="center" >{row.permission_pil ? row.permission_pil : "waiting for approval"}</TableCell>
                <TableCell align="center">
                    <Tooltip title="Detail">
                      <Link to={`${link}/${row.id}`}>
                        <Visibility />
                      </Link>
                    </Tooltip>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};

export const EmployeeTableAnalisisComponents = ({ tableData, attendance }) => {
  return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Hari Kerja</TableCell>
                <TableCell align="center">Masuk</TableCell>
                <TableCell align="center">Pulang</TableCell>
                <TableCell align="center">LemburS</TableCell>
                <TableCell align="center">LemburE</TableCell>
                <TableCell align="center">Keterangan</TableCell>
                <TableCell align="center">Total Jam</TableCell>
                <TableCell align="center">Total Jam Lembur</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {tableData.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
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
                </TableCell>                <TableCell align="center">{row.working_hour === 0 || row.working_hour > 0 ? totalWorking(row.working_hour) : "-"}</TableCell>
                <TableCell align="center">{row.lembur_hour === 0 || row.lembur_hour > 0 ? totalWorkHour(row.lembur_hour) : "-"}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </React.Fragment>
  );
};