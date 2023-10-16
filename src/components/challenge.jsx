import {
    Box,
    Button,
    Center,
    Drawer, DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex, Input, InputGroup, InputLeftAddon,
    Spacer,
    Text, useDisclosure, useToast, Wrap, WrapItem
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

const playerId = 2



const Challenges = () => {
    const [challenges, setChallenges] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedChallenge, setSelectedChallenge] = useState()
    const [matchTime, setMatchTime] = useState('')

    const toast = useToast()

    useEffect(()=> {
        fetchPlayers();
    }, [])

    const fetchPlayers = () => {
        fetch(`http://localhost:8080/players/${playerId}/challenges`)
        .then(res => res.json())
        .then(json => setChallenges(json))
    }
    
    const onAccept = (id) => {
        console.log('selected', id)
        setSelectedChallenge(id)
        onOpen()
    }

    const onAcceptConfirm = async () => {
        onClose()
        console.log('confirmed', selectedChallenge, matchTime)
        let data = {
            'opponentId': playerId,
            'matchTime': matchTime
        }
        let res = await fetch(`http://localhost:8080/challenges/${selectedChallenge}/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if(res.status === 200){
            toast({
                title: 'Challenge accepted.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Failed to accept challenge.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        fetchPlayers()
    }

    return (
        <>
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}  color='gray.600'>
                    {challenges.map(({id, challenger, isAccepted, matchTime}) => {
                        if (isAccepted){
                            return <AcceptedChallenge key={id} from={challenger.name} matchTime={matchTime}/>
                        }else{
                            return <UnAcceptedChallenge key={id} id={id} from={challenger.name} onAccept={onAccept} />
                        }
                    }
                    )}
                </Box>
            </Center>
        </Box>
        <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Accept Challenge</DrawerHeader>
                <DrawerBody>
                    <Center>
                        <Wrap p='2'>
                            <WrapItem>
                            <InputGroup>
                                <InputLeftAddon children='Match time' />
                                <Input
                                    value = {matchTime}
                                    onChange= {(e) => setMatchTime(e.target.value)}
                                    placeholder="Select Date and Time"
                                    size="md"
                                    type="datetime-local"
                                />
                            </InputGroup>
                            </WrapItem>
                            <WrapItem  >
                                <Button onClick={onAcceptConfirm}>Confirm</Button>
                            </WrapItem>
                        </Wrap>
                    </Center>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
        </>
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
        <Flex p='4' m='2' bg='blue.50' borderRadius='lg'>
            <Text>
                {props.from} has challenged you
            </Text>
            <Spacer/>
            <Button size='sm' variant='link' onClick={() => props.onAccept(props.id)}>Accept</Button>
        </Flex>
)

export default Challenges;