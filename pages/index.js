import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router";
import Countdown from "../components/league/Countdown"
const league_api = `${process.env.league_api}`
const league_start = `${process.env.league_start}`

export async function getServerSideProps(context) { 
  const schedule_res = await fetch(`${league_api}/league/schedule`)
  const schedule_data = await schedule_res.json();
  return { props: { schedule: schedule_data, league_start: league_start } };
}

export default function Home({ schedule, league_start }) {
  const router = useRouter();

  const handleRosterClick = (rosterId) => {
    router.push({
      pathname: '/rosters',
      query: { roster: rosterId },
    })
  };
  
  return (
    <Container maxW="container.xl">
      <Heading as="h3" size="md">Kickoff: 10 Sept 2021, 01:20</Heading>
      <Countdown countdownTo={league_start}></Countdown>
      <Tabs isFitted colorScheme="teal" defaultIndex={schedule.current_week > 0 && schedule.current_week < 18 ? schedule.current_week - 1 : 0}>
        <TabList>
          {Object.keys(schedule.fixtures).map((week) => (
            <Tab size="xs" key={week}>Week {week}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {Object.keys(schedule.fixtures).map((week) => (
            <TabPanel>
              <Table variant="striped">
                <Thead>
                </Thead>
                  <Tbody>
                  {Object.keys(schedule.fixtures[week]).map((fixture_id) => (
                  <Tr w='100%' key={fixture_id}>
                    <Td onClick={() => handleRosterClick(schedule.fixtures[week][fixture_id][0].roster)}><Image src={schedule.fixtures[week][fixture_id][0].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
                    <Td onClick={() => handleRosterClick(schedule.fixtures[week][fixture_id][0].roster)}>{schedule.fixtures[week][fixture_id][0].team}</Td>
                    <Td>vs</Td>
                    <Td onClick={() => handleRosterClick(schedule.fixtures[week][fixture_id][1].roster)} textAlign='right'>{schedule.fixtures[week][fixture_id][1].team}</Td>
                    <Td onClick={() => handleRosterClick(schedule.fixtures[week][fixture_id][1].roster)}><Image src={schedule.fixtures[week][fixture_id][1].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
                  </Tr>
              ))}
              </Tbody>
              </Table>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
  );
}
