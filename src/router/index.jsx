import React,{useContext} from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import { ROLES } from "../fetch/fetch";
import AuthenticationPages from "../Components/AuthenticationPages";
import AccountSettings from "../Components/AccountSettings";
// import Maintenance from "../Components/Maintenance/Maintenance";
import Test from "../Hrd/Pages/Test/Test";

  // Hrd
import LoginHrd from "../Hrd/Pages/Auth/LoginHrd";
import Dashboard from "../Hrd/Pages/Home/Dashboard";
import ListPengajuanHrd from "../Hrd/Pages/Home/ListPengajuanHrd";
import DetailPerizinan from "../Hrd/Pages/Home/DetailPerizinan";
import CalendarCuti from "../Hrd/Pages/Home/CalendarCuti";
import ListKaryawan from "../Hrd/Pages/Employee/ListKaryawan";
import DetailEmployee from "../Hrd/Pages/Employee/DetailEmployee"; 
import EmployeeContract from "../Hrd/Pages/Employee/EmployeeContract";

import Note from "../Hrd/Pages/Notes/Note";
import NoteDetail from "../Hrd/Pages/Notes/NoteDetail";

import ListPresence from "../Hrd/Pages/Presence/ListPresence";
import DetailPresence from "../Hrd/Pages/Presence/DetailPresence";
import EmployeePresence from "../Hrd/Pages/Presence/EmployeePresence";
import ListEmployeePresence from "../Hrd/Pages/Presence/ListEmployeePresence";
import AnalisaPresence from "../Hrd/Pages/Presence/AnalisaPresence";
import PresencePeriode from "../Hrd/Pages/Presence/PresencePeriode";

import DayOff from "../Hrd/Pages/DayOff/DayOff";
import DayOffDetail from "../Hrd/Pages/DayOff/DayOffDetail";

// Atasan
import DashboardAtasan from "../Atasan/DashboardAtasan";
import ListPengajuan from "../Atasan/ListPengajuan";
import DetailPerizinanAtasan from "../Atasan/DetailPerizinanAtasan";

// Karyawan
import DashboardKaryawan from "../Karyawan/DashboardKaryawan";
import DetailPerizinanKaryawan from "../Karyawan/DetailPerizinanKaryawan";
import ListPerizinanKaryawan from "../Karyawan/ListPerizinanKaryawan";
import PengajuanKaryawan from "../Karyawan/PengajuanKaryawan";
import SelfListPresence from "../Karyawan/Presence/ListPresence";
import SelfEmployeePresence from "../Karyawan/Presence/EmployeePresenceAnalysis";
import SelfEmployeeAnalisisPresence from "../Karyawan/Presence/AnalisaPresence";
import NotesKaryawan from "../Karyawan/NotesKaryawan";

import { AuthContext } from "../Context/AuthContext";

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
                <Route path='/calendar-cuti' element={<CalendarCuti />} />
                <Route path='/notes' element={<Note />} />
                <Route path='/notes/detail/:id' element={<NoteDetail />} />
                <Route path='/list-pengajuan' element={<ListPengajuanHrd />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinan />} />
                <Route path='/pengajuan' element={<PengajuanKaryawan />} />
                <Route path='/pengajuan/me' element={<ListPerizinanKaryawan />} />
                <Route path='/list-karyawan' element={<ListKaryawan />} />
                <Route path='/list-karyawan/detail/:id' element={<DetailEmployee />} />
                <Route path='/contract/employee' element={<EmployeeContract />} />
                <Route path='/employee/contract/:id' element={<EmployeeContract />} />
                {/* Presensi */}
                <Route path='/employee/absensi' element={<ListPresence />} />
                <Route path='/employee/absensi/:id' element={<DetailPresence />} />
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
                <Route path='/presence/list/' element={<SelfListPresence />} />
                <Route path='/employee/presence/' element={<SelfEmployeePresence />} />
                <Route path='/employee/presence/:month_id/:year_id' element={<SelfEmployeeAnalisisPresence />} />
            </React.Fragment>
            : null
       } 
       {
           ROLES === 'karyawan' ?
            <React.Fragment>
                <Route path='/home' element={<DashboardKaryawan />} />
                <Route path='/pengajuan' element={<PengajuanKaryawan />} />
                <Route path='/list-pengajuan' element={<ListPerizinanKaryawan />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinanKaryawan />} />
                <Route path='/presence/list/' element={<SelfListPresence />} />
                <Route path='/employee/presence/' element={<SelfEmployeePresence />} />
                <Route path='/employee/presence/:month_id/:year_id' element={<SelfEmployeeAnalisisPresence />} />
                <Route path='/notes/employee/' element={<NotesKaryawan />} />
            </React.Fragment>
            : null
       } 
    </Routes>
    )
}
