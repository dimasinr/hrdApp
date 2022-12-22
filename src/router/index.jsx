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

export const AppRouter = () => {
    return(
        <Routes>
        <Route path='/' element={<LoginHrd />} />
        <Route path='/home' element={<HomeHrd />} />
        <Route path='/notes' element={<NotesHrd />} />
        <Route path='/detail-perizinan/:id' element={<PerizinanHrd />} />
    </Routes>
    )
}
