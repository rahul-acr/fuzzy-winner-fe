import {
    Flex,
    Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const playerId = 4



const CreatedChallenges = () => {
    const [challenges, setChallenges] = useState([])

    useEffect(() => {
        fetchChallenges();
    }, [])

    const fetchChallenges = () => {
        fetch(`http://192.168.0.105:8080/players/${playerId}/challenges/created`)
            .then(res => res.json())
            .then(json => setChallenges(json))
    }

    return (
        <>

            {challenges.map(({ id, opponent, isAccepted, winner, matchTime }) => {
                if (winner) {
                    return <CompletedChallenge key={id} winner={winner.name} opponent={opponent.name} />
                } else if (isAccepted) {
                    return <AcceptedChallenge key={id} id={id} opponent={opponent.name} matchTime={matchTime} />
                } else {
                    return <UnAcceptedChallenge key={id} id={id} opponent={opponent.name} />
                }
            }
            )}


        </>
    )
}

const AcceptedChallenge = (props) => (
    <Flex p='4' my='2' bg='gray.50' borderRadius='lg'>
        <Text w='80%'>
            {props.opponent} has have accepted your challenge. Match is on {props.matchTime}
        </Text>
    </Flex>
)

const UnAcceptedChallenge = (props) => (
    <Flex p='4' my='2' bg='blue.50' borderRadius='lg'>
        <Text>
            You have challenged {props.opponent}
        </Text>
    </Flex>
)

const CompletedChallenge = ({ winner, opponent }) => (
    <Flex p='4' my='2' bg='blue.100' borderRadius='lg'>
        <Text>
            You challened {opponent}. {winner} has won
        </Text>
    </Flex>
)

export default CreatedChallenges;