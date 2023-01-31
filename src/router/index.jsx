import React,{useContext} from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
import { ROLES } from "../fetch/fetch";
import AuthenticationPages from "../Components/AuthenticationPages";
import AccountSettings from "../Components/AccountSettings";

  // Hrd
import LoginHrd from "../Hrd/Pages/Auth/LoginHrd";
import HomeHrd from "../Hrd/Pages/Home/HomeHrd";
import NotesHrd from "../Hrd/Pages/Home/NotesHrd";
import PerizinanHrd from "../Hrd/Pages/Home/PerizinanHrd";
import DetailPerizinan from "../Hrd/Pages/Home/DetailPerizinan";
import CalendarCuti from "../Hrd/Pages/Home/CalendarCuti";
import ListKaryawan from "../Hrd/Pages/Home/ListKaryawan";
import DetailEmployee from "../Hrd/Pages/Home/DetailEmployee"; 
import Dashboard from "../Hrd/Pages/Home/Dashboard";
import AbsensiKaryawan from "../Hrd/Pages/Home/Absensi/AbsensiKaryawan";
import DetailAbsensi from "../Hrd/Pages/Home/Absensi/DetailAbsensi";
import AnalisaAbsensi from "../Hrd/Pages/Home/Absensi/AnalisaAbsensi";
import AbsensiDetail from "../Hrd/Pages/Home/Absensi/AbsensiDetail";
import AbsensiPeriode from "../Hrd/Pages/Home/Absensi/AbsensiPeriode";
import ListAbsensi from "../Hrd/Pages/Home/Absensi/ListAbsensi";
import DayOff from "../Hrd/Pages/Home/DayOff/DayOff";

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
                <Route path='/list-pengajuan' element={<HomeHrd />} />
                <Route path='/notes' element={<NotesHrd />} />
                <Route path='/calendar-cuti' element={<CalendarCuti />} />
                <Route path='/list-karyawan' element={<ListKaryawan />} />
                <Route path='/detail-perizinan/:id' element={<PerizinanHrd />} />
                <Route path='/perizinan/detail/:id' element={<DetailPerizinan />} />
                <Route path='/pengajuan' element={<PengajuanKaryawan />} />
                <Route path='/pengajuan/me' element={<PerizinanKaryawan />} />
                <Route path='/employee/detail/:id' element={<DetailEmployee />} />
                <Route path='/employee/absensi' element={<AbsensiKaryawan />} />
                <Route path='/employee/absensi/:id' element={<DetailAbsensi />} />
                <Route path='/absensi/' element={<ListAbsensi />} />
                <Route path='/absensi/:name_id' element={<AbsensiDetail />} />
                <Route path='/employee/absensi/:id/:month_id/:year_id' element={<AnalisaAbsensi />} />
                <Route path='/employee/absensi/periode/:name_id/:start_date/:end_date' element={<AbsensiPeriode />} />
                
                <Route path='/dashboard/day-off/' element={<DayOff />} />
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
