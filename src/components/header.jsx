import {Box, Flex, Heading} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <Box p='4' boxShadow='base' >
            <Flex minWidth='max-content' alignItems='center' gap='5'>
                <Link to='/' ><Heading size='md'>Fuzzy-winner</Heading></Link>
                <Link to='/matches' >Matches</Link>
                <Link to='/challenges'>Challenges</Link>
            </Flex>
        </Box>
    )
}
export default Header;