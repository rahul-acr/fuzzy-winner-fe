import React, {useEffect, useState} from "react";
import {Box, Center, Flex, Spacer, Text} from "@chakra-ui/react";

const playerId = 2
const MatchHistory = () => {
    const [matches, setMatches] = useState([])
    
    useEffect(()=> {
        fetch(`http://192.168.0.105:8080/players/${playerId}/matches`)
        .then(res => res.json())
        .then(data => setMatches(data))
    }, [])
    
    return (
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}  color='gray.600'>
                    {matches.map(({id, winnerId, winnerName, loserName}) =>
                        <Match key={id} winnerName={winnerName} loserName={loserName} won={winnerId===playerId}/>
                    )}
                </Box>
            </Center>
        </Box>
    )
}

const Match = (props) => {
    let bgColor = props.won ?'green.50' : 'red.50'
    return (
        <Flex px='8' py='4' m='2' bg={bgColor} borderRadius='lg' color='gray.500'>
            <Text fontWeight='semibold' fontSize='xl'>{props.winnerName}</Text>
            <Spacer/>
            <Text fontSize='sm'>vs.</Text>
            <Spacer/>
            <Text fontWeight='semibold' fontSize='xl'>{props.loserName}</Text>
        </Flex>
    )
}

export default MatchHistory