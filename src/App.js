import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import LeaderBoard from "./components/leaderboard";
import Challenges from "./components/challenge";


function App() {
    return (
        <BrowserRouter basename="/">
            <Header/>
            <Routes>
                <Route path="/" element={<LeaderBoard/>}/>
                <Route path="/challenges" element={<Challenges/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
