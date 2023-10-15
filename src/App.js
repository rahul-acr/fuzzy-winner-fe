import './App.css';
import {Box, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";

const Player = (props) => {
    return (
        <Flex py='4' px='8' m='2' bg='gray.50' borderRadius='lg'>
            <Text>
                #{props.rank}
            </Text>
            <Spacer/>
            <Text fontWeight='semibold'>
                {props.name}
            </Text>
            <Spacer/>
            <Text>
                {props.wins} wins
            </Text>
            <Spacer/>
            <Text>
                {props.losses} losses
            </Text>
        </Flex>
    )
}

const LeaderBoard = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/leaderboard')
            .then(res => res.json())
            .then(json => setPlayers(json))
    }, [])

    return (
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}>
                    {players.map(({id, rank, name, wins, losses}) => (
                        <Player key={id} rank={rank} name={name} wins={wins} losses={losses}/>
                    ))}
                </Box>
            </Center>
        </Box>
    )
}

function App() {
    return (
        <BrowserRouter basename="/">
            <Header/>
            <Routes>
                <Route path="/" element={<LeaderBoard/>}/>
                <Route path="/challenges" element={<h1>HELLO</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
