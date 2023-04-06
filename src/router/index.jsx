import React,{useContext} from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import { ROLES } from "../fetch/fetch";
import AuthenticationPages from "../Components/AuthenticationPages";
import AccountSettings from "../Components/AccountSettings";
// import Maintenance from "../Components/Maintenance/Maintenance";
import Test from "../Hrd/Pages/Home/Test/Test";

  // Hrd
import LoginHrd from "../Hrd/Pages/Auth/LoginHrd";
import Dashboard from "../Hrd/Pages/Home/Dashboard";
import HomeHrd from "../Hrd/Pages/Home/HomeHrd";
import DetailPerizinan from "../Hrd/Pages/Home/DetailPerizinan";
import CalendarCuti from "../Hrd/Pages/Home/CalendarCuti";
import ListKaryawan from "../Hrd/Pages/Home/Employee/ListKaryawan";
import DetailEmployee from "../Hrd/Pages/Home/Employee/DetailEmployee"; 
import EmployeeContract from "../Hrd/Pages/Home/Employee/EmployeeContract";

import Note from "../Hrd/Pages/Home/Notes/Note";
import NoteDetail from "../Hrd/Pages/Home/Notes/NoteDetail";

import ListPresence from "../Hrd/Pages/Home/Presence/ListPresence";
import DetailPresence from "../Hrd/Pages/Home/Presence/DetailPresence";
import EmployeePresence from "../Hrd/Pages/Home/Presence/EmployeePresence";
import ListEmployeePresence from "../Hrd/Pages/Home/Presence/ListEmployeePresence";
import AnalisaPresence from "../Hrd/Pages/Home/Presence/AnalisaPresence";

import DayOff from "../Hrd/Pages/Home/DayOff/DayOff";
import DayOffDetail from "../Hrd/Pages/Home/DayOff/DayOffDetail";

// Atasan
import DashboardAtasan from "../Atasan/DashboardAtasan";
import ListPengajuan from "../Atasan/ListPengajuan";
import DetailPerizinanAtasan from "../Atasan/DetailPerizinanAtasan";

// Karyawan
import DashboardKaryawan from "../Karyawan/DashboardKaryawan";
import DetailPerizinanKaryawan from "../Karyawan/DetailPerizinanKaryawan";
import PerizinanKaryawan from "../Karyawan/PerizinanKaryawan";
import PengajuanKaryawan from "../Karyawan/PengajuanKaryawan";

import { AuthContext } from "../Context/AuthContext";
import PresencePeriode from "../Hrd/Pages/Home/Presence/PresencePeriode";

export const AppRouter = () => {

    const user = useContext(AuthContext)

    return(
        <Routes>
            <Route path='/' element={<LoginHrd />} />
            {user ? 
           <React.Fragment>
             <Route path='/authentication-user' element={<AuthenticationPages />} />
             <Route path='/settings' element={<AccountSettings />} />
           </React.Fragment>
            :
            null}
        {
           ROLES === 'hrd' ?
            <React.Fragment>
                <Route path='/home' element={<Dashboard />} />
                <Route path='/my/test' element={<Test />} />
                <Route path='/list-pengajuan' element={<HomeHrd />} />
                <Route path='/calendar-cuti' element={<CalendarCuti />} />
                <Route path='/notes' element={<Note />} />
                <Route path='/notes/detail/:id' element={<NoteDetail />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinan />} />
                <Route path='/pengajuan' element={<PengajuanKaryawan />} />
                <Route path='/pengajuan/me' element={<PerizinanKaryawan />} />
                <Route path='/list-karyawan' element={<ListKaryawan />} />
                <Route path='/list-karyawan/detail/:id' element={<DetailEmployee />} />
                <Route path='/employee/absensi' element={<ListPresence />} />
                <Route path='/employee/absensi/:id' element={<DetailPresence />} />
                <Route path='/contract/employee' element={<EmployeeContract />} />
                <Route path='/employee/contract/:id' element={<EmployeeContract />} />
                <Route path='/absensi/' element={<ListEmployeePresence />} />
                <Route path='/absensi/:name_id/:id' element={<EmployeePresence />} />
                <Route path='/absensi/:name_id/:id/:month_id/:year_id' element={<AnalisaPresence />} />
                <Route path='/absensi/periode/:name_id/:emp_id/:start_date/:end_date' element={<PresencePeriode />} />

                <Route path='/dashboard/day-off/' element={<DayOff />} />
                <Route path='/dashboard/day-off/:id' element={<DayOffDetail />} />
            </React.Fragment>
            : null
        } 
        {
           ROLES === 'atasan' ?
            <React.Fragment>
                <Route path='/home' element={<DashboardAtasan />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinanAtasan />} />
                <Route path='/list-pengajuan/karyawan/' element={<ListPengajuan />} />
            </React.Fragment>
            : null
       } 
       {
           ROLES === 'karyawan' ?
            <React.Fragment>
                <Route path='/home' element={<DashboardKaryawan />} />
                <Route path='/pengajuan' element={<PengajuanKaryawan />} />
                <Route path='/list-pengajuan' element={<PerizinanKaryawan />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinanKaryawan />} />
            </React.Fragment>
            : null
       } 
    </Routes>
    )
}
