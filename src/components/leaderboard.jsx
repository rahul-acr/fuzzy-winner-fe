import {Box, Center, Flex, Spacer, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";


const Player = (props) => {
    return (
        <Flex py='4' px='8' m='2' bg='gray.50' borderRadius='lg' color='gray.500'  >
            <Text   fontSize='sm'>#{props.rank}</Text>
            <Text mx='6' fontWeight='semibold'  fontSize='xl'>{props.name}</Text>
            <Spacer/>
            <Text fontSize='sm'>{props.wins} / {props.losses}</Text>
        </Flex>
        )
}

const LeaderBoard = () => {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        fetch('http://192.168.0.105:8080/leaderboard')
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
export default LeaderBoard;