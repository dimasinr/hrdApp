import React from "react";
import {
    Routes,
    Route
  } from "react-router-dom";
// Hrd
import LoginHrd from "../Hrd/Pages/Auth/LoginHrd";
import HomeHrd from "../Hrd/Pages/Home/HomeHrd";
import NotesHrd from "../Hrd/Pages/Home/NotesHrd";
import PerizinanHrd from "../Hrd/Pages/Home/PerizinanHrd";
import DetailPerizinan from "../Hrd/Pages/Home/DetailPerizinan";
import CalendarCuti from "../Hrd/Pages/Home/CalendarCuti";
import ListKaryawan from "../Hrd/Pages/Home/ListKaryawan";
import DetailEmployee from "../Hrd/Pages/Home/DetailEmployee"; 

export const AppRouter = () => {
    return(
        <Routes>
        <Route path='/' element={<LoginHrd />} />
        <Route path='/home' element={<HomeHrd />} />
        <Route path='/notes' element={<NotesHrd />} />
        <Route path='/calendar-cuti' element={<CalendarCuti />} />
        <Route path='/list-karyawan' element={<ListKaryawan />} />
        <Route path='/detail-perizinan/:id' element={<PerizinanHrd />} />
        <Route path='/perizinan/detail/:id' element={<DetailPerizinan />} />
        <Route path='/employee/detail/:id' element={<DetailEmployee />} />
    </Routes>
    )
}
