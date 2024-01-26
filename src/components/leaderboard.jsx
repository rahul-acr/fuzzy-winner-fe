import { Box, Center, Flex, Spacer, Text, Button, useToast } from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

const playerId = 1



const Player = (props) => {
    return (
        <Flex py='4' px='8' m='2' bg='gray.50' borderRadius='lg' color='gray.500'  >
            <Text   fontSize='sm'>#{props.rank}</Text>
            <Text mx='6' fontWeight='semibold'  fontSize='xl'>{props.name}</Text>
            <Spacer/>
            <Text fontSize='sm'>{props.wins} / {props.losses}</Text>
            <Spacer />
            <Button size='sm' variant='link' onClick={() => props.onChallenge(props.id, props.name)} >Challenge!</Button>
        </Flex>
        )
}

const LeaderBoard = () => {
    const [players, setPlayers] = useState([])
    const toast = useToast()

    useEffect(() => {
        fetch('http://192.168.0.105:8080/leaderboard')
            .then(res => res.json())
            .then(json => setPlayers(json))
    }, [])

    const chanllenge = async (opponentId, opponentName) => {
        let data = {
            challengerId: playerId,
            opponentId: opponentId
        }
        let res = await fetch(`http://192.168.0.105:8080/challenges`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast({
                title: `You have challenged ${opponentName}`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Failed to challenge',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}>
                    {players.map(({id, rank, name, wins, losses}) => (
                        <Player key={id} id={id} rank={rank} name={name} wins={wins} losses={losses} onChallenge={chanllenge} />
                        ))}
                </Box>
            </Center>
        </Box>
        )
}
export default LeaderBoard;