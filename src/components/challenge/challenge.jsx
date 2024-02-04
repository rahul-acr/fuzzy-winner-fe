import {
    Box,
    Center,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import React, { } from "react";
import ReceivedChallenges from "./received";
import CreatedChallenges from "./created";


const ChallengesPanel = () => {

    return (
        <>
            <Box m='2'>
                <Center>
                    <Box w={{ base: '100%', lg: '50%' }} color='gray.600'>
                        <Tabs isFitted>
                            <TabList>
                                <Tab>Received</Tab>
                                <Tab>Made</Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <ReceivedChallenges />
                                </TabPanel>
                                <TabPanel>
                                    <CreatedChallenges />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>

                </Center>
            </Box>

        </>
    )
}


export default ChallengesPanel;