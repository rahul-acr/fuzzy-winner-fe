import {Box, Center, Flex, Text} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

const Challenges = () => {
    const [challenges, setChallenges] = useState([])
    useEffect(()=> {
        fetch('http://localhost:8080/players/2/challenges')
        .then(res => res.json())
        .then(json => setChallenges(json))
    }, [])
    
    return (
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}  color='gray.500'>
                    {challenges.map(({id, challenger, isAccepted, matchTime}) => {
                        if (isAccepted){
                            return <AcceptedChallenge key={id} from={challenger.name} matchTime={matchTime}/>
                        }else{
                            return <UnAcceptedChallenge key={id} from={challenger.name}/>
                        }
                    }
                    )}
                </Box>
            </Center>
        </Box>
    )
}

const AcceptedChallenge = (props) => (
        <Flex p='4' m='2' bg='gray.50' borderRadius='lg'>
            <Text>
                You have accepted {props.from}'s challenge. Match is on {props.matchTime}
            </Text>
        </Flex>
)

const UnAcceptedChallenge = (props) =>   (
        <Flex p='4' m='2' bg='gray.50' borderRadius='lg'>
            <Text>
                {props.from} has challenged you
            </Text>
        </Flex>
)

export default Challenges;