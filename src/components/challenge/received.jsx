import {
    Button,
    Center,
    Drawer, DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex, Input, InputGroup, InputLeftAddon, Radio, RadioGroup,
    Spacer, Stack,
    Text, useDisclosure, useToast, Wrap, WrapItem
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const playerId = 4



const ReceivedChallenges = () => {
    const [challenges, setChallenges] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selectedChallenge, selectChallenge] = useState()

    const toast = useToast()

    const [drawerMode, setDrawerMode] = useState('acceptChallange')

    useEffect(() => {
        fetchChallenges();
    }, [])

    const fetchChallenges = () => {
        fetch(`http://192.168.0.105:8080/players/${playerId}/challenges/received`)
            .then(res => res.json())
            .then(json => setChallenges(json))
    }

    const onAccept = (id) => {
        selectChallenge(id)
        setDrawerMode('acceptChallenge')
        onOpen()
    }

    const onAcceptConfirm = async (matchTime) => {
        let data = {
            'opponentId': playerId,
            'matchTime': matchTime
        }
        let res = await fetch(`http://192.168.0.105:8080/challenges/${selectedChallenge}/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.ok) {
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
        fetchChallenges()
        onClose()
    }

    const onEnterResult = async (won) => {
        let data = {
            playerId,
            won: won
        }
        let res = await fetch(`http://192.168.0.105:8080/challenges/${selectedChallenge}/result`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status === 200) {
            toast({
                title: 'Added result.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: 'Failed to add result.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

        fetchChallenges()
        onClose()
    }

    return (
        <>

            {challenges.map(({ id, challenger, isAccepted, winner, matchTime }) => {
                if (winner) {
                    return <CompletedChallenge key={id} winner={winner.name} />
                } else if (isAccepted) {
                    return <AcceptedChallenge key={id} id={id} from={challenger.name} matchTime={matchTime} onEnterResult={(cId) => {
                        selectChallenge(cId)
                        console.log('selected challenge', cId)
                        setDrawerMode('enterResult')
                        onOpen()
                    }} />
                } else {
                    return <UnAcceptedChallenge key={id} id={id} from={challenger.name} onAccept={onAccept} />
                }
            }
            )}
            <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                {drawerMode === 'acceptChallenge' && <AcceptChallengeDrawer onAcceptConfirm={onAcceptConfirm} />}
                {drawerMode === 'enterResult' && <EnterResultDrawer onEnterResult={onEnterResult} />}
            </Drawer>


        </>
    )
}

const AcceptChallengeDrawer = (props) => {

    const [matchTime, setMatchTime] = useState('')

    return (
        <DrawerContent>
            <DrawerHeader>Accept Challenge</DrawerHeader>
            <DrawerBody>
                <Center>
                    <Wrap p='2'>
                        {/* <WrapItem> */}
                        <InputGroup>
                            <InputLeftAddon children='Match time' />
                            <Input
                                value={matchTime}
                                onChange={(e) => setMatchTime(e.target.value)}
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                            />
                        </InputGroup>
                        {/* </WrapItem> */}
                        <WrapItem  >
                            <Button onClick={() => props.onAcceptConfirm(matchTime)}>Confirm</Button>
                        </WrapItem>
                    </Wrap>
                </Center>
            </DrawerBody>
        </DrawerContent>
    )
}

const EnterResultDrawer = (props) => {
    const [result, setResult] = useState('win')

    return (
        <DrawerContent bg={result === 'win' ? 'green.50' : 'red.50'} py='4'>
            <DrawerHeader>Enter Challenge Result</DrawerHeader>
            <DrawerBody>
                <Center>
                    <Stack spacing={10} direction='row' alignItems='center'>
                        <RadioGroup onChange={setResult} value={result} >
                            <Stack spacing={5} direction='row' >
                                <Radio colorScheme='red' value='lose' >
                                    Lost
                                </Radio>
                                <Radio colorScheme='green' value='win'>
                                    Won
                                </Radio>
                            </Stack>

                        </RadioGroup>
                        <Button onClick={() => props.onEnterResult(result === 'win')}>Confirm</Button>
                    </Stack>
                </Center>
            </DrawerBody>
        </DrawerContent>
    )
}

const AcceptedChallenge = (props) => (
    <Flex p='4' my='2' bg='gray.50' borderRadius='lg'>
        <Text w='80%'>
            You have accepted {props.from}'s challenge. Match is on {props.matchTime}
        </Text>
        <Spacer />
        <Button size='sm' variant='link' onClick={() => props.onEnterResult(props.id)}>Result</Button>
    </Flex>
)

const UnAcceptedChallenge = (props) => (
    <Flex p='4' my='2' bg='blue.50' borderRadius='lg'>
        <Text>
            {props.from} has challenged you
        </Text>
        <Spacer />
        <Button size='sm' variant='link' onClick={() => props.onAccept(props.id)}>Accept</Button>
    </Flex>
)

const CompletedChallenge = ({ winner }) => (
    <Flex p='4' my='2' bg='blue.100' borderRadius='lg'>
        <Text>
            {winner} has won
        </Text>
    </Flex>
)

export default ReceivedChallenges;