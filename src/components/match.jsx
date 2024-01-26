import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Center,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    Radio,
    RadioGroup,
    Select,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";

const playerId = 1
const MatchHistory = () => {
    const [matches, setMatches] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const loadMatches = () => {
        fetch(`http://192.168.0.105:8080/players/${playerId}/matches`)
        .then(res => res.json())
        .then(data => setMatches(data))
    }

    useEffect(loadMatches, [])
    
    return (
        <>
        <Box m='2'>
            <Center>
                <Box w={{base: '100%', lg: '50%'}}  color='gray.600'>
                    <Button my='2' variant='outline' onClick={() => onOpen()}>Add Match</Button>
                    <Divider/>
                    {matches.map(({matchId, winnerId, winnerName, loserName}) =>
                        <Match key={matchId} winnerName={winnerName} loserName={loserName} won={winnerId===playerId}/>
                    )}
                </Box>
            </Center>
        </Box>
        <Drawer placement='bottom' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <AddMatchPanel onClose={() => {
                onClose()
                loadMatches()
            }}/>
        </Drawer>
        </>
    )
}

const AddMatchPanel = ( props) => {

    const [players, setPlayers] = useState([])
    const [opponent, setOpponent] = useState(0)
    const [result, setResult] = useState('win')

    useEffect(() => {
         fetch('http://192.168.0.105:8080/players')
        .then(res => res.json())
        .then(data => setPlayers(data))
    }, [])


    const submitMatch = async (e) => {
        e.preventDefault()
        console.log(opponent, result)
        let data
        if (result === 'win') {
            data = {
                'winnerId': playerId,
                'loserId': opponent
            }
        } else {
            data = {
                'winnerId': opponent,
                'loserId': playerId
            }
        }
        await fetch(`http://192.168.0.105:8080/matches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        props.onClose()
    }

    return (
        <DrawerContent bg={result === 'win' ? 'green.50' :'red.50'}>
            <DrawerHeader>Add match</DrawerHeader>
            <DrawerBody>
                <Center>
                    <Box p='2'>
                        <form onSubmit={submitMatch}>
                            <FormControl>
                                <VStack spacing='8'>
                                    <Select
                                        placeholder='Select opponent'
                                        value={opponent}
                                        onChange={(e) => setOpponent(parseInt(e.target.value))}
                                        isRequired
                                    >
                                        { players.map(({playerId, name}) => <option key={playerId} value={playerId}>{name}</option>) }
                                    </Select>
                                    <RadioGroup name='isWon' value={result}>
                                        <Stack spacing={5} direction='row'>
                                            <Radio
                                                colorScheme='green'
                                                value='win'
                                                isRequired
                                                onChange={(e) => setResult(e.target.value)}
                                            >Won</Radio>
                                            <Radio
                                                colorScheme='red'
                                                value='lose'
                                                onChange={(e) => setResult(e.target.value)}
                                                isRequired>
                                                Lost
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                    <Button size='lg' type='submit'>Confirm</Button>
                                </VStack>
                            </FormControl>
                        </form>
                    </Box>
                </Center>
            </DrawerBody>
        </DrawerContent>
    )
}

const Match = (props) => {
    let bgColor = props.won ?'green.50' : 'red.50'
    return (
        <Flex px='8' py='4' my='2' bg={bgColor} borderRadius='lg' color='gray.500'>
            <Text fontWeight='semibold' fontSize='xl'>{props.winnerName}</Text>
            <Spacer/>
            <Text fontSize='sm'>vs.</Text>
            <Spacer/>
            <Text fontWeight='semibold' fontSize='xl'>{props.loserName}</Text>
        </Flex>
    )
}

export default MatchHistory