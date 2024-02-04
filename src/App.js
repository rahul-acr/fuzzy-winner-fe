import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import LeaderBoard from "./components/leaderboard";
import ChallengesPanel from "./components/challenge/challenge";
import MatchHistory from "./components/match";


function App() {
    return (
        <BrowserRouter basename="/">
            <Header/>
            <Routes>
                <Route path="/" element={<LeaderBoard/>}/>
                <Route path="/challenges" element={<ChallengesPanel />} />
                <Route path="/matches" element={<MatchHistory/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
