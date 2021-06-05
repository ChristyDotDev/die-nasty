import { Container, Heading, HStack, VStack } from "@chakra-ui/layout";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Image, Text, Stack, Box, Avatar,  Flex } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useCounter } from "@chakra-ui/counter"
const league_api = `${process.env.league_api}`

export async function getServerSideProps(context) { 
  const schedule_res = await fetch(`${league_api}/league/schedule`)
  const schedule_data = await schedule_res.json();
  // TODO - pull in schedule
  console.log(schedule_data);

  return { props: { schedule: schedule_data } };
}

export default function Home({ schedule, counter }) {
  const router = useRouter();
  
  return (
    <Container maxW="container.xl">
      <Heading as="h3" size="md">Kickoff: 10 Sept 2021, 01:20</Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
          <Tbody>
          {Object.keys(schedule).map((schedule_id) => (
          <Tr w='100%'>
            <Td><Image src={schedule[schedule_id][0].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
            <Td>{schedule[schedule_id][0].team}</Td>
            <Td>vs</Td>
            <Td textAlign='right'>{schedule[schedule_id][1].team}</Td>
            <Td><Image src={schedule[schedule_id][1].avatar} borderRadius="full" boxSize="25px" objectFit="cover"/></Td>
          </Tr>
      ))}
      </Tbody>
      </Table>
    </Container>
  );
}
