import {Box, Center, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

const Challenges = () => {
    const [challenges, setChallenges] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8080/players/1/challenges')
        .then(res => res.json())
        .then(json => setChallenges(json))
    }, [])
    
    return (
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}  color='gray.500'>
                    {challenges.map(({id, challenger, isAccepted, matchTime}) => (
                        <Challenge key={id} from={challenger.name} isAccepted={isAccepted} matchTime={matchTime}/>
                        ))}
                </Box>
            </Center>
        </Box>
    )
}

const Challenge = (props) => {
    let message
    if(props.isAccepted){
        message = `You have accepted ${props.from}'s challenge. Match is on ${props.matchTime}`
    }
    else {
        message = `${props.from} has challenged you`

    }
    return (
        <Flex p='4' m='2' bg='gray.50' borderRadius='lg'>
            <Text>
                {message}
            </Text>
        </Flex>
        )
}

export default Challenges;