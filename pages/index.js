import { Container, Heading } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Image } from "@chakra-ui/react"
import { useRouter } from "next/router";
import Countdown from "../components/Countdown"
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
      <Table variant="striped">
        <Thead>
        </Thead>
          <Tbody>
          {Object.keys(schedule).map((schedule_id) => (
          <Tr w='100%'>
            <Td onClick={() => handleRosterClick(schedule[schedule_id][0].roster)}><Image src={schedule[schedule_id][0].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
            <Td>{schedule[schedule_id][0].team}</Td>
            <Td>vs</Td>
            <Td textAlign='right'>{schedule[schedule_id][1].team}</Td>
            <Td onClick={() => handleRosterClick(schedule[schedule_id][1].roster)}><Image src={schedule[schedule_id][1].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
          </Tr>
      ))}
      </Tbody>
      </Table>
    </Container>
  );
}
